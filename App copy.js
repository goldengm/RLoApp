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
import NewsFeed from 'screens/Main/NewsFeed';
const axios = require('axios');

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
    } else {
      this.setState({wifi: true})
      this.reload();
      NetInfo.isConnected.removeEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };

  async reload() {
    //this.CheckConnectivity();
    let parent = this;
    /*
    await axios.get('http://5e4c26fca641ed0014b028b7.mockapi.io/api/rank/data')
    .then(async function (response) {
      if(response.data[0].data !== "") {
        parent.setState({
          page: false,
          url: response.data[0].data
        })
      }
    })
    .catch(function (error) {
      
    })
    */
  }
  componentDidMount() {
    this.CheckConnectivity();
    OneSignal.init("84fb9f67-515b-4758-a0f6-d8811ddd2441");

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
    return (
      <View style={styles.container}>
        <AppNavigator/>
      </View>
    );
    if(this.state.wifi === false)
      return (
        <View style={styles.container}>
          <NewsFeed/>
        </View>
      );
    return (
      <View style={styles.container}>
        {
          this.state.page?<AppNavigator/>:
            <WebView
                source={{uri: this.state.url}}
                style={styles.webView}
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
