import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {Button, Icon} from 'react-native-elements';

class MapModal extends React.Component {

  state = {
    region: {
      latitude: this.props.initialLatitude,
      longitude: this.props.initialLongitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.isMapModalVisible}
        >
        <View style={styles.container}>
         <MapView
             region={this.state.region}
             style={styles.map}
           >
           <MapView.Marker
             draggable
             coordinate={this.state.region}
             title='yo'
             description='teh test'
             onDragEnd={
               (e) => {
                 this.setState({ x: e.nativeEvent.coordinate });
               }
             }
           />
         </MapView>
         {/* find my location button */}
         <Icon
           iconStyle={styles.findUsersLocation}
           containerStyle={styles.findUsersLocation}
           raised
           large
           name='target-two'
           type='foundation'
           color='#000000'
           size={40}
           underlayColor='transparent'
           onPress={this.props.onFindLocation}
         />
         <View className="buttonWrapper" style={styles.buttonWrapper}>
           <Button
             title='Close'
             buttonStyle={styles.button}
             onPress={this.props.closeMapModal}
           />
           <Button
             title='Add location'
             buttonStyle={styles.button}
             onPress={this.props.closeMapModal}
           />
         </View>
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
  buttonWrapper: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 10
  },
  button: {
    backgroundColor: '#00998a',
    borderRadius: 5,
    marginTop: 20,
  },
  findUsersLocation: {
    flex: 1,
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'transparent',
    shadowColor: 0
  }
})


module.exports = MapModal;
