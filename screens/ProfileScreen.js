import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  AlertIOS
} from 'react-native';
import { COLOR_BEIGE, COLOR_BLUE, COLOR_BACKGROUND } from '../components/styles/common'
import { GlobalState } from '../main.js'

export default class ProfileScreen extends Component {
  constructor(props) {
    console.log("global cache", GlobalState.cache)
    super(props);
    this.state = {
      username: '',
      email: '',
    };
    fetch(`http://localhost:3000/users/${GlobalState.cache.user_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token
      }
    })
    .then((response) => {console.log(response);return response.json()})
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({ username: responseJson.username, email: responseJson.email })
    })
    .done()
  }

   render() {
     return (
       <View style={styles.container}>
        <View style={styles.usernameContainer}>
          <Text style={styles.nameText}>
            {this.state.username}
          </Text>
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.nameText}>
            {this.state.email}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: COLOR_BACKGROUND,
  },
  nameText: {
    padding: 10,
    fontSize: 20
  },
})
