import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  Platform,
  Dimensions,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { WHITE, DUSTY_ORANGE, BLACK } from '../../styles/color-constants';
import * as navbarActions from './actions';
import * as wishlistActions from '../WishListPage/actions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...wishlistActions,
      ...navbarActions,
    }, dispatch),
  };
}

const mapStateToProps = createStructuredSelector({
  navbarStore: (state) => state.NavBarReducer.toJS(),
  wishListStore: (state) => state.WishListReducer.toJS(),
});


const GIFTHUB_LOGO = require('../../../img/gifthubLogo.png');
const backIcon = require('../../../img/Chevron_3x.png');
const searchIcon = require('../../../img/search_3x.png');

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 7,
  },
  rightItemText: {
    color: DUSTY_ORANGE,
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif',
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  centerItem: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'sans-serif-light',
    color: DUSTY_ORANGE,
  },
  leftItem: {
    flex: 1,
    padding: 7,
  },
  backIcon: {
    padding: 7,
  },
  backIconImage: {
    width: 10 + (screenWidth * 0.01),
    height: 15 + (screenWidth * 0.01),
  },
  searchIconImage: {
    width: 21 + (screenWidth * 0.01),
    height: 22 + (screenWidth * 0.01),
  },
});

export class NavBarPage extends React.Component {
  constructor() {
    super();
    this.goToNotifications = this.goToNotifications.bind(this);
    this.goToAddWishList = this.goToAddWishList.bind(this);
    this.getHeaderStyle = this.getHeaderStyle.bind(this);
    this.getHeaderTextColor = this.getHeaderTextColor.bind(this);
    this.getLeftIcon = this.getLeftIcon.bind(this);
    this.getRightIcon = this.getRightIcon.bind(this);
    this.goToFriendsScreen = this.goToFriendsScreen.bind(this);
  }
  getLeftIcon() {
    const { route } = this.props.navbarStore;
    if (route === 'AddFriends') {
      return (
        <TouchableHighlight
          accessible
          accessibilityLabel="GoBack"
          underlayColor={WHITE}
          onPress={this.goToFriendsScreen}
          style={styles.backIcon}
        >
          <View>
            <Image
              style={styles.backIconImage}
              source={backIcon}
            />
          </View>
        </TouchableHighlight>
      );
    }
    return null;
  }
  getRightIcon() {
    const { route } = this.props.navbarStore;

    if (this.props.navbarStore.route === 'WishList' &&
      this.props.wishListStore.wishLists.length > 0) {
      return (<TouchableHighlight
        underlayColor={'transparent'}
        style={styles.rightItem}
        onPress={this.goToAddWishList}
        accessible
        accessibilityLabel="Add List"
      >
        <Text style={styles.rightItemText}>Add List</Text>
      </TouchableHighlight>);
    }

    if (route === 'AddFriends') {
      return (
        <TouchableHighlight
          accessible
          accessibilityLabel="Search"
          underlayColor={WHITE}
          style={styles.backIcon}
        >
          <View>
            <Image
              style={styles.searchIconImage}
              source={searchIcon}
            />
          </View>
        </TouchableHighlight>
      );
    }
    return null;
  }
  getHeaderTextColor() {
    const { route } = this.props.navbarStore;

    if (route === 'Settings') {
      return WHITE;
    }
    return DUSTY_ORANGE;
  }
  getHeaderStyle() {
    const { route } = this.props.navbarStore;

    if (route === 'Settings') {
      return {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 44,
        backgroundColor: DUSTY_ORANGE,
      };
    }
    return {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      height: 44,
      backgroundColor: WHITE,
      elevation: 4,
      shadowColor: BLACK,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    };
  }
  goToAddWishList() {
    this.props.actions.selectWishListAction({});
    Actions.AddWishList();
  }
  goToNotifications() {
    if (this.props.navbarStore.route !== 'Notifications') {
      Actions.Notifications();
    }
  }
  goToFriendsScreen() {
    Actions.pop();
  }
  render() {
    return (<View style={this.getHeaderStyle()}>
      <View style={styles.leftItem}>
        {this.getLeftIcon()}
      </View>
      <View style={styles.centerItem}>
        {this.props.navbarStore.title ?
        (<Text
          style={[styles.headerTitle, { color: this.getHeaderTextColor() }]}
        >{this.props.navbarStore.title}</Text>) :
        (<Image
          source={GIFTHUB_LOGO}
        />)}

      </View>
      <View style={styles.rightItem}>
        {this.getRightIcon()}
      </View>

    </View>);
  }
}

NavBarPage.propTypes = {
  navbarStore: React.PropTypes.any.isRequired,
  wishListStore: React.PropTypes.any.isRequired,
  actions: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarPage);