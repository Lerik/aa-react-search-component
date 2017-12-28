import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Linking, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Actions } from 'react-native-router-flux';
import * as storage from '../services/helpers/storageHelper';
import { selectLogin } from './LoginPage/selectors';
import * as loginActions from './LoginPage/actions';

const splashScreenImg = require('../../img/splash-screen.png');

const mapStateToProps = createStructuredSelector({
  loginStore: selectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...loginActions,
    }, dispatch),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  splashImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export class App extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    setTimeout(() => {
      this.props.actions.checkLoginStatusAction({});
    }, 1500);
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillUnmount() {
  }

  render() {
    return (<View style={styles.container}>
      <Image
        accessible
        accessibilityLabel="splashScreenImage"
        style={styles.splashImage}
        resizeMode="contain"
        source={splashScreenImg}
      />
    </View>);
  }
}

App.propTypes = {
  actions: React.PropTypes.any.isRequired,
  loginStore: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
