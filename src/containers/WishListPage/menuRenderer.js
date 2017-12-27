import React from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { WHITE, BLACK } from '../../styles/color-constants';

const OPEN_ANIM_DURATION = 225;
const CLOSE_ANIM_DURATION = 195;

export const styles = StyleSheet.create({
  options: {
    position: 'absolute',
    borderRadius: 2,
    backgroundColor: WHITE,
    width: 200,

    // Shadow only works on iOS.
    shadowColor: BLACK,
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 4,

    // This will elevate the view on Android, causing shadow to be drawn.
    elevation: 5,
  },
});


export const computePosition = () => ({ top: 10, right: 10 });

export default class MenuRenderer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scaleAnim: new Animated.Value(0.1),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.scaleAnim, {
      duration: OPEN_ANIM_DURATION,
      toValue: 1,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  close() {
    return new Promise((resolve) => {
      Animated.timing(this.state.scaleAnim, {
        duration: CLOSE_ANIM_DURATION,
        toValue: 0,
        easing: Easing.in(Easing.cubic),
      }).start(resolve);
    });
  }

  render() {
    const { style, children, ...other } = this.props;//eslint-disable-line
    const animation = {
      transform: [{ scale: this.state.scaleAnim }],
      opacity: this.state.scaleAnim,
    };
    const position = computePosition();
    return (
      <Animated.View {...other} style={[styles.options, style, animation, position]}>
        {children}
      </Animated.View>
    );
  }

}


// public exports
MenuRenderer.computePosition = computePosition;
