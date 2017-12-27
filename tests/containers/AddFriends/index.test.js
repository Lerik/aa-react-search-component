import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { default as AddFriendsRedux, AddFriends } from '../../../src/containers/AddFriends'; // eslint-disable-line
import reducers from '../../../src/reducers/index';

const store = createStore(
  reducers,
);

jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));
jest.mock('react-native-contacts', () => ({
  getAll: jest.fn((cb) => cb('data', null)),
  requestPermission: jest.fn((cb) => cb(null, 'unauthorized')),
}));

const mockUsers = [
  {
    _id: 'id1',
    recordID: 'recorId',
    givenName: 'givenName1',
    familyName: 'familyName1',
    emailAddresses: 'test1@test.com',
    phoneNumbers: [
      { number: '1111111111' },
      { number: '2222222222' },
    ],
  },
  {
    _id: 'id2',
    recordID: 'recorId',
    givenName: 'givenName2',
    familyName: 'familyName2',
    emailAddresses: 'test2@test.com',
    phoneNumbers: [
      { number: '3333333333' },
      { number: '4444444444' },
    ],
  },
];

const mockContacts = [
  {
    user1: 'test1',
    givenName: 'test1',
    emailAddresses: [
      { email: 'test1@test.com ' },
      { email: 'test2@test.com ' },
    ],
    phoneNumbers: [
      { number: '1111111111' },
      { number: '2222222222' },
    ],
  },
  {
    user2: 'test2',
    givenName: 'test2',
    emailAddresses: [
      { email: 'test3@test.com ' },
      { email: 'test4@test.com ' },
    ],
    phoneNumbers: [
      { number: '3333333333' },
      { number: '4444444444' },
    ],
  },
];

const mockInvitations = [
  {
    invited: true,
    recordID: 'recordID',
    emailAddresses: [
      { email: 'test@test.com' },
      { email: 'test2@test.com' },
    ],
    phoneNumbers: [
      { number: '+122222222' },
      { number: '+133333333' },
    ],
  },
];


describe('AddFriends', () => {
  const wrapperRedux = shallow(<AddFriendsRedux store={store} />);

  const props = {
    loginStore: wrapperRedux.node.props.loginStore,
    friendsStore: wrapperRedux.node.props.friendsStore,
    actions: {
      getContacts: jest.fn(),
      getUsersInformation: jest.fn(),
      getAllFriendsAction: jest.fn(),
      createFriendRequest: jest.fn(),
      invitationsSent: jest.fn(),
      sendInvitations: jest.fn(),
      showConfirmModal: jest.fn(),
      hideConfirmModal: jest.fn(),
    },
  };

  const wrapper = shallow(<AddFriends {...props} />);
  const instance = wrapper.instance();

  it('should connect to redux', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should simulate a confirm dialog when addUserNameMessageError prop changed', () => {
    const nextProps = {
      friendsStore: {
        friendsRequested: 'test',
        contacts: mockContacts,
        requesters: mockUsers,
        users: mockUsers,
        invitationsSent: mockInvitations,
      },
    };
    instance.componentWillReceiveProps(nextProps);
    expect(instance.createAllContactInvitations).not.toBe(undefined);
  });

  it('Should call function createFriendRequest', () => {
    props.actions.createFriendRequest.mockClear();
    instance.createFriendRequest({ friendId: 1 });

    expect(props.actions.createFriendRequest.mock.calls.length).toBe(1);
  });

  it('Should call createAllFriendRequest', () => {
    const createAllFriendRequestAction = instance.createAllFriendRequest();

    expect(createAllFriendRequestAction instanceof Function);
    createAllFriendRequestAction();

    expect(props.actions.createFriendRequest.mock.calls.length).toBeGreaterThan(0);
    expect(props.actions.hideConfirmModal.mock.calls.length).toEqual(0);
    expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual(undefined);
  });

  it('Should call createAllFriendRequest', () => {
    const createAllFriendRequestAction = instance.createAllFriendRequest();

    expect(createAllFriendRequestAction instanceof Function);
    createAllFriendRequestAction();

    expect(props.actions.createFriendRequest.mock.calls.length).toBeGreaterThan(0);
    expect(props.actions.hideConfirmModal.mock.calls.length).toEqual(0);
    expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual(undefined);
  });

  describe('When showing modal for "Create All Friends"', () => {
    it('Should display confirmation modal', () => {
      expect(props.actions.getAllFriendsAction.mock.calls.length).toEqual(0);
      expect(props.actions.getAllFriendsAction.mock.calls[0]).toEqual(undefined);
      instance.showCreateAllFriendRequestsConfirmation();
      expect(props.actions.showConfirmModal.mock.calls.length).toBeGreaterThan(0);
    });
    describe('And user press "Add"', () => {
      it('Should call function "createAllFriendRequest"', () => {
        const createAllFriendRequestFunction = instance.createAllFriendRequest();
        expect(createAllFriendRequestFunction instanceof Function);
        createAllFriendRequestFunction();

        expect(props.actions.createFriendRequest.mock.calls.length).toBeGreaterThan(0);
        expect(props.actions.hideConfirmModal.mock.calls.length).toEqual(0);
        expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual(undefined);
      });
    });
  });

  it('Should call createAllInvitations', () => {
    const createAllInvitationsAction = instance.createAllInvitations();

    expect(createAllInvitationsAction instanceof Function);
    createAllInvitationsAction();

    expect(props.actions.invitationsSent.mock.calls.length).toEqual(0);
    expect(props.actions.hideConfirmModal.mock.calls.length).toEqual(0);
    expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual(undefined);
  });

  it('Should call createAllInvitations', () => {
    const createAllInvitationsAction = instance.createAllInvitations();

    expect(createAllInvitationsAction instanceof Function);
    createAllInvitationsAction();

    expect(props.actions.invitationsSent.mock.calls.length).toEqual(0);
    expect(props.actions.hideConfirmModal.mock.calls.length).toEqual(0);
    expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual(undefined);
  });

  describe('When showing modal for "Create All Invites"', () => {
    it('Should display confirmation modal', () => {
      instance.showCreateAllInvitationsConfirmation();
      expect(props.actions.showConfirmModal.mock.calls.length).toBeGreaterThan(0);
    });
    describe('And user press "Invite"', () => {
      it('Should call function "createAllInvitations"', () => {
        const createAllInvitationsFunction = instance.createAllInvitations();
        expect(createAllInvitationsFunction instanceof Function);
        createAllInvitationsFunction();

        expect(props.actions.invitationsSent.mock.calls.length).toEqual(0);
        expect(props.actions.sendInvitations.mock.calls.length).toEqual(0);
        expect(props.actions.hideConfirmModal.mock.calls.length).toEqual(0);
        expect(props.actions.hideConfirmModal.mock.calls[0]).toEqual(undefined);
      });
    });
  });

  describe('When validating a phoneNumber', () => {
    it('Should receive a phoneNumber with +1 at first', () => {
      const mockNumber = '7439995951';
      const expectedResult = '+17439995951';
      const result = instance.fixPhoneNumber(mockNumber);

      expect(result).toEqual(expectedResult);
    });

    it('Should receive the same phoneNumber with + symbol at first', () => {
      const mockNumber = '17439995951';
      const expectedResult = '+17439995951';
      const result = instance.fixPhoneNumber(mockNumber);

      expect(result).toEqual(expectedResult);
    });

    it('Should return "undefined" if phoneNumber format is incorrect', () => {
      const mockNumber = '7951';
      const result = instance.fixPhoneNumber(mockNumber);

      expect(result).toEqual(undefined);
    });
  });

  describe('when a user is creating an invitation', () => {
    const mockContactData = {
      recordID: 'recordId',
      emailAddresses: [
        { email: 'test1@test.com' },
        { email: 'test2@test.com' },
      ],
      phoneNumbers: [
        { number: '1111111111' },
        { number: '3333333333' },
      ],
    };

    it('Should push numbers from phoneNumbers to send invitation', () => {
      instance.createInvitation(mockContactData);

      expect(props.actions.invitationsSent.mock.calls.length).toEqual(0);
      expect(props.actions.sendInvitations.mock.calls.length).toEqual(0);
    });

    it('Should push email according to phoneNumbers being empty', () => {
      mockContactData.phoneNumbers = [];
      instance.createInvitation(mockContactData);

      expect(props.actions.invitationsSent.mock.calls.length).toEqual(0);
      expect(props.actions.sendInvitations.mock.calls.length).toEqual(0);
    });
  });

  it('Should call function "getEmailsFromContacts"', () => {
    const mockEmailContacts = [
      {
        emailAddresses: [
          { email: 'test1@test.com' },
        ],
      },
      {
        emailAddresses: [
          { email: 'test2@test.com' },
        ],
      },
    ];
    const expectedEmails = [
      { email: 'test1@test.com' },
      { email: 'test2@test.com' },
    ];
    const result = instance.getEmailsFromContacts(mockEmailContacts);

    expect(result).toEqual(expectedEmails);
  });

  it('Should call function "getDataSourceForFriendsListbox"', () => {
    const mockFriend = {
      id: 'id',
      firstName: 'firstName',
      lastName: 'lastName',
      requested: false,
    };

    instance.state.friends.push(mockFriend);
    const result = instance.getDataSourceForFriendsListbox();

    expect(result).not.toBe(undefined);
  });

  it('Should call function "getDataSourceForInvitesListbox"', () => {
    const mockInvites = {
      id: 'id',
      firstName: 'firstName',
      lastName: 'lastName',
    };

    instance.state.invites.push(mockInvites);
    const result = instance.getDataSourceForInvitesListbox();

    expect(result).not.toBe(undefined);
  });

  it('Should call function "getPhoneNumbersFromContacts"', () => {
    const result = instance.getPhoneNumbersFromContacts(mockContacts);

    expect(result).not.toBe(undefined);
    expect(result.length).toEqual(4);
  });

  it('Should call function "requestContactPermission"', () => {
    instance.requestContactPermission();
    expect(props.actions.showConfirmModal.mock.calls.length).toBeGreaterThan(0);
  });

  it('Should call function "lookUpForContactsRegistered"', () => {
    instance.lookUpForContactsRegistered(mockContacts, []);
    expect(props.actions.getUsersInformation.mock.calls.length).toBeGreaterThan(0);
  });

  it('Should call function "rowHasChangedOnFriendsListbox"', () => {
    const r1 = 'foo';
    const r2 = 'bar';
    const result = instance.rowHasChangedOnFriendsListbox(r1, r2);

    expect(result).toEqual(true);
  });

  it('Should call function "rowHasChangedOnInvitesListbox"', () => {
    const r1 = 'foo';
    const r2 = 'foo';
    const result = instance.rowHasChangedOnInvitesListbox(r1, r2);

    expect(result).toEqual(false);
  });

  it('Should call function "renderAllowScreen"', () => {
    const result = instance.renderAllowScreen();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "render"', () => {
    const result = instance.render();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "renderInviteFriends"', () => {
    const result = instance.renderInviteFriends();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "renderAddFriends"', () => {
    const result = instance.renderAddFriends();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "renderInvitationsListboxItem"', () => {
    const result = instance.renderInvitationsListboxItem();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "renderFriendsListbox"', () => {
    const result = instance.renderFriendsListbox();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "renderFriendsListboxItem"', () => {
    const result = instance.renderFriendsListboxItem();
    expect(result).not.toBe(undefined);
  });
});
