import { combineReducers } from 'redux';
import LoginReducer from '../containers/LoginPage/LoginReducer';
import NavBarReducer from '../containers/NavBar/NavBarReducer';
import FooterReducer from '../containers/Footer/FooterReducer';
import WishListReducer from '../containers/WishListPage/WishListReducer';
import FriendsReducer from '../containers/Friends/FriendsReducer';
import NotificationsReducer from '../containers/Notifications/NotificationsReducer';
import ConfirmModalReducer from '../containers/ConfirmModal/ConfirmModalReducer';

const rootReducer = combineReducers({
  LoginReducer,
  NavBarReducer,
  FooterReducer,
  WishListReducer,
  FriendsReducer,
  NotificationsReducer,
  ConfirmModalReducer,
});

export default rootReducer;
