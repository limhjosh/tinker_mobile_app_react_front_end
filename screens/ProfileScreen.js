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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: ''
    };
  }

   render() {
     return (
       <View style={styles.container}>
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>
            matth3wjones
            {this.state.username}
          </Text>
        </View>
        <View style={styles.firstNameContainer}>
          <Text style={styles.firstNameText}>
            Matthew
            {this.state.first_name}
          </Text>
        </View>
        <View style={styles.lastNameContainer}>
          <Text style={styles.lastNameText}>
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
   margin: 15
  },
  usernameContainer: {
  },
  usernameText: {
    padding: 10,
    fontSize: 20
  },
  firstNameContainer: {
  },
  firstNameText: {
    padding: 10,
    fontSize: 20
  },
  lastNameContainer: {
  },
  lastNameText: {
    padding: 10,
    fontSize: 20
  },
})
