import React from 'react';
import { View, Text, WebView } from 'react-native';
import { BASE_URL } from 'config';

class AwardsScreen extends React.Component {
  static navigationOptions = {
    title: 'Awards'
  }
  render() {
    return (
      <WebView source={{ uri: BASE_URL+'service' }} style={{width: '100%', height: 500}} />  
    )
  }
}

export default AwardsScreen;
