import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import Modal from 'react-native-simple-modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import * as confirmModalActions from './actions';
import {
  DUSTY_ORANGE,
  WHITE,
 } from '../../styles/color-constants';

const styles = StyleSheet.create({
  modalButton: {
    color: DUSTY_ORANGE,
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  contentWrapper: {
    padding: 20,
  },
  containerStyle: {
    borderRadius: 5,
  },
  modal: {
    alignItems: 'center',
  },
  whiteBackgroung: {
    backgroundColor: WHITE,
  },
});

const mapStateToProps = createStructuredSelector({
  confirmModalStore: (state) => state.ConfirmModalReducer.toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...confirmModalActions,
    }, dispatch),
  };
}

export class ConfirmModal extends Component {
  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
  }
  closeModal() {
    this.props.actions.hideConfirmModal();
  }
  render() {
    return (
      <Modal
        open={this.props.confirmModalStore.openConfirmModal}
        modalDidClose={this.closeModal}
        modalStyle={[styles.containerStyle, styles.whiteBackgroung]}
        style={styles.modal}
        closeOnTouchOutside={false}
      >
        <View>
          <View
            style={styles.contentWrapper}
          >
            {this.props.confirmModalStore.content}
          </View>
          <View
            style={styles.buttonsContainer}
          >
            {this.props.confirmModalStore.buttons ?
            this.props.confirmModalStore.buttons.map((button, idx) => (<TouchableHighlight
              key={button.text}
              onPress={button.onPress}
              underlayColor={'transparent'}
              style={styles.button}
              accessible
              accessibilityLabel={`confirmModalButton${idx}`}
            >
              <Text
                style={styles.modalButton}
              >{button.text}</Text>
            </TouchableHighlight>))
            : null}
          </View>
        </View>
      </Modal>
    );
  }
}


ConfirmModal.propTypes = {
  confirmModalStore: React.PropTypes.any.isRequired,
  actions: React.PropTypes.any.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
