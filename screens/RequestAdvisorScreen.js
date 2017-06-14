import React, { Component } from 'react';
import {
  Alert,
  Button,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLOR_BEIGE, COLOR_BLUE, COLOR_BACKGROUND } from '../components/styles/common'
import { GlobalState } from '../global.js'

export default class RequestAdvisor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request_id: '',
      arrayOfUsers: [],
    };
    fetch(`http://localhost:3000/users/1/requests/1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token,
      }
    })
    .then((response) => {console.log(response);return response.json()})
    .then((responseJson) => {
      this.setState({
        description: responseJson.request.description,
        image: responseJson.request.request_photos[0].image
      })
      this.setState({ arrayOfUsers: responseJson.users})
    })
    .done()
  }

   render() {
     return (
       <View style={styles.container}>

        <Text style={{padding: 10, fontSize: 22, margin: 15}}>
          Pick Advisors:
        </Text>

        <View style={[styles.userContainer,styles.usernameContainer]}>
          <Text style={styles.usernameText}>
            {this.state.description}
          </Text>

          <Image
          style={{width: 50, height: 50}}
            source={{uri: "https://exponent-file-upload-example.s3.amazonaws.com/1497402666049.png"}}
          />

          <View>
            {this.state.arrayOfUsers.map(userInfo => {
              return (
                <Text key={userInfo.id}>{userInfo.username}</Text>
              );
            })}
          </View>

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
})
