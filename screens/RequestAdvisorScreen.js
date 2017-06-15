import React, { Component } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  COLOR_BEIGE,
  COLOR_BLUE,
  COLOR_BACKGROUND
} from '../components/styles/common'
import { GlobalState } from '../global.js'

export default class RequestAdvisor extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    console.log(this.props)
    this.state = {
      request: this.props.request,
      request_id: '',
      description: '',
      arrayOfUsers: [],
      arrayOfAdvisors: [],
    };
    fetch(`http://localhost:3000/requests/${this.state.request.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token,
      }
    })
    .then((response) => {console.log('this is the fetch response', response);return response.json()})
    .then((responseJson) => {
      this.setState({
        request: responseJson.request,
        request_id: responseJson.request.id,
        description: responseJson.request.description,
        // image: responseJson.request.request_photos[0].image,
        arrayOfUsers: responseJson.users,
      })
    })
    .done()
  }

   render() {
     console.log('this is the Advisors array', this.state.arrayOfAdvisors);
     return (
       <View style={styles.container}>

        <View style={{alignItems: 'center'}}>
          <Image
          style={{width: 200, height: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}
            source={{uri: "https://exponent-file-upload-example.s3.amazonaws.com/1497402666049.png"}}
          />
        </View>


        <View style={styles.viewContainer}>
          <Text style={styles.description}>
            {this.state.description}
          </Text>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.title}>
            Pick Advisors
          </Text>
        </View>

        <View>
          <ScrollView style={{height: 200}}>
            {this.state.arrayOfUsers.map(userInfo => {
              return (
                <TouchableHighlight
                  onPress={() => {
                    this.setState({arrayOfAdvisors: this.state.arrayOfAdvisors.concat([userInfo])});
                  }}
                  key={userInfo.id}
                  underlayColor="#ffff00"
                  style={[styles.loginLink, styles.link]}>
                    <Text key={userInfo.id}>{userInfo.username}</Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.title}>
            Requesting advice from:
          </Text>
        </View>

        <View>
          {this.state.arrayOfAdvisors.map(userInfo => {
            return (
              <Text key={userInfo.id}>{userInfo.username}</Text>
            )
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={this._submitButton.bind(this)}
            title="Send Request"
            color="#000"
          />
        </View>

      </View>
    );
  }
  _submitButton = () => {
    fetch('http://localhost:3000/requests', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token,
      },
      body: JSON.stringify({ request: { id: this.state.request.id, advisors: this.state.arrayOfAdvisors } })
    })
    .then()
    this.props.navigator.push('profile');
  };
}

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    margin: 5,
    width: '100%'
  },
  title: {
    padding: 10,
    fontSize: 22,
    marginBottom: 15,
    backgroundColor: COLOR_BEIGE,
    width: '100%',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
  link: {
    padding: 10,
    paddingVertical: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BLUE,
    marginTop: 2,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: COLOR_BLUE,
    justifyContent: 'center',
    width: '100%',
  },
})
