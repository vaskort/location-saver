import React, { Component } from 'react';

class MapModal extends React.Component {
  render() {
    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.isMapModalVisible}
          >
         <View>
           test
         </View>
        </Modal>
    );
  }
}

module.exports = MapModal;
