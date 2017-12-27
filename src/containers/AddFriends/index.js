/* eslint no-underscore-dangle: 0 */

import React from 'react';
import Contacts from 'react-native-contacts';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Bar from 'react-native-bar-collapsible';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  TouchableHighlight,
  Image,
  ListView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  WHITE,
  HEADER_ACCORDION_BACKGROUND_COLOR,
  DARK_TAUPE,
  DUSTY_ORANGE,
  ICON_NAME_BACKGROUNDCOLOR,
  INPUT_COLOR,
  BACKGROUNDCOLOR,
} from '../../styles/color-constants';

import * as confirmModalActions from '../ConfirmModal/actions';
import * as FriendsActions from '../Friends/actions';
import { selectFriends } from '../Friends/selectors';
import { selectLogin } from '../LoginPage/selectors';
import { getUserNameInitials, sortUsersAlphabetical } from '../../services/helpers/utils';

const noPermissionsImage = require('../../../img/ghost-allow-contact.png');
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  allowContainer: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstHeaderText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif-light',
    fontSize: 13,
    marginBottom: 3,
    color: DARK_TAUPE,
  },
  secondsHeaderText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: DUSTY_ORANGE,
  },
  headerMessage: {
    backgroundColor: HEADER_ACCORDION_BACKGROUND_COLOR,
    paddingLeft: 20,
    paddingTop: 30,
  },
  headerCollapsible: {
    backgroundColor: HEADER_ACCORDION_BACKGROUND_COLOR,
    paddingLeft: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 20 + (screenWidth * 0.05),
    height: 20 + (screenWidth * 0.05),
    borderRadius: (40 + (screenWidth * 0.05)) / 2,
    backgroundColor: ICON_NAME_BACKGROUNDCOLOR,
    alignSelf: 'center',
  },
  iconText: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: INPUT_COLOR,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    padding: 15,
    alignItems: 'center',
  },
  listItemName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: DUSTY_ORANGE,
    paddingLeft: 25,
  },
  addEverybodyContainer: {
    flexDirection: 'row',
    backgroundColor: ICON_NAME_BACKGROUNDCOLOR,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addEverybodyText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: DUSTY_ORANGE,
    paddingLeft: 5,
  },
  addFriendsButton: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: DUSTY_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFriendsButtonText: {
    fontSize: 14,
    color: WHITE,
  },
  listItemNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  listItemButtonContainer: {
    alignItems: 'flex-end',
  },
  listViewContentFriends: {
    paddingBottom: 350,
  },
  listViewContentInvites: {
    paddingBottom: 620,
  },
  requestSentText: {
    fontSize: 10,
    fontFamily: 'Roboto',
    color: DARK_TAUPE,
  },
  noPermissionsImage: {
    width: 238,
    height: 238,
    borderWidth: 0,
  },
  noPermissionsText: {
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 42,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_TAUPE,
  },
  noPermissionsButton: {
    marginTop: 21,
    paddingLeft: 16,
    paddingRight: 16,
    height: 36,
    width: 150,
    borderRadius: 18,
    backgroundColor: DUSTY_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPermissionsButtonText: {
    fontSize: 14,
    color: WHITE,
    fontWeight: 'bold',
  },
  modalText: {
    color: DARK_TAUPE,
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalSpinner: {
    marginTop: 20,
  },
});

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
  friendsStore: selectFriends(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...FriendsActions,
    ...confirmModalActions,
  }, dispatch),
});

export class AddFriends extends React.Component {
  constructor() {
    super();

    const dsFriendsListbox = new ListView.DataSource({ rowHasChanged: this.rowHasChangedOnFriendsListbox });
    const dsInvitesListbox = new ListView.DataSource({ rowHasChanged: this.rowHasChangedOnInvitesListbox });

    this.state = {
      dataSourceFriendsListbox: dsFriendsListbox,
      dataSourceInvitesListbox: dsInvitesListbox,
      friends: [],
      invites: [],
      invitationsSent: [],
      contactAuthorized: false,
      isCreatingRequest: false,
    };

    this.createFriendRequest = this.createFriendRequest.bind(this);
    this.createInvitation = this.createInvitation.bind(this);
    this.createAllFriendRequest = this.createAllFriendRequest.bind(this);
    this.createAllContactInvitations = this.createAllContactInvitations.bind(this);
    this.onRequestSent = this.onRequestSent.bind(this);
  }
  componentDidMount() {
    Contacts.requestPermission((error, permission) => {
      if (permission === 'authorized') {
        this.setState({
          contactAuthorized: true,
        });
        this.loadContacts();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.createFriendsFromRequests(
      nextProps.friendsStore.friendsRequested,
      nextProps.friendsStore.requesters,
      nextProps.friendsStore.users,
    );
    this.createAllContactInvitations(
      nextProps.friendsStore.contacts, nextProps.friendsStore.users, nextProps.friendsStore.invitationsSent
    );
  }
  onRequestSent() {
    this.props.actions.hideConfirmModal();
    this.setState({
      isCreatingRequest: false,
    });
  }
  getDataSourceForFriendsListbox() {
    return this.state.dataSourceFriendsListbox.cloneWithRows(this.state.friends);
  }
  getDataSourceForInvitesListbox() {
    return this.state.dataSourceInvitesListbox.cloneWithRows(this.state.invites);
  }
  getPhoneNumbersFromContacts(contacts) {
    const numbers = [];
    contacts.forEach((contact) => {
      const numbersExtracted = contact.phoneNumbers.map((phoneNumber) => phoneNumber.number);
      numbersExtracted.forEach((n) => {
        const numberFormatted = this.fixPhoneNumber(n);
        if (numberFormatted) {
          numbers.push({
            phoneNumber: this.fixPhoneNumber(n),
          });
        }
      });
    });
    return numbers;
  }
  getEmailsFromContacts(contacts) {
    const emails = [];
    contacts.forEach((contact) => {
      const emailsExtracted = contact.emailAddresses.map((emailAddress) => emailAddress.email);
      emailsExtracted.forEach((n) => {
        emails.push({
          email: n,
        });
      });
    });
    return emails;
  }
  createFriendsFromRequests(requesteds, requesters, usersList) {
    if (usersList.length === 0) {
      return;
    }
    const users = usersList.filter((user) => user._id !== this.props.loginStore.user._id);
    const friends = this.props.friendsStore.friends.map((friend) => friend._id);
    const usersNotOnFriendList = users.filter((user) => !friends.includes(user._id));

    const usersWithoutRequesters = requesters.length ?
    usersNotOnFriendList.filter((user) => {
      const requesterFound = requesters.find((request) => request._id === user._id);
      return requesterFound === undefined;
    })
      :
      usersNotOnFriendList;
    const friendsList = usersWithoutRequesters.map((user) => {
      const requestedFound = requesteds && requesteds.length ?
        requesteds.find((requested) => requested._id === user._id)
        :
        undefined;

      return requestedFound === undefined ?
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        requested: false,
      }
        :
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        requested: true,
      };
    });
    this.setState({
      friends: sortUsersAlphabetical(friendsList),
    });
  }
  createAllContactInvitations(contacts, usersList, invitationsSent) {
    if (contacts.length === 0) {
      return;
    }
    const users = usersList.filter((user) => user._id !== this.props.loginStore.user._id);
    const usersPhoneNumber = users.map((user) => user.phoneNumber);
    const unregisteredContacts = contacts.filter((contact) => {
      if (!contact.givenName) {
        return false;
      }

      if (!contact.emailAddresses.length > 0 && !contact.phoneNumbers.length > 0) {
        return false;
      }

      const numbers = this.getPhoneNumbersFromContacts([contact]);
      let userExists = false;
      numbers.forEach((number) => {
        if (usersPhoneNumber.includes(number.phoneNumber)) {
          userExists = true;
        }
      });

      if (!userExists) {
        const usersEmails = users.map((user) => user.email);
        const emails = this.getEmailsFromContacts([contact]);
        emails.forEach((email) => {
          if (usersEmails.includes(email.email)) {
            userExists = true;
          }
        });
      }
      return !userExists;
    });
    const inviteList = unregisteredContacts.map((user) => {
      const invitationFound = invitationsSent.find((invitationSent) => invitationSent === user.recordID);

      return invitationFound === undefined ?
      {
        recordID: user.recordID,
        firstName: user.givenName,
        lastName: user.familyName,
        phoneNumbers: user.phoneNumbers,
        emailAddresses: user.emailAddresses,
        invited: false,
      }
        :
      {
        recordID: user.recordID,
        firstName: user.givenName,
        lastName: user.familyName,
        phoneNumbers: user.phoneNumbers,
        emailAddresses: user.emailAddresses,
        invited: true,
      };
    });
    this.setState({
      invites: sortUsersAlphabetical(inviteList),
    });
  }
  createFriendRequest(friendId) {
    if (!this.state.isCreatingRequest) {
      this.setState({
        isCreatingRequest: true,
      });
      this.props.actions.showConfirmModal({
        content: (<View style={styles.spinnerWrapper}>
          <Text style={styles.modalText}>Sending friend request...</Text>
          <ActivityIndicator
            size="large"
            style={styles.modalSpinner}
            color={DUSTY_ORANGE}
          />
        </View>),
        buttons: [],
      });
      this.props.actions.createFriendRequest({
        requesterId: this.props.loginStore.user._id,
        requestedId: friendId,
      }, this.props.loginStore.user._id, this.onRequestSent);
    }
  }
  createInvitation(contactData) {
    if (!this.state.isCreatingRequest) {
      this.setState({
        isCreatingRequest: true,
      });
      this.props.actions.showConfirmModal({
        content: (<View style={styles.spinnerWrapper}>
          <Text style={styles.modalText}>Sending invitation...</Text>
          <ActivityIndicator
            size="large"
            style={styles.modalSpinner}
            color={DUSTY_ORANGE}
          />
        </View>),
        buttons: [],
      });

      const numbers = [];
      const emails = [];
      if (contactData.phoneNumbers.length > 0) {
        numbers.push(this.fixPhoneNumber(contactData.phoneNumbers[0].number));
      } else {
        emails.push(contactData.emailAddresses[0].email);
      }

      const invitationsSent = this.props.friendsStore.invitationsSent;
      invitationsSent.push(contactData.recordID);
      this.setState({
        invitationsSent,
      });
      this.props.actions.invitationsSent(invitationsSent);
      this.props.actions.sendInvitations({ numbers, emails }, this.onRequestSent);
    }
  }

  showCreateAllInvitationsConfirmation() {
    this.props.actions.showConfirmModal({
      content: (<Text style={styles.modalText}>Are you sure you want to send invitation to all contacts?</Text>),
      buttons: [{
        text: 'Cancel',
        onPress: this.props.actions.hideConfirmModal,
      }, {
        text: 'Invite',
        onPress: this.createAllInvitations(),
      }],
    });
  }
  createAllInvitations() {
    return () => {
      if (!this.state.isCreatingRequest) {
        this.setState({
          isCreatingRequest: true,
        });
        this.props.actions.hideConfirmModal();
        this.props.actions.showConfirmModal({
          content: (<View style={styles.spinnerWrapper}>
            <Text style={styles.modalText}>Sending all invitations...</Text>
            <ActivityIndicator
              size="large"
              style={styles.modalSpinner}
              color={DUSTY_ORANGE}
            />
          </View>),
          buttons: [],
        });
        const numbers = [];
        const emails = [];
        const invitationsSent = this.props.friendsStore.invitationsSent;
        this.state.invites.forEach((invite) => {
          if (!invite.invited) {
            if (invite.phoneNumbers.length > 0) {
              numbers.push(this.fixPhoneNumber(invite.phoneNumbers[0].number));
            } else {
              emails.push(invite.emailAddresses[0].email);
            }
            invitationsSent.push(invite.recordID);
          }
        });
        this.setState({
          invitationsSent,
        });
        this.props.actions.invitationsSent(invitationsSent);
        this.props.actions.sendInvitations({ numbers, emails }, this.onRequestSent);
      }
    };
  }
  showCreateAllFriendRequestsConfirmation() {
    this.props.actions.getAllFriendsAction(this.props.loginStore.user._id);
    this.props.actions.showConfirmModal({
      content: (<Text style={styles.modalText}>Are you sure you want to add all friends?</Text>),
      buttons: [{
        text: 'Cancel',
        onPress: this.props.actions.hideConfirmModal,
      }, {
        text: 'Add',
        onPress: this.createAllFriendRequest(),
      }],
    });
  }
  createAllFriendRequest() {
    return () => {
      if (!this.state.isCreatingRequest) {
        this.setState({
          isCreatingRequest: true,
        });
        this.props.actions.hideConfirmModal();
        this.props.actions.showConfirmModal({
          content: (<View style={styles.spinnerWrapper}>
            <Text style={styles.modalText}>Sending all friend requests...</Text>
            <ActivityIndicator
              size="large"
              style={styles.modalSpinner}
              color={DUSTY_ORANGE}
            />
          </View>),
          buttons: [],
        });
        const userId = this.props.loginStore.user._id;
        const availableFriends = this.state.friends.filter((friend) => !friend.requested);
        const allFriendRequests = availableFriends.map((friend) => {
          const friendRequest = {
            requesterId: userId,
            requestedId: friend.id,
          };
          return friendRequest;
        });
        this.props.actions.createFriendRequest(allFriendRequests, this.props.loginStore.user._id, this.onRequestSent);
      }
    };
  }
  fixPhoneNumber(number) {
    const numbersOnly = number.replace(/\D/g, '');
    if (numbersOnly.startsWith('1') && numbersOnly.length === 11) {
      return `+${numbersOnly}`;
    } else if ((numbersOnly.startsWith('1') && numbersOnly.length === 10) ||
               (numbersOnly.length === 10)) {
      return `+1${numbersOnly}`;
    }
    return undefined;
  }
  requestContactPermission() {
    Contacts.requestPermission((error, permission) => {
      if (permission !== 'authorized') {
        this.props.actions.showConfirmModal({
          content: (<Text style={styles.modalText}>We will securely upload your contacts to help you
            connect with friends and suggest users to follow on Twitter.
          </Text>),
          buttons: [{
            text: 'Don\'t Allow',
            onPress: this.props.actions.hideConfirmModal,
          }, {
            text: 'Settings',
            onPress: () => {
              this.props.actions.hideConfirmModal();
              Linking.openURL('app-settings:');
            },
          }],
        });
      } else {
        this.loadContacts();
      }
    });
  }
  loadContacts() {
    Contacts.getAll((error, contacts) => {
      if (error !== 'denied') {
        this.props.actions.getContacts(contacts);
        this.lookUpForContactsRegistered(contacts);
      }
    });
  }
  lookUpForContactsRegistered(contacts) {
    const contactsWithPhoneNumbers = [];
    const contactsWithEmails = [];
    contacts.forEach((contact) => {
      if (contact.phoneNumbers.length > 0) {
        contactsWithPhoneNumbers.push(contact);
      } else if (contact.emailAddresses.length > 0) {
        contactsWithEmails.push(contact);
      }
    });
    const numbers = this.getPhoneNumbersFromContacts(contactsWithPhoneNumbers);
    const emails = this.getEmailsFromContacts(contactsWithEmails);
    const queryArray = [...numbers, ...emails];
    this.props.actions.getUsersInformation({
      query: {
        $or: queryArray,
      },
    });
  }
  rowHasChangedOnFriendsListbox(r1, r2) {
    return r1 !== r2;
  }
  rowHasChangedOnInvitesListbox(r1, r2) {
    return r1 !== r2;
  }
  renderAddFriends() {
    return (
      <View>
        <View style={styles.addEverybodyContainer}>
          <Text style={styles.addEverybodyText}>
            Add Everybody!
          </Text>

          <TouchableHighlight
            style={styles.addFriendsButton}
            underlayColor={BACKGROUNDCOLOR}
            onPress={() => this.showCreateAllFriendRequestsConfirmation()}
          >
            <Text
              style={styles.addFriendsButtonText}
            >
              Add All
            </Text>
          </TouchableHighlight>
        </View>
        { this.renderFriendsListbox() }
      </View>);
  }
  renderInviteFriends() {
    return (
      <View>
        <View style={styles.addEverybodyContainer}>
          <Text style={styles.addEverybodyText}>
              Invite Errbody
            </Text>

          <TouchableHighlight
            style={styles.addFriendsButton}
            underlayColor={BACKGROUNDCOLOR}
            onPress={() => this.showCreateAllInvitationsConfirmation()}
          >
            <Text
              style={styles.addFriendsButtonText}
            >
                Invite All
              </Text>
          </TouchableHighlight>
        </View>
        { this.renderInvitationsListbox() }
      </View>
    );
  }
  renderFriendsListbox() {
    return (
      <ListView
        enableEmptySections
        contentContainerStyle={this.state.friends.length > 5 ? styles.listViewContentFriends : null}
        dataSource={this.getDataSourceForFriendsListbox()}
        renderRow={this.renderFriendsListboxItem()}
      />
    );
  }
  renderInvitationsListbox() {
    return (
      <ListView
        enableEmptySections
        contentContainerStyle={this.state.invites.length > 1 ? styles.listViewContentInvites : null}
        dataSource={this.getDataSourceForInvitesListbox()}
        renderRow={this.renderInvitationsListboxItem()}
      />
    );
  }
  renderFriendsListboxItem() {
    return ((friendData) =>
    (
      <View style={styles.listItem}>
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <Text style={styles.iconText}>
              {getUserNameInitials([friendData.firstName, friendData.lastName])}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.listItemNameContainer}>
            <Text style={styles.listItemName} numberOfLines={1}>
              {friendData.firstName} {friendData.lastName}
            </Text>
          </View>

          <View style={styles.listItemButtonContainer}>
            {
              friendData.requested ?
                (<Text style={styles.requestSentText}>
                  REQUEST SENT
                </Text>)
                :
                (<TouchableHighlight
                  style={styles.addFriendsButton}
                  underlayColor={BACKGROUNDCOLOR}
                  onPress={() => this.createFriendRequest(friendData.id)}
                >
                  <Text
                    style={styles.addFriendsButtonText}
                  >
                    Add
                  </Text>
                </TouchableHighlight>)
            }
          </View>
        </View>
      </View>
  ));
  }
  renderInvitationsListboxItem() {
    return ((contactData) =>
    (
      <View style={styles.listItem}>
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <Text style={styles.iconText}>
              {getUserNameInitials([contactData.firstName, contactData.lastName])}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.listItemNameContainer}>
            <Text style={styles.listItemName} numberOfLines={1}>
              {contactData.firstName} {contactData.lastName}
            </Text>
          </View>

          <View style={styles.listItemButtonContainer}>
            {
              contactData.invited ?
                (<Text style={styles.requestSentText}>
                  INVITATION SENT
                </Text>)
                :
                (<TouchableHighlight
                  style={styles.addFriendsButton}
                  underlayColor={BACKGROUNDCOLOR}
                  onPress={() => this.createInvitation(contactData)}
                >
                  <Text
                    style={styles.addFriendsButtonText}
                  >
                    Invite
                  </Text>
                </TouchableHighlight>)
            }
          </View>
        </View>
      </View>
  ));
  }
  renderAllowScreen() {
    return (
      <View style={styles.allowContainer}>
        <Image
          accessibilityLabel="no-wishLists"
          style={styles.noPermissionsImage}
          source={noPermissionsImage}
        />
        <Text
          style={styles.noPermissionsText}
        >
          Let us access your contact list so we can find your friends.
        </Text>
        <TouchableHighlight
          style={styles.noPermissionsButton}
          underlayColor={BACKGROUNDCOLOR}
          onPress={() => this.requestContactPermission()}
        >
          <Text
            style={styles.noPermissionsButtonText}
          >
            Allow
          </Text>
        </TouchableHighlight>
      </View>);
  }
  render() {
    return (this.state.contactAuthorized ?
      <View style={styles.container}>
        <View style={styles.headerMessage}>
          <Text style={styles.firstHeaderText}>Start scoring some swag!</Text>
        </View>
        <Bar
          title="Add Friends on Gifthub"
          collapsible
          showOnStart
          iconCollapsed="chevron-up"
          iconOpened="chevron-down"
          style={styles.headerCollapsible}
          titleStyle={styles.secondsHeaderText}
          tintColor={DUSTY_ORANGE}
          iconSize={22}
        >
          {this.renderAddFriends()}
        </Bar>

        <View style={styles.headerMessage}>
          <Text style={styles.firstHeaderText}>Bring more friends to the party!</Text>
        </View>
        <Bar
          title="Invite them to join gifthub"
          collapsible
          showOnStart
          iconCollapsed="chevron-up"
          iconOpened="chevron-down"
          style={styles.headerCollapsible}
          titleStyle={styles.secondsHeaderText}
          tintColor={DUSTY_ORANGE}
          iconSize={22}
        >
          {this.renderInviteFriends()}
        </Bar>
      </View>
      :
      this.renderAllowScreen()
    );
  }
}

FriendsActions.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
  friendsStore: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);
