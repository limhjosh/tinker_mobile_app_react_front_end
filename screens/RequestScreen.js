import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  COLOR_BEIGE,
  COLOR_BLUE,
  COLOR_BACKGROUND
} from '../components/styles/common'
import { GlobalState } from '../global.js'
export default class RequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request,
      comments: []
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
        image: responseJson.request.request_photos[0].image,
      })
    })
    .done()
  }
   render() {
     return (
       <View style={styles.container}>

         <View style={styles.logoContainer}>
           <Image
             source={{uri:`http:${this.state.image}`}}
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

        <View>

          {
            this.state.comments.map((comment) => {
              return (<View key={comment.id} style={[styles.userContainer,styles.commentContainer]}><Text>{comment.user.username}: {comment.body}</Text></View>)
            })

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
    marginTop: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoImage: {
    borderRadius: 80,
    width: 400,
    height: 200,
    resizeMode: 'contain',
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
  commentContainer: {
    backgroundColor: COLOR_BLUE,
    width: 300,
    // marginBottom: ,
    alignItems: 'center',
  },
  userinfo: {
    top: '1%',
  }
})
