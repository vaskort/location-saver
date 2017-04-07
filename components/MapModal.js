import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {Button, Icon} from 'react-native-elements';
import Promise from 'bluebird';

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

  // this function moves marker and region to the user location
  _moveMarkerRegion = (location) => {
    console.log('inside move marker region func');
    console.log(location, this.state.region);
    this.setState({
      region: {
        ...this.state.region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    })
  }

  render() {
    let markerLocation = this.state.markerPosition.latitude !== 'undefined' ? this.state.markerPosition : this.state.region ;
    let self = this;

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
             showsUserLocation={true}
             showsMyLocationButton={false}
             toolbarEnabled={false}
           >
           <MapView.Marker
             draggable
             coordinate={this.state.region}
             title='Marker'
             description='Keep pressing to move'
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
             title='Add marker location'
             buttonStyle={styles.button}
             onPress={ this.props.onAddLocation.bind(this, markerLocation) }
           />
         </View>
         {/* find my location button inside the map modal */}
         <Icon
           containerStyle={[styles.findUserLocationContainer, styles.findUsersLocation]}
           large
           name='target-two'
           type='foundation'
           color='#000000'
           size={40}
           underlayColor='transparent'
           onPress = {
              (e) => {
                // TODO: make the following as a promise
                self.props.onFindLocation();
                this._moveMarkerRegion(self.props.userLocation);
              }
          }
         />
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
    position: 'absolute',
    top:30,
    left:20,
    flex: 1
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  }
})


module.exports = MapModal;
