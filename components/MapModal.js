import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {Button} from 'react-native-elements';

class MapModal extends React.Component {
  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.isMapModalVisible}
        >
        <View style={styles.container}>
         <MapView
             region={{
               latitude: 37.78825,
               longitude: -122.4324,
               latitudeDelta: 0.015,
               longitudeDelta: 0.0121,
             }}
             style={styles.map}
           >
         </MapView>
         <Button
           title='Close'
           buttonStyle={styles.button}
           onPress={this.props.closeMapModal}
         />
       </View>
     </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    backgroundColor: '#00998a',
    borderRadius: 5,
    marginTop: 20
  }
})


module.exports = MapModal;
