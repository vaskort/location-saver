import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

class MapModal extends React.Component {
  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={false}
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
  }
})


module.exports = MapModal;
