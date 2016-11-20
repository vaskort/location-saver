import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

class LocationList extends React.Component {

  constructor() {
    super();
  }

  renderHiddenRow(rowData, secID, rowID, rowMap) {
    return (
      <TouchableOpacity
        style={styles.rowBack}
        onPress={ _ => { this.props.onDelete(rowID); rowMap[`${secID}${rowID}`].closeRow()} }>
            <Text>Delete</Text>
            <Text
              style={styles.deleteButton}>
              Delete
            </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.dataSource);
    var {onDelete} = this.props;

    return (
      <List>
        <SwipeListView
          dataSource={dataSource}
          renderRow={(rowData) => <ListItem title={rowData} />}
          renderHiddenRow={ this.renderHiddenRow.bind(this) }
          leftOpenValue={75}
          rightOpenValue={-75}
          disableRightSwipe={true}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  deleteButton: {
    color: 'white'
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
});

module.exports = LocationList;
