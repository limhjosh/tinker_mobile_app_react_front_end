import React, { Component } from 'react';
import {
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

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      userinfo: ''
    };
  }

  successCallBack(data) {
    console.log(data)
  }

  _onPressButton() {
     fetch('https://tinker-backend.herokuapp.com/users', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ user: { username: this.state.username } })
     })
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson)
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
            placeholder="select username"
            onChangeText={(text) => this.setState({ username: text })}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            style={{height: 40}}
            placeholder="enter email"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            style={{height: 40}}
            placeholder="create password"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            style={{height: 40}}
            placeholder="confirm password"
            onChangeText={(text) => this.setState({ password_confirmation: text })}
          />
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton.bind(this)}
            title="Next"
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
   margin: 15
  },
  textInput: {
    borderBottomColor: '#DEB87C',
    borderBottomWidth: 2
  },
  buttonContainer: {
    margin: 20
  },
  ButtonContainer: {
    margin: 30,
    flexDirection: 'row',
    backgroundColor: '#8AC4CF',
    justifyContent: 'center'
  },
  linkContainer: {
    alignItems: 'center',
  },
})
