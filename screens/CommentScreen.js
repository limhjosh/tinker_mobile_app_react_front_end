import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Form from 'react-native-form';
import {
  COLOR_BEIGE,
  COLOR_BLUE,
  COLOR_BACKGROUND
} from '../components/styles/common'
import { GlobalState } from '../global.js'
export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request,
      comments: [],
    };
    let request = this.state.request
    fetch(`http://localhost:3000/users/${request.user_id}/requests/${request.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token,
      }
    })
    .then((response) => {console.log(response);return response.json()})
    .then((responseJson) => {
      console.log(responseJson.request.comments)
      this.setState({comments: responseJson.request.comments,
      })
    })
    .done()
  }
   render() {
    var self = this
     return (
       <View style={styles.container}>
         <View style={styles.logoContainer}>
           <Image
             source={{uri: "https://exponent-file-upload-example.s3.amazonaws.com/1497402666049.png"}}
             style={styles.logoImage}
           />
         </View>
        <View style={styles.userinfo}>
          <View style={[styles.userContainer,styles.usernameContainer]}>
            <Text style={styles.usernameText}>
              {this.state.request.user.username}
            </Text>
          </View>
          <View style={[styles.userContainer,styles.emailContainer]}>
            <Text style={styles.emailText}>
              {this.state.request.description}
            </Text>
          </View>
        </View>
        <Form ref="form" style={styles.form}>
          <View style={styles.form}>
            <View style={{width: '100%'}}>
              <TextInput
                style={{height: 80, margin: 10, fontSize: 16}}
                placeholder={"Type your thoughts"}
                multiline={true}
                onChangeText={(text) => this.setState({ body: text })}>
              </TextInput>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {self._submitButton(this.state.request)} }
              title="Post Advice"
              color='#fff'
              style={styles.buttonText}
            />
          </View>
        </Form>
      </View>
    );
  }
  _submitButton() {
     fetch(`http://localhost:3000/users/${this.state.request.user_id}/requests/${this.state.request.id}/comments`, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': GlobalState.cache.auth_token,
       },
       body: JSON.stringify({ comment: { body: this.state.body, user_id: GlobalState.cache.user_id, request_id: this.state.request.id} })
     })
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson)
       this.setState({ userinfo: JSON.stringify(responseJson) })
     })
     .done()
     this.props.navigator.push("request", { request: this.state.request })
   }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: COLOR_BACKGROUND,
   alignItems: 'center',
  },
  nameText: {
    padding: 10,
    fontSize: 20,
  },
  emailText: {
    fontSize: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoImage: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  userContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  usernameContainer: {
    backgroundColor: COLOR_BLUE,
    width: 300,
    // marginBottom: 500,
    position: 'absolute',
    top: -300,
    alignItems: 'center',
  },
  usernameText: {
    top: 1,
    alignItems: 'flex-start',
    fontSize: 30,
  },
  emailContainer: {
    backgroundColor: COLOR_BEIGE,
    width: 300,
    // marginBottom: ,
    alignItems: 'center',
  },
  userinfo: {
    top: '1%',
  },
    form: {
    margin: 10,
    width: '100%',
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    backgroundColor: COLOR_BLUE,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  }
})
