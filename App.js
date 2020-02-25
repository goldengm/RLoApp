/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import AppNavigator from 'navigation';
import OneSignal from 'react-native-onesignal';
import { WebView, NetInfo } from 'react-native';
const axios = require('axios');
import reducer from 'store/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore(reducer);
import LoginSplash from 'screens/Login/Splash';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: true,
      url: "",
      wifi: false,
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  CheckConnectivity = () => {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  };
  handleFirstConnectivityChange = isConnected => {

    if (isConnected === false) {
      //Alert.alert("You are offline!");
      this.setState({wifi: false})
    } else {
      this.setState({wifi: true})
      this.reload();
      /*
      NetInfo.isConnected.removeEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
      */
    }
  };

  async reload() {
    // this.CheckConnectivity();
    let parent = this;

    await axios.get('http://townhall.magehire.com/get-initial-data')
    .then(async function (response) {
      if(response.data.data[0].data !== "") {
        parent.setState({
          page: false,
          url: response.data.data[0].data
        })
      }
    })
    .catch(function (error) {
      
    })
  }
  componentDidMount() {
    this.CheckConnectivity();
    OneSignal.init("31d82524-fa3d-4871-95eb-b5a59083a5a0");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  async componentDidUpdate() {

  }
  onIds(device) {
    console.log('Device info: ', device);
  }
  
  render() {
    
    /*
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <AppNavigator/>
        </Provider>        
      </View>
    );
    */

   if(this.state.wifi === false)
    return (
      <View style={styles.container}>
        <LoginSplash/>
      </View>
    );

    return (
      <View style={styles.container}>
        {
          this.state.page?
            <View style={styles.container}>
              <Provider store={store}>
                <AppNavigator/>
              </Provider>
            </View>
          :
            <WebView
              source={{uri: this.state.url}}
              style={{width: '100%', height: '100%'}}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 8,
    color: 'white'
  },
  webView: {
    width: '100%',
    height: '100%'
  },
});
