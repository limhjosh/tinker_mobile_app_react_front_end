import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
} from 'react-native';

import { GlobalState } from '../global.js'
export default class TempRequestScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      request: this.props.request
    }
    console.log(this.props.request)
  }

  render() {
    return (
      <View style={{marginTop: 100, width: 100, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
        <Text>
          {this.state.request.description}
        </Text>
        <Image
          style={{width: 100, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}
            source={{uri: "https://exponent-file-upload-example.s3.amazonaws.com/1497402666049.png"}}
          />
      </View>
      )
  }
}
