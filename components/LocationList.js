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
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.renameBg}
          onPress={ _ => { this.props.onRename(rowData, rowID); rowMap[`${secID}${rowID}`].closeRow()} }>
              <Text
                style={styles.renameButton}>
                Rename
              </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBg}
          onPress={ _ => { this.props.onDelete(rowID); rowMap[`${secID}${rowID}`].closeRow()} }>
              <Text
                style={styles.deleteButton}>
                Delete
              </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.dataSource);
    var { onClickRow } = this.props;

    return (
      <List>
        <SwipeListView
          enableEmptySections={true}
          dataSource={dataSource}
          previewFirstRow={true}
          previewOpenValue={-75}
          tension={50}
          renderRow={(rowData) =>
            <View style={styles.listItemParent}>
              <ListItem onPress={ _ => {onClickRow(rowData)} } title={rowData.name} />
            </View>
          }
          renderHiddenRow={ this.renderHiddenRow.bind(this) }
          leftOpenValue={85}
          rightOpenValue={-75}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  deleteButton: {
    color: 'white'
  },
  renameButton: {
    color: 'white'
  },
  renameBg: {
    backgroundColor: 'blue',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingLeft: 15
  },
  deleteBg: {
    backgroundColor: 'red',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listItemParent: {
    backgroundColor: 'white',
    paddingLeft: -15,
  }
});

module.exports = LocationList;
