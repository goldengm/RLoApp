import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { BgWrapper } from 'components';
import { connect } from 'react-redux';
import actionType from 'store/actionType';
import images from 'assets/images';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerLeft: (
        <TouchableOpacity onPress={navigation.getParam('logout')}>
          <Text 
            style={{
              color: 'white', fontWeight: 'bold',
              marginLeft: 20
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('goProfile')}>
          <Image 
            source={images['btnProfile']}
            style={{
              width: 24, height: 24,
              marginRight: 20
            }}
          />
        </TouchableOpacity>
      )
    }    
  }

  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  componentDidMount() {
    console.log('init index')
    this.props.navigation.setParams({ logout: this.logout, goProfile: this.goProfile });

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
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      const { navigate } = this.props.navigation;
      navigate('Login');
    }

    console.log('render indx')
    var dim = Dimensions.get('window');
    let fullWidth = dim.width, fullHeight = dim.height;

    return (
      <BgWrapper>
        <ScrollView 
          style={{
            marginHorizontal: 20,
            marginBottom: this.isPortrait()?100:40
          }}
          scrollEnabled={true}
        >
          {this.renderGoButton('Events', 'Events')}
          {this.renderGoButton('Attendees', 'Attendees')}
          {this.renderGoButton('FAQs', 'FAQs')}
          {this.renderGoButton('Notifications', 'Notifications')}
          {this.renderGoButton('Social Walls', 'SocialWalls')}
        </ScrollView>
      </BgWrapper>
    )
  }

  logout = () => {
    this.props.navigation.navigate('Login');
    this.props.logout();
  }

  goProfile = () => {
    this.props.navigation.navigate('Profile');
  }

  renderGoButton(title, path) {
    return (
      <TouchableOpacity style=
        {{
          padding: 20,
          backgroundColor: '#1756CD',
          borderRadius: 20,
          flexDirection: 'row',
          marginVertical: 10
        }}
        onPress={() => this.goPath(path)}
      >
        <Image source={images['logo']} style={{width: 80, height: 80}} />
        <Text style={{ color: '#fff', fontSize: 30, lineHeight: 80, marginLeft: 30 }}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }

  goPath = (path) => {
    this.props.navigation.navigate(path);
  }

}

export default connect(
  state => ({
    isLoggedIn: state.isLoggedIn
  }),
  dispatch => ({
    logout: () =>
      dispatch({ type: actionType.AUTH_LOGOUT })
  })
)(HomeScreen)
