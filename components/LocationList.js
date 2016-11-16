import React, { Component } from 'react';
import { ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

class LocationList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.dataSource);

    return (
      <List>
        <SwipeListView
          dataSource={dataSource}
          renderRow={(rowData) => <ListItem title={rowData} />}
        />
      </List>
    );
  }
}

module.exports = LocationList;
