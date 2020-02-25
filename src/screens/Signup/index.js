import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Dimensions } from 'react-native';
import { BgWrapper } from 'components';
import images from 'images';
import { w, h, m, notifyMessage, isPortrait } from 'common/helpers';
import actionType from 'store/actionType';
import axios from 'axios';
import { BASE_URL } from 'config';

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Signup'
  }

  render() {
    return (
      <View>
        <Text>Signup Screen</Text>
      </View>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    onLoginSuccess: (data) => 
      dispatch({ type: actionType.AUTH_LOGIN_SUCCESS, payload: {data} })
  })
) (SignupScreen)
