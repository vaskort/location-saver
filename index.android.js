/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ListView
} from 'react-native';
import { List, ListItem } from 'react-native-elements'


export default class reactNativeProject extends Component {

  state = {
    buttonDisable: true,
    buttonTitle: 'Loading you location....',
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 100000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      console.log(lastPosition);
      this.setState({lastPosition});
      console.log(this.refs.button);
      this.setState({
        buttonDisable: false,
        buttonTitle: 'Click Bro'
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _getLocation = () => {
    Alert.alert(
      'Alert Title',
      this.state.lastPosition,
      [
        {text: 'OK'},
      ]
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <View>
          <Button title={this.state.buttonTitle} style={styles.button} onPress={this._getLocation} ref="button" disabled={this.state.buttonDisable} />
        </View>
        <View>
          <LocationList />
        </View>
      </View>
    );
  }
}

class LocationList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  render() {
    return (
      <List>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ListItem title={rowData} />}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  button: {
    width: 100
  }
});

AppRegistry.registerComponent('reactNativeProject', () => reactNativeProject);
