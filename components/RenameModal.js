import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';

class RenameModal extends React.Component {

  render() {
    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.isVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modalWrapper}>
          <View style={styles.modal}>
            <Text style={styles.locationName}>{this.props.locationName}</Text>
            <View style={styles.buttonWrapper}>
              <Button
                raised
                title="Save"
                onPress={() => {
                  this.props.setModalVisible(false)
                }}
                buttonStyle={styles.buttons}
              />
              <Button
                raised
                title="Cancel"
                onPress={() => {
                  this.props.setModalVisible(false)
                }}
                buttonStyle={styles.buttons}
              />
            </View>
          </View>
         </View>
        </Modal>
    );
  }

}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    height: 100,
    padding: 5
  },
  buttons: {
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  locationName: {
    flex:1,
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = RenameModal;
