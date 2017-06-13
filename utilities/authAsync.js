// import React, { Component } from 'react';
//
var STORAGE_KEY = 'id_token';

// var Person = struct({
//     username: t.String,
//     password: t.String
// });

// constructor(props) {
//   super(props);
//   this.state = {
//     username: '',
//     password: '',
//     userinfo: '',
//   };
// }

// const options = {};
//
//
// var AuthAsync = React.createClass({
//   async _onLogin(item, selectedValue) {
//     try {
//       await AsyncStorage.setItem(item, selectedValue);
//     } catch (error) {
//       console.log('AsyncStorage error: ' + error.message);
//     }
//   },
// })


// async _getProtectedQuote() {
//   var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
//   fetch("http://localhost:3001/api/protected/random-quote", {
//     method: "GET",
//     headers: {
//       'Authorization': 'Bearer ' + DEMO_TOKEN
//     }
//   })
//   .then((response) => response.text())
//   .then((quote) => {
//     AlertIOS.alert(
//     "Chuck Norris Quote:", quote)
//   })
//   .done();
// },
