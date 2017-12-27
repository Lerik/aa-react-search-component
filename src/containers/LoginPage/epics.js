import Rx from 'rxjs';
import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as feathers from '../../feathers';
import {
  CHECK_LOGIN_STATUS_ACTION,
  AUTHENTICATE_ACTION,
  AUTHENTICATED_ACTION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  SEND_VERIFICATION_CODE,
  LOGINMESSAGEERROR_ACTION,
  UPDATE_USERNAME_ACTION,
  UPDATED_USERNAME_ACTION,
  UPDATE_USERNAME_MESSAGEERROR_ACTION,
  VERIFICATION_CODE_HAS_BEEN_SENT,
  CREATE_USER,
  VERIFY_CODE_SENT_BY_SMS,
} from './constants';
import { authenticationService } from '../../services';
import * as storage from '../../services/helpers/storageHelper';
import { authenticateAction, authenticatedAction, updatedUserNameAction,
  verificationCodeHasBeenSent, loginMessageErrorAction, createUser, loginAction } from './actions';

export function checkLoginStatus(action$) {
  return action$.ofType(CHECK_LOGIN_STATUS_ACTION)
    .map((action) => action)
    .mergeMap(() =>
      Rx.Observable.fromPromise(storage.getJWTToken())
      .switchMap((token) =>
        Rx.Observable.fromPromise(storage.getDataFromAsyncStorage('user'))
        .map((user) => {
          if (token && feathers.default.io.connected) {
            return authenticateAction({
              user: {
                type: 'token',
                token,
              },
            });
          }
          return authenticatedAction({ token, user: JSON.parse(user) });
        }))
    );
}

export function authenticate(action$) {
  return action$.ofType(AUTHENTICATE_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(authenticationService.authenticate(action.userToAuthenticate))
        .map((user) => authenticatedAction({
          user: user.data,
          token: user.token,
          goToAction: action.goToAction,
        }))
        .catch((err) => {
          if (err.code === 401 && err.message === 'Invalid login.' && action.userToAuthenticate !== undefined) {
            return [createUser({
              user: {
                type: 'local',
                phoneNumber: action.userToAuthenticate.phoneNumber,
                password: '',
              },
              goToAction: action.goToAction,
            })];
          }
          try {
            return Rx.Observable.of({
              type: LOGINMESSAGEERROR_ACTION,
              message: err.message,
            });
          } catch (error) {
            return Rx.Observable.of({
              type: LOGINMESSAGEERROR_ACTION,
              message: 'There was an error during processing, please try again.',
            });
          }
        }));
}

export function authenticated(action$) {
  return action$.ofType(AUTHENTICATED_ACTION)
    .map((action) => action)
    .mergeMap((action) => {
      storage.setDataFromAsyncStorage('user', JSON.stringify(action.user));
      if (shouldWeSendUserToWishList(action)) {
        return [null];
      }
      if (shouldWeSendUserToLogin(action)) {
        return [loginAction({
          goToAction: 'Login',
        })];
      }
      return Rx.Observable.create(() => {
        if (action.goToAction) {
          Actions[action.goToAction]();
        }
        Keyboard.dismiss();
      });
    });
}

export function login(action$) {
  return action$.ofType(LOGIN_ACTION)
    .map((action) => action)
    .mergeMap((action) => Rx.Observable.create(() => {
      if (action.goToAction) {
        Actions[action.goToAction]();
      }
    }));
}

export function logout(action$) {
  return action$.ofType(LOGOUT_ACTION)
    .map((action) => action)
    .mergeMap((action) => {
      storage.clearStorage();
      return Rx.Observable.create(() => {
        if (action.goToAction) {
          Actions[action.goToAction]();
        }
      });
    });
}

export function updateUserName(action$) {
  return action$.ofType(UPDATE_USERNAME_ACTION)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(storage.getJWTToken())
      .switchMap((token) =>
        Rx.Observable.fromPromise(authenticationService.authenticate({
          user: {
            type: 'token',
            token,
          },
        }))
        .switchMap(() =>
          Rx.Observable.fromPromise(authenticationService.updateUserName(action.user))
          .map((user) => {
            storage.setDataFromAsyncStorage('user', JSON.stringify(action.user));

            return updatedUserNameAction({
              user,
              goToAction: action.goToAction,
            });
          })
          .catch((err) => {
            try {
              if (err.message.indexOf('Validation failed: email: Error, expected `email` to be unique.') !== -1) {
                return Rx.Observable.of({
                  type: UPDATE_USERNAME_MESSAGEERROR_ACTION,
                  message: 'Email is being used by other user.',
                });
              }
              return Rx.Observable.of({
                type: UPDATE_USERNAME_MESSAGEERROR_ACTION,
                message: err.message,
              });
            } catch (error) {
              return Rx.Observable.of({
                type: UPDATE_USERNAME_MESSAGEERROR_ACTION,
                message: 'There was an error during processing, please try again.',
              });
            }
          }
        ))
      ));
}

export function updatedUserName(action$) {
  return action$.ofType(UPDATED_USERNAME_ACTION)
    .map((action) => action)
    .mergeMap((action) => {
      storage.setDataFromAsyncStorage('user', JSON.stringify(action.user));
      Keyboard.dismiss();

      return [null];
    });
}

export function sendVerificationCodeBySMS(action$) {
  return action$.ofType(SEND_VERIFICATION_CODE)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(authenticationService.sendVerificationCode(action.userToVerify))
        .map(() => verificationCodeHasBeenSent(action.goToAction))
        .catch(() => [loginMessageErrorAction('There was an error during processing, please try again.')])
    );
}

export function sendUserToVerificationPage(action$) {
  return action$.ofType(VERIFICATION_CODE_HAS_BEEN_SENT)
    .map((action) => action)
    .mergeMap((action) => Rx.Observable.create(() => {
      if (action.goToAction) {
        Actions[action.goToAction]();
      }
      Keyboard.dismiss();
    }));
}

export function verifyCode(action$) {
  return action$.ofType(VERIFY_CODE_SENT_BY_SMS)
    .map((action) => action)
    .mergeMap((action) =>
      Rx.Observable.fromPromise(authenticationService.verifySmsCode(action.userToWhichCodeWasSent))
        .map((response) => {
          if (response.status !== undefined && (response.status === 'ERROR' || response.status === 'FAIL')) {
            return loginMessageErrorAction('There was an error during verification, please try again.');
          }
          return authenticateAction({
            user: {
              type: 'local',
              phoneNumber: action.userToWhichCodeWasSent.phoneNumber,
              password: '',
            },
            goToAction: action.goToAction,
          });
        })
        .catch(() => [loginMessageErrorAction('There was an error during verification, please try again.')])
    );
}

export function startCreatingUser(action$) {
  return action$.ofType(CREATE_USER)
    .map((action) => action)
    .mergeMap((action) => Rx.Observable.fromPromise(authenticationService.createUser(action.userToCreate))
      .map(() => authenticateAction({
        user: {
          type: 'local',
          phoneNumber: action.userToCreate.phoneNumber,
          password: '',
        },
        goToAction: action.goToAction,
      }))
      .catch(() => [loginMessageErrorAction('There was an error during processing, please try again.')])
    );
}

function isValidField(field) {
  return field !== null && field !== undefined && field.trim() !== '';
}

function shouldWeSendUserToWishList(action) {
  if (action.user === null || action.user === undefined) {
    return false;
  }

  const isFirstNameValid = isValidField(action.user.firstName);
  const isLastNameValid = isValidField(action.user.lastName);
  const isEmailValid = isValidField(action.user.email);

  return isFirstNameValid && isLastNameValid && isEmailValid;
}

function shouldWeSendUserToLogin(action) {
  return action.goToAction !== 'AddName';
}

export default [checkLoginStatus, authenticate, authenticated, logout, login,
  updateUserName, updatedUserName, sendUserToVerificationPage, sendVerificationCodeBySMS,
  startCreatingUser, verifyCode];
