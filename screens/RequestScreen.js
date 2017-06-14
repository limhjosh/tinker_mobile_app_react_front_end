import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  COLOR_BEIGE,
  COLOR_BLUE,
  COLOR_BACKGROUND
} from '../components/styles/common'
import { GlobalState } from '../global.js'
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      photoImage: '',
      comments:[],
    };
    fetch(`http://localhost:3000/users/${GlobalState.cache.user_id}/requests/1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token,
      }
    })
    .then((response) => {console.log(response);return response.json()})
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({ description: responseJson.request.description, photoImage: responseJson.request.request_photos[0].image, comments: responseJson.request.comments })
    })
    .done()
  }
   render() {
     return (
       <View style={styles.container}>
         <View style={styles.logoContainer}>
           <Image
             source={require(this.state.photoImage)}
             style={styles.logoImage}
           />
         </View>
        <View style={styles.userinfo}>
          <View style={[styles.userContainer,styles.usernameContainer]}>
            <Text style={styles.usernameText}>
              {this.state.username}
            </Text>
          </View>
          <View style={[styles.userContainer,styles.emailContainer]}>
            <Text style={styles.emailText}>
              {this.state.description}
            </Text>
          </View>
        </View>
        <View>
          {
            this.state.comments.map((comment) => {
              return (<Text>{comment.body}</Text>)
            });
          }
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
  }
})
