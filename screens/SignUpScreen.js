import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class SignUpScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'exp.json',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Text>
          Login idiot!
        </Text>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
