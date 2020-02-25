import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Dimensions } from 'react-native';
import { BgWrapper } from 'components';
import images from 'images';
import { w, h, m, notifyMessage, isPortrait } from 'common/helpers';
import { connect } from 'react-redux';
import actionType from 'store/actionType';
import axios from 'axios';
import { BASE_URL } from 'config';

class LoginScreen extends React.Component {
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

    if (this.state.orientation==='portrait') {

      return (
        <BgWrapper>
          <View 
            style={{
              marginHorizontal: 30, 
              justifyContent: 'center',
              height: fullHeight,
            }}
          >
            <LogoImage/>
            <LoginForm tryLogin={(email, password) => this.tryLogin(email, password)}/>          
          </View>
        </BgWrapper>
      )
    } else {

      return (
        <BgWrapper>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View 
              style={{
                width: fullWidth/2 - 20, marginLeft: 20, height: fullHeight, alignItems: 'center', justifyContent: 'center'
              }}
            >
              <LogoImage/>
            </View>
            <View 
              style={{
                width: fullWidth/2 - 20, marginRight: 20, height: fullHeight, alignItems: 'center', justifyContent: 'center'
              }}
            >
              <LoginForm 
                goSignup={() => console.log('asd')}
                tryLogin={(email, password) => this.tryLogin(email, password)}  
              /> 
            </View>
          </View>
        </BgWrapper>
      )
    }		
  }
  
  goSignup = (email) => {
    console.log('asd'); console.log(email);
    // this.props.navigation.navigate('Signup');
  }

  tryLogin = (email, password) => {
    if (email == '') {
      notifyMessage('Email can\'t be empty');
      return;
    }
    if (password == '') {
      notifyMessage('Password can\'t be empty');
      return;
    }
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const { navigate } = this.props.navigation;

    axios({
      method: 'post',
      url: BASE_URL+'login', 
      data: formData
    }).then((res) => {
      res = res.data;      
      if (res.status==1) {
        this.props.onLoginSuccess(res.data);
        navigate('Home', {transition: 'fade'});
      } else {
        notifyMessage('Verify failed');
      }
    }, (err) => {
      notifyMessage('Verify failed');
    })    
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

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <View style={{ width: '100%' }}>
        <TextInput
          style={styles.formInput}
          autoCapitalize = 'none'
          placeholder='Email'
          value={this.state.email}
          onChangeText={email => this.setState({...this.state, email})}
        />
        <TextInput
          style={styles.formInput}
          autoCapitalize = 'none'
          placeholder='Password'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({...this.state, password})}
        />
        <TouchableOpacity
          style={{
            borderRadius: 28,
            width: '100%', height: 56,
            backgroundColor: 'white',
            marginTop: 30
          }}
          onPress={() => this.props.tryLogin(this.state.email, this.state.password)}
        >
          <Text
            style={{
              color: '#1756CD',
              textAlign: 'center',
              fontSize: 20, lineHeight: 56              
            }}
          >
            SIGN IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 28,
            width: '90%', height: 42,
            backgroundColor: '#1756CD',
            marginTop: 15, marginLeft: '5%',
            alignItems: 'center',
          }}
          onPress={() => {console.log('22'); this.props.goSignup()} }
        >
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18, lineHeight: 42 
            }}
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
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
) (LoginScreen)

const styles = StyleSheet.create({	
  formInput: {
    height: 40, 
    borderColor: 'transparent', borderBottomColor: 'white', borderBottomWidth: 1,
    marginVertical: 10, paddingVertical: 5,
    color: 'white',
    fontSize: 18
  }
})
