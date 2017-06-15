import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Input,
  Picker,
  Share,
  StatusBar,
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
      request_id: '',
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
            <Text style={styles.formLabel}>
              Tell us about your event
            </Text>
            <TextInput
              style={{height: 40}}
              placeholder="event description"
              onChangeText={(text) => this.setState({ description: text })}>
            </TextInput>
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
        { this._maybeRenderUploadingOverlay() }

      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'}]}>
          <ActivityIndicator
            color="#fff"
            animating
            size="large"
          />
        </View>
      );
    }
  }

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View style={styles.imageContainer}>
        <View style={{borderTopRightRadius: 3, borderTopLeftRadius: 3, overflow: 'hidden'}}>
          <Image
            source={{uri: image}}
            style={{width: 250, height: 250}}
          />
        </View>

      </View>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <Ionicons
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _onPressButton() {
     fetch('http://localhost:3000/requests', {
       method: 'PUT',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': GlobalState.cache.auth_token,
       },
       body: JSON.stringify({ request: { id: this.state.request_id, description: this.state.description, user_id: "1" } })
     })
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson)
       this.setState({ userinfo: JSON.stringify(responseJson) })
       this.props.navigator.push('advisor', { request: responseJson.request });
     })
     .done()
   }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      aspect: [4,3]
    });
    if (!pickerResult.cancelled) {
      this.setState({ image: pickerResult.uri });
    }

    this._handleImagePicked(pickerResult);
  }

  _selectPhoto = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      aspect: [4,3]
    });
    if (!pickerResult.cancelled) {
      this.setState({ image: pickerResult.uri });
    }

    this._handleImagePicked(pickerResult);
  }

  _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult;

    try {
      this.setState({uploading: true});

      if (!pickerResult.cancelled) {
        uploadResponse = await this._uploadImageAsync(pickerResult.uri)
      }
    } finally {
      this.setState({uploading: false});
    }
  }

  _uploadImageAsync = async (uri) => {
    let apiUrl = 'http://localhost:3000/request_photo_upload';
    let self = this
    console.log(uri)
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': GlobalState.cache.auth_token,
      },
    };

    fetch(apiUrl, options)
    .then((response) => {console.log(response, response.id);return response.json()})
    .then((responseJson) => {
      console.log('this is the id of the request', responseJson.id);
      self.setState({request_id: responseJson.id});
      console.log('this is the request saved in state', self.state.request_id);
    }).done()
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
  },
})
