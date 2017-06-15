import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { COLOR_BEIGE, COLOR_BLUE, COLOR_BACKGROUND } from '../components/styles/common'
import { GlobalState } from '../global.js'

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfUsers: [],
    };
    // fetch('http://localhost:3000/users', {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': GlobalState.cache.auth_token,
    //   }
    // })
    // .then((response) => {console.log(response); return response.json()})
    // .then((responseJson) => {
    //   console.log(responseJson)
    // })
  }


calculatedSize() {
  var IMAGES_PER_ROW = 3;
  var size = windowWidth / IMAGES_PER_ROW
  return {width: size, height: size}
}

   render() {
     return (
       <View style={styles.container}>


        <ScrollView>

        <Text style={{marginTop: 40, fontSize: 22, margin: 15, textAlign:'center'}}>
          Discover
          </Text>
          <Text style={{fontSize: 22, margin: 15}}>
          {this.renderRow()}

        </Text>
        </ScrollView>
      </View>
    );
  }

  renderRow() {
    var images = ["https://s-media-cache-ak0.pinimg.com/736x/c2/7c/2f/c27c2fa0f03048f317c46e50e4dee067.jpg","http://www.fashionmotive.com/wp-content/uploads/2016/10/1-Casual-Rugged-Fashion-For-Men.jpg","http://www.fashionmotive.com/wp-content/uploads/2016/10/11-Hip-Hop-Hipster-Fashion-For-Men.jpg","https://psupopculture.files.wordpress.com/2011/11/l_2f85c19832397473c26188b0d07e3c00.jpg","https://s-media-cache-ak0.pinimg.com/736x/b3/0e/6b/b30e6bb3e361b2109658b7bafc7027cc.jpg","https://s-media-cache-ak0.pinimg.com/736x/16/8d/e0/168de00ec089c3c9756d5ffe226a6fad.jpg","https://pbs.twimg.com/profile_images/723350422828634112/_CiESZBh.jpg", "https://s-media-cache-ak0.pinimg.com/736x/b3/2d/bd/b32dbd18c32610a2ba82d2f361df362d.jpg", "https://s-media-cache-ak0.pinimg.com/736x/38/7a/84/387a84c442ef2dcefa024e6b0b5a326e.jpg", "http://distinctionhr.com/wp-content/uploads/2014/11/MensFashion_9.jpg","http://www.slate.com/content/dam/slate/blogs/browbeat/2016/02/18/how_zoolander_2_reflects_the_real_fashion_industry/mugatuedit.jpg.CROP.promo-xlarge2.jpg","https://s-media-cache-ak0.pinimg.com/736x/64/40/c6/6440c6d3cdd51e0e19c5747a1a8cbbf9.jpg","https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/02/09/Zoolander-2.jpg","http://travelfashiongirl.com/wp-content/uploads/2012/08/ABOUT.jpg","https://s-media-cache-ak0.pinimg.com/736x/ab/ea/8d/abea8db45f305cf9c9ebfe4ce41e9b20.jpg","https://s-media-cache-ak0.pinimg.com/736x/5e/ac/66/5eac666852642e9991f2c1d8a1470841.jpg","https://s-media-cache-ak0.pinimg.com/736x/33/b1/61/33b16151c00a558142f86f03744e5551.jpg","https://s-media-cache-ak0.pinimg.com/736x/e1/1b/7b/e11b7b3acb3ed5f4fa9fc63764c4eb5c.jpg", "https://ladycodeblog.files.wordpress.com/2014/07/travel-fashion-5.jpg", "https://s-media-cache-ak0.pinimg.com/736x/70/17/7b/70177b9caf30b71e2ed735fd48c3c97d.jpg","http://www.instaloverz.com/wp-content/uploads/2016/07/7-rugged-mens-fashion.jpg","https://s-media-cache-ak0.pinimg.com/736x/aa/2b/87/aa2b87bf4d399fa17c48a9ffaac1de03.jpg", "http://www.oystermag.com/sites/default/files/imagecache/slider-gallery-980x650/images/23_7.jpg","https://a248.e.akamai.net/secure.meetupstatic.com/photos/event/2/4/1/c/600_458349244.jpeg","http://www.fashionmotive.com/wp-content/uploads/2016/10/4-Stylish-Rugged-Fashion-For-Men.jpg","https://thefashiontag.files.wordpress.com/2013/08/edgy-rugged-boho-look-men.jpg","https://s-media-cache-ak0.pinimg.com/736x/20/80/00/2080000b74f3f029b099cc556190b343.jpg", "http://chicagofashionblogs.com/wp-content/uploads/2017/01/winter-weekend-getaway-the-rugged-canvas-duffle.jpg", "https://s-media-cache-ak0.pinimg.com/736x/5e/04/af/5e04afe26dda074d944830837d0d5bb5.jpg", "https://avatars2.githubusercontent.com/u/6255992?v=3&s=400","http://www.oystermag.com/sites/default/files/imagecache/slider-gallery-980x650/images/23_7.jpg","http://www.bruisedpassports.com/wordpress/wp-content/uploads/2014/01/Travel-Fashion-Tartan-trend-10.jpg","https://fashioncoolture.files.wordpress.com/2013/08/fashioncoolture-22-08-2013-moikana-sumer-dress-lace-outfit-1.jpg" ]
    return images.map((uri,i) =>{
      return(
        <Image key={i} style={{height: 128, width: 128}} source={{uri: uri}} />
      );
    })
  }
  renderImagesInGroupsOf(count) {
    return _.chunk(IMAGE_URLS, IMAGES_PER_ROW).map((imagesForRow,i) => {
      return (
        <View style={styles.row} key={i}>
          {this.renderRow(imagesForRow)}
        </View>
      )
    })
  }
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
  },
})
