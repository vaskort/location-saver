import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  ListView,
  LayoutAnimation,
  Linking
} from 'react-native';
import {Button} from 'react-native-elements';
import LocationList from './components/LocationList';
import RenameModal from './components/RenameModal';


export default class reactNativeProject extends Component {

  state = {
    buttonDisable: true,
    buttonTitle: 'Loading you location....',
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    modalIsVisible: false,
    modalLocationName: '',
    locationsArray: {
      locations: [
      ]
    }
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 100000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      // position.name = 'Location ' + this.state.locationsArray.locations.length + 1;
      // console.log(position.name);
      var lastPosition = position;
      console.log(position);
      this.setState({
        lastPosition: position
      });
      this.setState({
        buttonDisable: false,
        buttonTitle: 'Add my location'
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _getLocation = () => {
    var lastPositionWithName = this.state.lastPosition;
    lastPositionWithName.name = 'Location ' + parseInt(this.state.locationsArray.locations.length + 1);
    var locations = this.state.locationsArray.locations;
    locations.push(lastPositionWithName);
    this.setState({
      locations: locations
    });
    console.log(this.state.locationsArray.locations);
  }

  _deleteRow = (rowID) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      locations: this.state.locationsArray.locations.splice(rowID, 1)
    });
  }

  _renameRow = (rowData) => {
    // first show the modal
    this._setModalVisible(true);
    console.log(rowData.name);
    console.log(this._modalLocationName(rowData.name));
  }

  _onClickRow = (rowData) => {
    locationObject = rowData;
    console.log(locationObject);
    var url = 'http://maps.google.com/maps?q=loc:' + locationObject.coords.latitude + '+' + locationObject.coords.longitude;
    // var url = 'http://www.google.com';
    console.log(url);

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _setModalVisible = (visible) => {
    this.setState({modalIsVisible: visible});
  }

  _modalLocationName = (name) => {
    return name;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to locationSaver!
        </Text>
        <Text style={styles.instructions}>
          Click the button to save your location to the list
        </Text>
        <View>
          <Button raised icon={{name: 'room'}}
            title={this.state.buttonTitle}
            buttonStyle={styles.button}
            onPress={this._getLocation}
            disabled={this.state.buttonDisable}
            accessibilityLabel="Add your location"
          />
        </View>
        <View style={styles.locationListContainer}>
          <LocationList
            key={this._data}
            style={styles.locationList}
            dataSource={this.state.locationsArray.locations}
            onDelete={ this._deleteRow }
            onRename={ this._renameRow }
            onClickRow={ this._onClickRow }
          />
        </View>
        <View>
          <RenameModal
            isVisible={ this.state.modalIsVisible }
            setModalVisible={ this._setModalVisible }
            locationName={ this._modalLocationName }
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  locationListContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  locationList: {
    alignSelf: 'stretch'
  },
  button: {
    backgroundColor: '#00998a',
    borderRadius: 5,
    marginTop: 20
  }
});

AppRegistry.registerComponent('reactNativeProject', () => reactNativeProject);
