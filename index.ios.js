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
import MapModal from './components/MapModal';
import update from 'immutability-helper';


export default class reactNativeProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lastPosition: {
        coords: {
          latitude: 37.972025,
          longitude: 23.725979
        }
      },
      locationsArray: {
        locations: [
        ]
      },
      //rename modal
      modalIsVisible: false,
      //Map modal visibility
      isMapModalVisible: false,
    };
  }

  state = {
    buttonDisable: true,
    buttonTitle: 'Loading you location....',
    initialPosition: 'uknown',
    lastPosition: 'unknown',
    //rename modal
    modalIsVisible: false,
    //is used to find the item on the array of locations and change its name on save
    locationIndexInModal: '0',
    //Map modal visibility
    isMapModalVisible: false,
    // the location that rename modal shows
    modalLocationName: 'Dummy Location',
    locationsArray: {
      locations: [
      ]
    }
  };

  watchID: ?number = null;

  componentDidMount() {
    this._findUserPosition();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _findUserPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({initialPosition});
        console.log(position);
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

  // gets the location and saves it to the location array
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

  _renameRow = (rowData, rowID) => {
    // first show the modal
    this._setModalVisible(true, rowID);
    // change the name inside the modal
    this.setState({
      modalLocationName: rowData.name
    })
    console.log(rowData, rowID);
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

  _setModalVisible = (visible, rowID) => {
    // as we open the rename modal we need to set visibility of modal to true
    // but also the index of that location inside the textinput so we know
    // which location we will edit later when user clicks save
    this.setState({
      modalIsVisible: visible,
      locationIndexInModal: rowID
    });
  }

  _modalLocationName = (name) => {
    // sets the location that will be inside the textinput
    // inside the modal
    console.log(name);
    this.setState({
      modalLocationName: name
    })
  }
  // this function is triggered when you click save inside the rename modal
  _renameLocation = (name) => {
    //hide the modal since you clicked save
    var indexed = this.state.locationIndexInModal;
    this._setModalVisible(false);
    // add the old array in a var
    var oldLocationArray = this.state.locationsArray.locations;
    oldLocationArray[indexed].name = name
    console.log(name);
    this.setState({
      oldLocationArray
    });
    // console.log(this.state.locationsArray.locations);
  }

  _showMapModal = () => {
    this.setState({
      'isMapModalVisible': true
    })
  }

  _closeMapModal = () => {
    this.setState({
      'isMapModalVisible': false
    })
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
          <Button
            raised icon={{name: 'room'}}
            title={this.state.buttonTitle}
            buttonStyle={styles.button}
            onPress={this._getLocation}
            disabled={this.state.buttonDisable}
            accessibilityLabel="Add your location"
          />
          <Button
            title='Open Modal'
            buttonStyle={styles.button}
            onPress={this._showMapModal}
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
            renameLocation={ this._renameLocation }
            locationName={ this.state.modalLocationName }
            onChangeCallback={ this._modalLocationName }
            />
        </View>
        <MapModal
          isMapModalVisible={this.state.isMapModalVisible}
          closeMapModal={this._closeMapModal}
          initialLatitude={this.state.lastPosition.coords.latitude}
          initialLongitude={this.state.lastPosition.coords.longitude}
          onFindLocation={this._findUserPosition}
        />
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
