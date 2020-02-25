import React from 'react';
import { View, Text, WebView } from 'react-native';
// import { WebView } from 'react-native-webview';
import { BASE_URL } from 'config';

class FAQsScreen extends React.Component {
  static navigationOptions = {
    title: 'FAQ'
  }
  render() {
    return (
      <WebView source={{ uri: BASE_URL+'faq' }} style={{width: '100%', height: 500}} />  
    )
  }
}

export default FAQsScreen;
