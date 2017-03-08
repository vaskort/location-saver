import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, StyleSheet, Keyboard} from 'react-native';
import { Button, SearchBar } from 'react-native-elements';

class RenameModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyboardActive: false
    }
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow  = () => {
    this.setState({
      keyboardActive: true
    });
  }

  _keyboardDidHide = () => {
    this.setState({
      keyboardActive: false
    });
  }

  render() {
    var emptySpaceStyles = () => {
      if (this.state.keyboardActive === true) {
        return {
          flex:0
        }
      } else {
        return {
          flex:2
        }
      }
    }

    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.isVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modalWrapper}>
          <View style={emptySpaceStyles()}></View>
          <View style={styles.modal}>
            <View style={styles.renameContainer}>
              <Text style={styles.renameTitle}>
                Please choose a name for your location
              </Text>
            </View>
            <View style={styles.locationNameWrapper}>
              <SearchBar
                lightTheme={true}
                noIcon={true}
                maxLength={100}
                editable={true}
                defaultValue={this.props.locationName}
                onChangeText={this.props.onChangeCallback}
                containerStyle={styles.searchBarContainer}
                inputStyle={styles.searchBarInput}
                clearButtonMode={'always'}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                raised
                title="Cancel"
                onPress={() => {
                  this.props.setModalVisible(false)
                }}
                buttonStyle={styles.cancelButton}
              />
              <Button
                raised
                title="Save"
                onPress={() => {
                  this.props.renameLocation(this.props.locationName)
                }}
                buttonStyle={styles.buttons}
              />
            </View>
          </View>
          <View style={emptySpaceStyles()}></View>
         </View>
        </Modal>
    );
  }

}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modal: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    padding: 5,
    flex: 2,
    justifyContent: 'center',
  },
  buttons: {
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#00998a',
    marginTop: 0,
    width:100,
    flex: 1
  },
  cancelButton: {
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'grey',
    width:100,
    flex: 1
  },
  locationNameWrapper: {
    flex:1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  renameTitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop:5,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    justifyContent: 'center',
  },
  searchBarInput: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
  }
});

module.exports = RenameModal;
