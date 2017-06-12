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

export default class Notifications extends Component {

   render() {
     return (
       <View style={styles.container}>

        <Text style={{padding: 10, fontSize: 22}}>
          you have no notifications
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   margin: 15
  },
})
