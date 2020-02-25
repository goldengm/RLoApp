import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { BgWrapper } from 'components';
import axios from 'axios';
import actionType from 'store/actionType';
import { BASE_URL, UPLOAD_URL } from 'config';
import { w, h } from 'common/helpers';
import images from 'assets/images';

class SocialWalls extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Social Walls',
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('goPost')} style={{marginRight: 20}}>
          <Text style={{ fontSize: 14, color: '#fff' }}>Add</Text>
        </TouchableOpacity>
      )
    }
  }
  
  componentDidMount() {
    this.props.navigation.setParams({ goPost: this.goPost });

    axios({
      method: 'GET',
      url: BASE_URL+'socials'
    }).then((res) => {
      console.log(res.data)
      res = res.data.data
      console.log(res)
      this.props.setSocialWalls(res)
    }, (err) => {
      console.log(err)
    })
  }

  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  render() {
    return (
      <BgWrapper>
        <ScrollView style={{ marginBottom: 60 }}>
          {this.props.socialWalls.map((socialWall, index) => (
            this.renderRowItem(socialWall, index)
          ))}
        </ScrollView>        
      </BgWrapper>
    )
  }

  renderRowItem(socialWall, index) {
    return (
      <View 
        style={{
          flexDirection: 'row', margin: w(10), padding: w(10),
          borderRadius: 5, borderWidth: 1, borderColor: '#ccc'
        }}
        key={index}
      >
        <View 
          style={{
            width: w(100), height: w(100)
          }}
        >
          <Image source={{uri: UPLOAD_URL+socialWall.image}} style={{
            width: '100%', height: '100%'
          }}/>
        </View>
        <View style={{ marginLeft: w(20),  width: this.isPortrait()?w(200):h(500) }}>
          <View style={{ height: 40 }}>
            <Text style={{ fontSize: 16, color: '#f2f4ff' }}>{socialWall.text}</Text>
          </View>
          <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginVertical: 5 }}>
            <Image source={{ uri: UPLOAD_URL+socialWall.attendee.image }}
              style={{ width: 30, height: 30, borderRadius: 15}} />
            <Text style={{ fontSize: 16, color: '#888', lineHeight: 30, marginLeft: 10 }}>
              {socialWall.attendee.first_name} {socialWall.attendee.last_name}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={images['comments']} style={{ width: 20, height: 20, tintColor: '#888', marginRight: 5 }} />
              <Text style={{ fontSize: 12, lineHeight: 20, color: '#888' }}>{socialWall.comments} comments</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12, lineHeight: 20, color: '#888' }}>{socialWall.likes} likes</Text>
              <Image source={images['socialLike']} style={{ width: 20, height: 20, tintColor: '#888', marginLeft: 5 }} />
            </View>
          </View>
        </View>
      </View>
    )
  }

  goPost = () => {
    this.props.navigation.navigate('SocialWallPost')
  }
}

export default connect(
  state => ({
    profileData: state.profileData,
    socialWalls: state.socialWalls
  }),
  dispatch => ({
    setSocialWalls: (data) => dispatch({ type: actionType.SET_SOCIAL_WALLS, payload: {data} })
  })
) (SocialWalls)
