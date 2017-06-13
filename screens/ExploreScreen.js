import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import { COLOR_BEIGE, COLOR_BLUE, COLOR_BACKGROUND } from '../components/styles/common'

export default class Explore extends Component {

   render() {
     return (
       <View style={styles.container}>

        <Text style={{padding: 10, fontSize: 22, margin: 15}}>
          Find new stylists
        </Text>
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
