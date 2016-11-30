import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight} from 'react-native';

class RenameModal extends React.Component {

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.isVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
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

module.exports = RenameModal;
