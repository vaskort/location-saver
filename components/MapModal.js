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
    },
    markerPosition: {
      latitude: 'undefined',
      longitude: 'undefined'
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    var markerLocation = this.state.markerPosition.latitude !== 'undefined' ? this.state.markerPosition : this.state.region ;

    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.isMapModalVisible}
        onRequestClose={() => {}}
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
                 this.setState({
                   markerPosition: {
                     latitude: e.nativeEvent.coordinate.latitude,
                     longitude: e.nativeEvent.coordinate.longitude
                   }
                 });
               }
             }
           />
         </MapView>
         {/* find my location button inside the map modal */}
         <Icon
           iconStyle={styles.findUsersLocation}
           containerStyle={[styles.findUserLocationContainer, styles.findUsersLocation]}
           raised
           large
           name='target-two'
           type='foundation'
           color='#000000'
           size={40}
           underlayColor='transparent'
           onPress={this.props.onFindLocation}
         />
         <View style={styles.bubble}>
           <Text className="locationCoords">
             {this.state.markerPosition.latitude !== 'undefined' ? this.state.markerPosition.latitude.toPrecision(7) : this.state.region.latitude},
             {this.state.markerPosition.longitude !== 'undefined' ? this.state.markerPosition.longitude.toPrecision(7) : this.state.region.longitude}
           </Text>
         </View>
         <View className="buttonWrapper" style={styles.buttonWrapper}>
           <Button
             title='Close'
             buttonStyle={styles.button}
             onPress={ this.props.closeMapModal }
           />
           <Button
             title='Add location'
             buttonStyle={styles.button}
             onPress={ this.props.onAddLocation.bind(this, markerLocation) }
           />
         </View>
       </View>
     </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  findUserLocationContainer: {
    // color: 'transparent'
  },
  findUsersLocation: {
    flex: 1,
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'transparent',
    shadowColor: 0,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  }
})


module.exports = MapModal;
