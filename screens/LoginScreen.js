import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  AlertIOS,
  TouchableOpacity,
} from 'react-native';
import {
  COLOR_BEIGE,
  COLOR_BLUE,
  COLOR_BACKGROUND,
} from '../components/styles/common'
import { GlobalState } from '../global.js'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userinfo: '',
    };
  }

  _onPressButton() {
     fetch('http://localhost:3000/authenticate', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ user: {
         username: this.state.username,
         password: this.state.password }
       })
     })
     .then((response) => response.json())
     .then((responseJson) => {
       GlobalState.cache.auth_token = responseJson.auth_token
       GlobalState.cache.user_id = responseJson.id
       this.setState({ userinfo: JSON.stringify(responseJson) })
     })
     .done()
   }

   render() {
     return (
       <View style={styles.container}>
        <View style={styles.textInput}>
          <TextInput
            style={{height: 40}}
            placeholder="username"
            onChangeText={(text) => this.setState({ username: text })}
          />
        </View>

        <View style={styles.textInput}>
          <TextInput
            secureTextEntry={true}
            style={{height: 40}}
            placeholder="password"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton.bind(this)}
            title="Login"
            color='#fff'
          />
        </View>

        <Text style={{padding: 10, fontSize: 22}}>
          {this.state.userinfo}
        </Text>

        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={this._handleBackPress}
            style={styles.backLink}>
            <Text style={styles.backLinkText}>
              Back
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
  _handleBackPress = () => {
    this.props.navigator.push('home')
  };
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: COLOR_BACKGROUND,
  },
  textInput: {
    borderBottomColor: COLOR_BEIGE,
    borderBottomWidth: 2,
    margin: 15,
  },
  buttonContainer: {
    margin: 30,
    flexDirection: 'row',
    backgroundColor: COLOR_BLUE,
    justifyContent: 'center'
  },
  linkContainer: {
    alignItems: 'center',
  },
})
