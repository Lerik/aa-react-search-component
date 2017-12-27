import React from 'react';
import { shallow } from 'enzyme';
import { default as NotificationsRedux, Notifications } from '../../../src/containers/Notifications'; // eslint-disable-line

jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

const mockUserData = {
  _id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
};

describe('Notifications', () => {
  const props = {
    loginStore: {
      user: mockUserData,
    },
    friendsStore: {
      friendshipId: 'id-01',
      friends: [mockUserData],
    },
    actions: {
      removeFriendRequestAction: jest.fn(),
      updateFriendship: jest.fn(),
      getUsersRequesters: jest.fn(),
      createNotification: jest.fn(),
      showConfirmModal: jest.fn(),
      hideConfirmModal: jest.fn(),
    },
  };

  const wrapper = shallow(<Notifications {...props} />);
  const instance = wrapper.instance();

  it('should connect to redux', () => {
    expect(wrapper.length).toBe(1);
  });

  describe('When componentWillReceiveProps', () => {
    it('should call an instance of "setState"', () => {
      const nextProps = {
        friendsStore: {
          requesters: [],
        },
        notificationsStore: {
          notifications: [],
        },
      };
      instance.componentWillReceiveProps(nextProps);
      expect(instance.setState).not.toBe(undefined);
    });
  });

  it('Should call function "getDataSourceForRequestsListbox"', () => {
    const mockRequest = {
      id: 'id',
    };
    instance.state.requests.push(mockRequest);
    const result = instance.getDataSourceForRequestsListbox();

    expect(result).not.toBe(undefined);
  });

  it('Should call function "rowHasChangedOnRequestsListbox"', () => {
    const r1 = 'foo';
    const r2 = 'bar';
    const result = instance.rowHasChangedOnRequestsListbox(r1, r2);

    expect(result).toEqual(true);
  });

  it('Should call function "rowHasChangedOnNotificationsListbox"', () => {
    const r1 = 'foo';
    const r2 = 'foo';
    const result = instance.rowHasChangedOnNotificationsListbox(r1, r2);

    expect(result).toEqual(false);
  });

  it('Should call function "deleteFriendRequest"', () => {
    const requestedId = {
      friendId: 'id-01',
    };
    instance.deleteFriendRequest(requestedId);

    expect(props.actions.removeFriendRequestAction.mock.calls.length).toBeGreaterThan(0);
    expect(props.actions.removeFriendRequestAction.mock.calls[0]).toEqual([{ friendId: 'id-01' }, 'id']);
  });

  it('Should call function "createFriendRequests"', () => {
    const mockRequesters = [
      { _id: 'id1' },
      { _id: 'id2' },
    ];
    instance.createFriendRequests(mockRequesters);

    expect(instance.state.requests.length).toBe(2);
  });

  it('Should call function "renderRequestsListbox"', () => {
    const result = instance.renderRequestsListbox();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "renderRequestsListboxItem"', () => {
    const result = instance.renderRequestsListboxItem();
    expect(result).not.toBe(undefined);
  });

  it('Should call function "render"', () => {
    const result = instance.render();
    expect(result).not.toBe(undefined);
  });

  describe('When updating friendShip', () => {
    it('Should call action "createNotification"', () => {
      instance.updateFriendship(mockUserData);
      expect(props.actions.createNotification.mock.calls.length).toBeGreaterThan(0);
    });
  });
});
