import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Dimensions } from 'react-native';
import { BgWrapper } from 'components';
import images from 'images';
import { w, h, m, notifyMessage, isPortrait } from 'common/helpers';
import { connect } from 'react-redux';
import actionType from 'store/actionType';
import axios from 'axios';
import { BASE_URL } from 'config';

class LoginSplash extends React.Component {
	state = {
    orientation: 'portrait'
  }
  
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    }
  }

  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  componentDidMount() {

    this.setState({
      ...this.state,
      orientation: this.isPortrait() ? 'portrait' : 'landscape'
    });

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        ...this.state,
        orientation: this.isPortrait() ? 'portrait' : 'landscape'
      });
    });    
  }

	render() {
    var dim = Dimensions.get('window');
    let fullWidth = dim.width, fullHeight = dim.height;

    return (
      <View 
        style={{
          marginHorizontal: 30, 
          justifyContent: 'center',
          height: fullHeight,
        }}
      >
        <LogoImage/>
      </View>
    )
  }
  
}

function LogoImage() {
  return (
    <View 
      style={{width: '100%', alignItems: 'center'}}
    >
      <Image source={images['logo']}
        style={{
          width: 192, height: 192
        }}
      />
    </View>
  )
}

export default LoginSplash

const styles = StyleSheet.create({	
  formInput: {
    height: 40, 
    borderColor: 'transparent', borderBottomColor: 'white', borderBottomWidth: 1,
    marginVertical: 10, paddingVertical: 5,
    color: 'white',
    fontSize: 18
  }
})
