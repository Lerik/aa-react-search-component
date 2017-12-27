import _ from 'lodash';
import { notificationMessages } from '../../services/helpers/notificationMessages';

export const getUserNameInitials = (names) => {
  const firstName = names[0] ? names[0].trim().toUpperCase() : ' ';
  const lastName = names[1] ? names[1].trim().toUpperCase() : ' ';

  return firstName[0] + lastName[0];
};

export const isThereAnyStringEmpty = (strings) => {
  const undefinedValueFound = _.find(strings, (str) => str === undefined);
  if (undefinedValueFound) {
    return true;
  }

  const emptyStringFound = _.find(strings, (str) => {
    const trimmedStr = str.trim();
    return trimmedStr === '';
  });

  return emptyStringFound !== undefined;
};

export const isThereAnyStringNotRespectingDeterminedLength = (strings, length) => {
  const invalidString = _.find(strings, (str) => str.length < length);

  return invalidString !== undefined;
};

export const sortUsersAlphabetical = (list) => list.sort((a, b) => {
  const nameA = a.firstName.toUpperCase();
  const nameB = b.firstName.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

export const sortWishListAlphabetical = (list) => list.sort((a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

export const getNotificationMessageOption = (notificationType) => {
  const notificationMessage = notificationMessages(notificationType);
  const notificationOption = Math.floor(Math.random() * notificationMessage.length);
  return notificationOption;
};

