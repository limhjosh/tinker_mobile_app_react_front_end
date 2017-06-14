import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Constants,
  ImagePicker,
  registerRootComponent,
} from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Form from 'react-native-form';
import {
  COLOR_BEIGE,
  COLOR_BLUE,
  COLOR_BACKGROUND
} from '../components/styles/common';
import { GlobalState } from '../global.js'

@registerRootComponent
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    }
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>

        <View style={[styles.selectPhoto, styles.photo]}>
          <Ionicons name="ios-image-outline" size={32} color="#fff" />

          <Button
            onPress={this._selectPhoto}
            color="#fff"
            title="Select photo"
          />
        </View>

        <View style={[styles.takePhoto, styles.photo]}>
          <Ionicons name="ios-aperture-outline" size={32} color="#fff" />

          <Button
            onPress={this._takePhoto}
            color="#fff"
            title="Take photo"
          />
        </View>

        <Form ref="form" style={styles.form}>
          <View style={styles.form}>
            <Text>
              Tell us about your event
            </Text>
            <View style={{width: '100%'}}>
              <TextInput
                style={{height: 80, margin: 10, fontSize: 16}}
                placeholder="event description"
                multiline={true}
                onChangeText={(text) => this.setState({ description: text })}>
              </TextInput>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressButton.bind(this)}
              title="Next"
              color='#fff'
              style={styles.buttonText}
            />
          </View>
        </Form>

        { this._maybeRenderImage() }

      </View>
    );
  }

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }
    return (
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{uri: image}}
            style={{width: 250, height: 250}}
          />
        </View>
      </View>
    );
  }

  _onPressButton() {
     fetch(`http://localhost:3000/users/1/requests`, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': GlobalState.cache.auth_token,
       },
       body: JSON.stringify({ request: { description: this.state.description, user_id: "1" }, request_photo: {image: this.state.image} })
     })
     .catch((error) => {console.warn('this is your error message', error);})
     .then((response) => {console.log('test 0', response);response.json()})
     .then((responseJson) => {
       console.log('test 1')
       console.log(responseJson)
       this.setState({ userinfo: JSON.stringify(responseJson) })
     })
     .done()
     console.log('test 2')
     this.props.navigator.push('advisor')
   }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      aspect: [4,3]
    });
    if (!pickerResult.cancelled) {
      this.setState({ image: pickerResult.uri });
    }
  }

  _selectPhoto = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      aspect: [4,3]
    });
    if (!pickerResult.cancelled) {
      this.setState({ image: pickerResult.uri });
    }
    console.log('this is the pickerResult uri', pickerResult.uri )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
  photo: {
    padding: 10,
    paddingVertical: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectPhoto: {
    backgroundColor: COLOR_BEIGE,
  },
  takePhoto: {
    backgroundColor: COLOR_BLUE,
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
  },
  imageContainer: {
    marginTop: 10,
    width: 250,
    borderRadius: 3,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 5,
  },
  imageBorder: {
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    overflow: 'hidden',
  }
})
