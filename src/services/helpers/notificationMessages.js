import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import {
    DARK_TAUPE,
    MINT_COLOR,
    DUSTY_ORANGE,
   } from '../../styles/color-constants';

const styles = StyleSheet.create({
  listItemNotificationName: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'Roboto',
    color: DARK_TAUPE,
    paddingLeft: 25,
    fontWeight: 'bold',
  },
  listItemNotificationText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: DARK_TAUPE,
    paddingLeft: 25,
  },
  listItemNotificationNameDibs: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'Roboto',
    color: DUSTY_ORANGE,
    paddingLeft: 25,
    fontWeight: 'bold',
  },
  listItemNotificationNamePurchased: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'Roboto',
    color: MINT_COLOR,
    paddingLeft: 25,
    fontWeight: 'bold',
  },
});

export const notificationMessages = (notificationType, messageItem) => {
  if (notificationType === 'friendRequest') {
    return [
        (<Text><Text style={styles.listItemNotificationText}>Yay! </Text>
          <Text style={styles.listItemNotificationName}>{messageItem}</Text>
          <Text style={styles.listItemNotificationText} numberOfLines={2}> said yes!</Text>
        </Text>),
    (<Text><Text style={styles.listItemNotificationText}>You are now friends with </Text>
      <Text style={styles.listItemNotificationName} numberOfLines={2}>{messageItem}</Text>
    </Text>),
      (<Text><Text style={styles.listItemNotificationName}>{messageItem}</Text>
        <Text style={styles.listItemNotificationText} numberOfLines={2}> has accepted your friend request!</Text>
      </Text>),
    ];
  }

  if (notificationType === 'dibs') {
    return [
        (<Text>
          <Text style={styles.listItemNotificationText} numberOfLines={3}>A friend called
          <Text style={styles.listItemNotificationNameDibs}> dibs </Text>
           on a gift for you!</Text>
        </Text>),
    (<Text>
      <Text style={styles.listItemNotificationText} numberOfLines={3}>Ooh! Looks like someone called
          <Text style={styles.listItemNotificationNameDibs}> dibs </Text>
          on something for you!</Text>
    </Text>),
    ];
  }

  if (notificationType === 'purchased') {
    return [
        (<Text>
          <Text style={styles.listItemNotificationText} numberOfLines={3}>A friend just marked an item as
          <Text style={styles.listItemNotificationNamePurchased}> purchased </Text>!</Text>
        </Text>),
    (<Text>
      <Text style={styles.listItemNotificationText} numberOfLines={3}>This is exciting... an item was just marked
      <Text style={styles.listItemNotificationNamePurchased}> "purchased" </Text>on your list!</Text>
    </Text>),
    (<Text>
      <Text style={styles.listItemNotificationText} numberOfLines={3}>Somebody loves you! A friend just
      <Text style={styles.listItemNotificationNamePurchased}> bought </Text>you a gift!</Text>
    </Text>),
    ];
  }

  if (notificationType === 'wishlistCreated') {
    return [(<Text>
      <Text style={styles.listItemNotificationName}>{messageItem}</Text>
      <Text style={styles.listItemNotificationText} numberOfLines={2}> has created a new list.</Text>
    </Text>)];
  }

  if (notificationType === 'wishlistCompleted') {
    return [(<Text>
      <Text style={styles.listItemNotificationText} numberOfLines={3}>
            Holy moly! all items on your list <Text style={styles.listItemNotificationNameDibs}>{messageItem} </Text>
              have been marked as <Text style={styles.listItemNotificationNamePurchased}>purchased</Text>
      </Text>
    </Text>)];
  }
  return undefined;
};
