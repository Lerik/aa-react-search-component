import { combineReducers } from 'redux';
import LoginReducer from '../containers/LoginPage/LoginReducer';
import NavBarReducer from '../containers/NavBar/NavBarReducer';

const rootReducer = combineReducers({
  LoginReducer,
  NavBarReducer,
});

export default rootReducer;
