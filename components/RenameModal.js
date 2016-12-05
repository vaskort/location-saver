import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, StyleSheet} from 'react-native';
import { Button, SearchBar } from 'react-native-elements';

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
          <View style={styles.emptySpace}></View>
          <View style={styles.modal}>
            <View style={styles.locationNameWrapper}>
              <SearchBar
                lightTheme={true}
                noIcon={true}
                maxLength={100}
                editable={true}
                defaultValue={this.props.locationName}
                onChangeText={this.props.onChangeCallback}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                raised
                title="Save"
                onPress={() => {
                  this.props.renameLocation(this.props.locationName)
                }}
                buttonStyle={styles.buttons}
              />
              <Button
                raised
                title="Cancel"
                onPress={() => {
                  this.props.setModalVisible(false)
                }}
                buttonStyle={styles.cancelButton}
              />
            </View>
          </View>
          <View style={styles.emptySpace}></View>
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
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modal: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    height: 100,
    padding: 5,
    flex: 1,
    justifyContent: 'center',
  },
  emptySpace: {
    flex: 1
  },
  buttons: {
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#00998a'
  },
  cancelButton: {
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'grey'
  },
  locationNameWrapper: {
    flex:2,
    // alignItems: 'center',
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
