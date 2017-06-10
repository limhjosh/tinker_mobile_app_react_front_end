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

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userinfo: ''
    };
  }

  successCallBack(data) {
    console.log(data)
    this.setState({ text: 'Hello' })
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
            onChangeText={(text) => this.setState({ password_confirm: text })}
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            onPress={this._onPressButton.bind(this)}
            title="Next"
            color='#fff'
          />
        </View>
        <Text style={{padding: 10, fontSize: 22}}>
          {this.state.userinfo}
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
  textInput: {
    borderBottomColor: '#607D8B',
    borderBottomWidth: 2
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 30,
    flexDirection: 'row',
    backgroundColor: '#607D8B',
    justifyContent: 'center'
  }
})
