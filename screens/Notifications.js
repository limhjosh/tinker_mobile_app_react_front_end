import React, { Component } from 'react';
import {
  ListView,
  Text,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import { COLOR_BEIGE, COLOR_BLUE, COLOR_BACKGROUND } from '../components/styles/common'
import { GlobalState } from '../global.js'

export default class Notifications extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['new row 1', 'new row 2', 'new row 3']),
      test: ''
    };
    fetch(`http://localhost:3000/users/1/requests/1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token,
      }
    })
    .then((response) => {console.log(response);return response.json()})
    .then((responseJson) => {
      this.setState({ test: responseJson.users })
    })
    .done()
  }

   render() {
     return (
       <View style={styles.container}>

        <Text style={styles.title}>
          Notifications
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
    marginTop: 40,
  },
  title: {
    padding: 10,
    fontSize: 22,
    marginBottom: 15,
    backgroundColor: COLOR_BEIGE,
    width: '100%',
    textAlign: 'center',
  },
})
