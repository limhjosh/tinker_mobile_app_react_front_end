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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
    };
  }

   render() {
     return (
       <View style={styles.container}>
        <View style={styles.usernameContainer}>
          <Text style={styles.nameText}>
            matth3wjones
            {this.state.username}
          </Text>
        </View>
        <View style={styles.firstNameContainer}>
          <Text style={styles.nameText}>
            Matthew
            {this.state.first_name}
          </Text>
        </View>
        <View style={styles.lastNameContainer}>
          <Text style={styles.nameText}>
            Jones
            {this.state.last_name}
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
