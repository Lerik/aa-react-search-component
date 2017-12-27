import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { default as AddNewGiftFormRedux, AddNewGiftForm } from '../../../src/containers/AddNewGiftFormPage';  // eslint-disable-line
import * as wishlistActions from '../../../src/containers/WishListPage/actions';
import * as confirmModalActions from '../../../src/containers/ConfirmModal/actions';
import reducers from '../../../src/reducers/index';

const store = createStore(
  reducers,
);

jest.mock('react-native-router-flux', (() => ({
  Actions: {
    WishListDetail: jest.fn(),
  },
})));

jest.mock('react-native-image-picker', (() => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
  showImagePicker: jest.fn(),
})));

describe('AddNewGiftFormPage', () => {
  const wrapperRedux = shallow(<AddNewGiftFormRedux store={store} />);

  const props = {
    wishListStore: wrapperRedux.node.props.wishListStore,
    actions: {
      ...wishlistActions,
      ...confirmModalActions,
    },
  };

  let wrapper = shallow(<AddNewGiftForm {...props} />);
  let instance = wrapper.instance();

  const giftName = 'Gift Name';
  const giftDescription = 'Gift Description';
  const giftLink = 'GiftLink';

  it('should connect to redux', () => {
    expect(wrapperRedux.length).toBe(1);
  });
  it('should fail creating a gift when the name is empty', () => {
    instance.handleUpdateGiftName('');
    instance.createGift();

    expect(instance.state.errorMessageName).toBe('The gift name is required');
  });
  it('should fail creating a gift when the name is less than two characters', () => {
    instance.handleUpdateGiftName('g');
    instance.createGift();

    expect(instance.state.errorMessageName).toBe('The gift name is too short. It should be at least 2 characters or more');
  });
  it('should create a gift', () => {
    instance.props.actions.createWishAction = jest.fn();
    instance.props.wishListStore.selectedWishList = {
      items: [],
    };
    instance.handleUpdateGiftName(giftName);
    instance.createGift();

    expect(instance.props.actions.createWishAction.mock.calls.length).toBe(1);
  });
  it('should set gift name state', () => {
    instance.handleUpdateGiftName(giftName);

    expect(instance.state.giftName).toBe(giftName);
  });
  it('should set gift description state', () => {
    instance.handleUpdateGiftDescription(giftDescription);

    expect(instance.state.giftDescription).toBe(giftDescription);
  });
  it('should set gift link state', () => {
    instance.handleUpdateGiftUrl(giftLink);

    expect(instance.state.giftLink).toBe(giftLink);
  });
  it('should go to WishList screen', () => {
    instance.returnToWishlistDetail();

    expect(Actions.WishListDetail.mock.calls.length).toBe(1);
  });
  it('should launch camera', () => {
    instance.onCameraTap();

    expect(ImagePicker.launchCamera.mock.calls.length).toBe(1);
    expect(ImagePicker.launchCamera.mock.calls[0][0]).toEqual({ quality: 0.2 });
  });
  it('should launch gallery', () => {
    instance.onUploadTap();

    expect(ImagePicker.launchImageLibrary.mock.calls.length).toBe(1);
    expect(ImagePicker.launchImageLibrary.mock.calls[0][0]).toEqual({ quality: 0.2 });
  });
  it('should launch both cases', () => {
    instance.onImageTap();

    expect(ImagePicker.showImagePicker.mock.calls.length).toBe(1);
  });
  it('should handle imagePicker response', () => {
    instance.setState = jest.genMockFn();
    const responseData = {
      data: 'DATA',
    };
    instance.imagePickerResponse(responseData);
    expect(instance.setState.mock.calls.length).toBe(1);
    expect(instance.setState.mock.calls[0]).toEqual([{
      imageUri: 'data:image/jpeg;base64,DATA',
    }]);
  });
  it('should handle imagePicker when response is null', () => {
    instance.setState.mockClear();

    instance.imagePickerResponse({ error: 'error' });
    expect(instance.setState.mock.calls.length).toBe(0);
  });
  it('should handle wish created callback', () => {
    Actions.WishListDetail.mockClear();
    instance.onWishCreation();

    expect(Actions.WishListDetail.mock.calls.length).toBe(1);
  });
  it('should handle creating wishes with images', () => {
    const imageUri = 'uri';
    instance.props.actions.createWishAction = jest.genMockFn();
    instance.callCreateWishAction(imageUri);

    expect(instance.props.actions.createWishAction.mock.calls.length).toBe(1);
    expect(instance.props.actions.createWishAction.mock.calls[0][0].wishList.items[0].imageUrl).toBe(`uploads/${imageUri}`);
  });
  it('should create image before wish', () => {
    instance.state.imageUri = 'R0lGODlhEwATAPcAAP/+//7/////+////fvzYvryYvvzZ/fxg/zxWfvxW/zwXPrtW/vxXvfrXv3xYvrvYvntYvnvY/ruZPrwZPfsZPjsZfjtZvfsZvHmY/zxavftaPrvavjuafzxbfnua/jta/ftbP3yb/zzcPvwb/zzcfvxcfzxc/3zdf3zdv70efvwd/rwd/vwefftd/3yfPvxfP70f/zzfvnwffvzf/rxf/rxgPjvgPjvgfnwhPvzhvjvhv71jfz0kPrykvz0mv72nvblTPnnUPjoUPrpUvnnUfnpUvXlUfnpU/npVPnqVPfnU/3uVvvsWPfpVvnqWfrrXPLiW/nrX/vtYv7xavrta/Hlcvnuf/Pphvbsif3zk/zzlPzylfjuk/z0o/LqnvbhSPbhSfjiS/jlS/jjTPfhTfjlTubUU+/iiPPokfrvl/Dll/ftovLWPfHXPvHZP/PbQ/bcRuDJP/PaRvjgSffdSe3ddu7fge7fi+zkuO7NMvPTOt2/Nu7SO+3OO/PWQdnGbOneqeneqvDqyu3JMuvJMu7KNfHNON7GZdnEbejanObXnOW8JOa9KOvCLOnBK9+4Ku3FL9ayKuzEMcenK9e+XODOiePSkODOkOW3ItisI9yxL+a9NtGiHr+VH5h5JsSfNM2bGN6rMJt4JMOYL5h4JZl5Jph3Jpl4J5h5J5h3KJl4KZp5Ks+sUN7Gi96lLL+PKMmbMZt2Jpp3Jpt3KZl4K7qFFdyiKdufKsedRdm7feOpQN2QKMKENrpvJbFfIrNjJL1mLMBpLr9oLrFhK69bJFkpE1kpFYNeTqFEIlsoFbmlnlsmFFwpGFkoF/////7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANAALAAAAAATABMAAAj/AKEJHCgokKJKlhThGciQYSIva7r8SHPFzqGGAwPd4bKlh5YsPKy0qFLnT0NAaHTcsIHDho0aKkaAwGCGEkM1NmSkIjWLBosVJT6cOjUrzsBKPl54KmYsACoTMmk1WwaA1CRoeM7siJEqmTIAsjp40ICK2bEApfZcsoQlxwxRzgI8W8XhgoVYA+Kq6sMK0QEYKVCUkoVqQwQJFTwFEAAAFZ9PlFy4OEEiRIYJD55EodDA1ClTbPp0okRFxBQDBRgskAKhiRMlc+Sw4SNpFCIoBBwkUMBkCBIiY8qAgcPG0KBHrBTFQbCEV5EjQYQACfNFjp5CgxpxagVtUhIjwzaJYSHzhQ4cP3ryQHLEqJbASnu+6EIW6o2b2X0ISXK0CFSugazs0YYmwQhziyuE2PLLIv3h0hArkRhiCCzAENOLL7tgAoqDGLXSSSaPMLIIJpmAUst/GA3UCiuv1PIKLtw1FBAAOw==';
    wrapper = shallow(<AddNewGiftForm {...props} />);
    instance.props.actions.uploadWishImageAction = jest.genMockFn();
    instance.state.isCreatingGift = false;
    instance.createGift();

    expect(instance.props.actions.uploadWishImageAction.mock.calls.length).toBe(1);
    expect(instance.props.actions.uploadWishImageAction.mock.calls[0][0].image.uri).toBe(instance.state.imageUri);
  });
  it('should render AddNewGiftForm component when selectedWishListItem is passed as props', () => {
    props.wishListStore = {
      selectedWishList: {
        _id: 1,
        name: 'Wish List',
        description: '',
        link: '',
        imageUrl: 'uploads/file.jpg',
        items: [{
          _id: 1,
          name: 'gift 1',
        }],
      },
    };
    wrapper = shallow(<AddNewGiftForm {...props} />);

    expect(wrapper).not.toBe(undefined);
  });
  it('should handle updating wishes with images', () => {
    instance = wrapper.instance();
    const imageUri = 'uri';
    instance.state.giftId = 1;
    instance.state.giftName = '';
    instance.props.actions.createWishAction.mockClear();
    instance.callCreateWishAction(imageUri);

    expect(instance.props.actions.createWishAction.mock.calls.length).toBe(1);
    expect(instance.props.actions.createWishAction.mock.calls[0][0].wishList.items[0].imageUrl).toBe(`uploads/${imageUri}`);
  });
});
