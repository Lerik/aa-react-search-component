const selectNotifications = () => (state) => state.NotificationsReducer.toJS();

export {
  selectNotifications,
};
