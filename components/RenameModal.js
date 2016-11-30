import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, StyleSheet} from 'react-native';

class RenameModal extends React.Component {

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.isVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View style={styles.modal}>
            <Text>{this.props.locationName}</Text>

            <TouchableHighlight onPress={() => {
              this.props.setModalVisible(false)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
         </View>
        </Modal>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

module.exports = RenameModal;
