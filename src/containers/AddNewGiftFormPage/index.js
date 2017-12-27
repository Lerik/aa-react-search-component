import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  Keyboard,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { selectWishList } from '../WishListPage/selectors';
import * as wishlistActions from '../WishListPage/actions';
import * as confirmModalActions from '../ConfirmModal/actions';
import {
  INPUT_COLOR,
  BLACK,
  WHITE,
  ICE_BLUE,
  DUSTY_ORANGE,
  DARK_TAUPE,
} from '../../styles/color-constants';
import CustomTextInput from '../../components/CustomTextInput';
import config from '../../../config.json';

const backIcon = require('../../../img/Chevron_3x.png');
const takePictureIcon = require('../../../img/take_picture_icon.png');
const uploadPictureIcon = require('../../../img/upload_picture_icon.png');
const urlIcon = require('../../../img/url_icon.png');

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    marginTop: (Platform.OS === 'ios') ? -15 : 0,
  },
  giftPictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: ICE_BLUE,
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 40,
  },
  giftPictureBoxContainer: {
    height: 100,
    backgroundColor: WHITE,
    borderRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 15,
    margin: 10,
    elevation: 4,
    shadowColor: BLACK,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  giftImageWrapper: {
    flex: 1,
    height: 180,
    marginBottom: 40,
  },
  giftImage: {
    flex: 1,
  },
  pictureBoxImage: {
    alignSelf: 'center',
    width: 60,
    height: 50,
  },
  pictureBoxText: {
    fontSize: 10,
    marginTop: 10,
  },
  uploadPicture: {
    width: 38,
    height: 50,
  },
  giftNavBarContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  giftTextNavBar: {
    color: INPUT_COLOR,
    fontSize: 16,
    fontWeight: '100',
  },
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  spinnerText: {
    color: DARK_TAUPE,
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  modalSpinner: {
    marginTop: 20,
  },
  createGiftButton: {
    padding: 5,
  },
  backButton: {
    padding: 7,
  },
  backButtonImage: {
    width: 10 + (screenWidth * 0.01),
    height: 22 + (screenWidth * 0.01),
  },
});

const mapStateToProps = createStructuredSelector({
  wishListStore: selectWishList(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...wishlistActions,
      ...confirmModalActions,
    }, dispatch),
  };
}

export class AddNewGiftForm extends React.Component {
  constructor(props) {
    super();
    let selectedWishListItem = props.wishListStore.selectedWishListItem;
    if (!selectedWishListItem) {
      selectedWishListItem = {};
    }

    this.state = {
      giftId: selectedWishListItem._id, // eslint-disable-line
      giftName: selectedWishListItem.name,
      giftDescription: selectedWishListItem.description,
      giftLink: selectedWishListItem.link,
      errorMessageName: '',
      errorMessageDescription: '',
      errorMessageLink: '',
      height: 0,
      imageUri: selectedWishListItem.imageUrl,
      isCreatingGift: false,
    };

    this.createGift = this.createGift.bind(this);
    this.returnToWishlistDetail = this.returnToWishlistDetail.bind(this);
    this.handleUpdateGiftName = this.handleUpdateGiftName.bind(this);
    this.handleUpdateGiftDescription = this.handleUpdateGiftDescription.bind(this);
    this.handleUpdateGiftUrl = this.handleUpdateGiftUrl.bind(this);
    this.onUploadTap = this.onUploadTap.bind(this);
    this.validate = this.validate.bind(this);
    this.callCreateWishAction = this.callCreateWishAction.bind(this);
    this.imagePickerResponse = this.imagePickerResponse.bind(this);
    this.onCameraTap = this.onCameraTap.bind(this);
    this.onUploadTap = this.onUploadTap.bind(this);
    this.onImageTap = this.onImageTap.bind(this);
    this.onWishCreation = this.onWishCreation.bind(this);
  }

  onCameraTap() {
    ImagePicker.launchCamera({ quality: 0.2 }, this.imagePickerResponse);
  }

  onUploadTap() {
    ImagePicker.launchImageLibrary({ quality: 0.2 }, this.imagePickerResponse);
  }

  onImageTap() {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, this.imagePickerResponse);
  }

  onWishCreation() {
    this.setState({
      isCreatingGift: false,
    });
    this.props.actions.hideConfirmModal();
    Actions.WishListDetail();
  }

  imagePickerResponse(response) {
    if (!response.didCancel && !response.error && !response.customButton) {
      this.setState({
        imageUri: `data:image/jpeg;base64,${response.data}`,
      });
    }
  }

  returnToWishlistDetail() {
    Actions.WishListDetail();
  }

  handleUpdateGiftName(giftName) {
    this.setState({
      giftName,
    });
  }

  handleUpdateGiftDescription(giftDescription) {
    this.setState({
      giftDescription,
    });
  }

  handleUpdateGiftUrl(link) {
    const giftLink = link.replace(/ /g, '');
    this.setState({
      giftLink,
    });
  }

  callCreateWishAction(imageId) {
    const giftId = this.state.giftId;
    const giftName = this.state.giftName.trim();
    const giftDescription = this.state.giftDescription;
    const giftLink = this.state.giftLink;

    this.props.actions.showConfirmModal({
      content: (<View style={styles.spinnerWrapper}>
        <Text style={styles.spinnerText}>
          {
            this.state.giftId ? 'Updating gift' : 'Creating gift'
          }
        </Text>
        <ActivityIndicator
          size="large"
          style={styles.modalSpinner}
          color={DUSTY_ORANGE}
        />
      </View>),
      buttons: [],
    });

    const wishList = Object.assign({}, this.props.wishListStore.selectedWishList);
    if (giftId) {
      const wishListItem = wishList.items
      .filter((wishListItem) => giftId === wishListItem._id //eslint-disable-line
       )[0];

      wishListItem.name = giftName;
      wishListItem.description = giftDescription;
      wishListItem.link = giftLink;
      wishListItem.imageUrl = imageId ? `uploads/${imageId}` : wishListItem.imageUrl;
    } else {
      if (wishList.items.length === 0) {
        wishList.items = [];
      }

      wishList.items.unshift({
        name: giftName,
        description: giftDescription,
        imageUrl: imageId ? `uploads/${imageId}` : null,
        link: giftLink,
      });
    }

    const payload = {
      wishList,
      callback: this.onWishCreation,
    };

    this.props.actions.createWishAction(payload);
  }

  createGift() {
    if (this.validate() && !this.state.isCreatingGift) {
      this.setState({
        isCreatingGift: true,
      });
      this.props.actions.showConfirmModal({
        content: (<View style={styles.spinnerWrapper}>
          <Text style={styles.spinnerText}>Uploading Image</Text>
          <ActivityIndicator
            size="large"
            style={styles.modalSpinner}
            color={DUSTY_ORANGE}
          />
        </View>),
        buttons: [],
      });
      if (this.state.imageUri && this.state.imageUri.indexOf('uploads/') === -1) {
        const uploadImagePayload = {
          image: {
            uri: this.state.imageUri,
          },
          callback: this.callCreateWishAction,
        };

        this.props.actions.uploadWishImageAction(uploadImagePayload);
      } else {
        this.callCreateWishAction();
      }
    }
  }

  validate() {
    const giftName = this.state.giftName;

    Keyboard.dismiss();

    if (!giftName) {
      this.setState({
        giftName,
        errorMessageName: 'The gift name is required',
      });
      return false;
    }

    if (giftName.length === 1) {
      this.setState({
        errorMessageName: 'The gift name is too short. It should be at least 2 characters or more',
      });
      return false;
    }
    return true;
  }

  renderImageForm() {
    return this.state.imageUri ? (
      <TouchableHighlight
        underlayColor="transparent"
        style={styles.giftImageWrapper}
        onPress={this.onImageTap}
      >
        <Image
          resizeMode="cover"
          style={styles.giftImage}
          source={{ uri: this.state.imageUri.indexOf('uploads/') > -1 ?
         `${config.S3Bucket}${this.state.imageUri.replace('uploads/', '')}` :
          this.state.imageUri }}
        />
      </TouchableHighlight>
              ) : (
                <View style={styles.giftPictureContainer}>
                  <View style={styles.giftPictureBoxContainer}>
                    <TouchableHighlight
                      underlayColor="transparent"
                      onPress={this.onCameraTap}
                    >
                      <View>
                        <Image
                          style={styles.pictureBoxImage}
                          source={takePictureIcon}
                        />
                        <Text
                          style={styles.pictureBoxText}
                        >
                        Take a picture
                      </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.giftPictureBoxContainer}>
                    <TouchableHighlight
                      underlayColor="transparent"
                      onPress={this.onUploadTap}
                    >
                      <View>
                        <Image
                          style={[styles.pictureBoxImage, styles.uploadPicture]}
                          source={uploadPictureIcon}
                        />
                        <Text
                          style={styles.pictureBoxText}
                        >
                        Upload a picture
                      </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
            );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.giftNavBarContainer}>
          <TouchableHighlight
            accessible
            accessibilityLabel="Go Back to My Lists"
            underlayColor={WHITE}
            onPress={this.returnToWishlistDetail}
            style={styles.backButton}
          >
            <View>
              <Image
                style={styles.backButtonImage}
                source={backIcon}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            accessible
            accessibilityLabel="Add Gift"
            underlayColor={WHITE}
            onPress={this.createGift}
            style={styles.createGiftButton}
          >
            <View>
              <Text style={styles.giftTextNavBar}>
                {this.state.giftId ? 'Edit Gift' : 'Add Gift'}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <KeyboardAwareScrollView>
          {this.renderImageForm()}
          <CustomTextInput
            accessibilityLabel={'giftName'}
            inputTitle={'Name'}
            value={this.state.giftName}
            onValueChange={this.handleUpdateGiftName}
            placeHolder={'Name'}
            errorMessage={this.state.errorMessageName}
            maxLength={50}
          />
          <CustomTextInput
            inputTitle={'Description'}
            value={this.state.giftDescription}
            onValueChange={this.handleUpdateGiftDescription}
            placeHolder={'Description'}
            multiline
          />
          <CustomTextInput
            accessibilityLabel={'giftLink'}
            value={this.state.giftLink}
            onValueChange={this.handleUpdateGiftUrl}
            placeHolder={'Paste a link'}
            icon={urlIcon}
            multiline
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

AddNewGiftForm.propTypes = {
  actions: React.PropTypes.any.isRequired,
  wishListStore: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewGiftForm);
