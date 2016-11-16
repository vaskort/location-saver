import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

class LocationList extends React.Component {
  constructor() {
    super();
  }

  rowDelete() {
    console.log('yo bro');
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.dataSource);

    return (
      <List>
        <SwipeListView
          dataSource={dataSource}
          renderRow={(rowData) => <ListItem title={rowData} />}
          renderHiddenRow={ data => (
              <View style={styles.rowBack}>
                  <Text>Delete</Text>
                  <Text onPress={ this.props.onDelete }>Delete</Text>
              </View>
          )}
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
    backgroundColor: 'red'
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
});

module.exports = LocationList;
