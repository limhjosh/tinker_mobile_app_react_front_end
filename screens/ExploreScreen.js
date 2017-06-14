import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import { COLOR_BEIGE, COLOR_BLUE, COLOR_BACKGROUND } from '../components/styles/common'
import { GlobalState } from '../global.js'

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfUsers: [],
    };
    fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token,
      }
    })
    .then((response) => {console.log(response); return response.json()})
    .then((responseJson) => {
      console.log(responseJson)
    })
  }

   render() {
     return (
       <View style={styles.container}>

        <Text style={{padding: 10, fontSize: 22, margin: 15}}>
          Find new stylists
        </Text>
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
})
