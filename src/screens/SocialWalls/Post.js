import React from 'react'
import { Platform, View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { BgWrapper } from 'components'
import ImagePicker from 'react-native-image-picker'
import images from 'assets/images'
import { fullWidth, notifyMessage } from 'common/helpers'
import axios from 'axios'
import { BASE_URL } from 'config'

class SocialWallPost extends React.Component {
  static navigationOptions = {
    title: 'Social Wall Post'
  }

  state = {
    pictureUri: null,
    isPictureSelected: false,
    title: '',
    isPosting: false
  }

  render() {
    const { pictureData, isPictureSelected, title } = this.state
    const { isPosting } = this.state

    if (isPosting) {
      return (
        <BgWrapper>
          <View style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='#fff'/>
          </View>          
        </BgWrapper>        
      )
    }

    return (
      <BgWrapper>
        <ScrollView style={{ marginBottom: 40 }}>
          <TouchableOpacity onPress={this.handleCameraPicker}>
            <View 
              style={{
                marginTop: 20, marginHorizontal: 10, 
                flexDirection: 'row'
              }}
            >   
              <Text style={{ fontSize: 18, color: '#fff', lineHeight: 30 }}>Select Image</Text>       
              <Image source={images['btnCamera']} 
                style={{ 
                  width: 30, height: 30, marginLeft: 20,
                  tintColor: '#fff'
                }} 
              />            
            </View>
          </TouchableOpacity>          
          
          {isPictureSelected && (
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
              <Image source={{ uri: 'data:image/jpeg;base64,'+pictureData }}
                style={{ width: fullWidth - 20, height: (fullWidth - 20)*0.8 }} />
            </View>
          )}

          <View 
            style={{
              marginTop: 20, marginHorizontal: 10, 
              flexDirection: 'row'
            }}
          >
            <Text style={{ fontSize: 18, color: '#fff', lineHeight: 30 }}>Input Title</Text>
          </View>

          <View 
            style={{ 
              marginTop: 10, marginHorizontal: 10,
              padding: 10,
              borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >          
            <TextInput
              style={{
                fontSize: 14, color: '#fff',
                width: fullWidth-120
              }}
              value={title}
              onChangeText={title => this.setState({ ...this.state, title })}
            />
          </View>

          <View 
            style={{ 
              marginTop: 20, marginHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <TouchableOpacity onPress={this.submit}
              style={{ 
                padding: 10,
                borderRadius: 5,
                flexDirection: 'row',
                width: 90,
                backgroundColor: '#fff'
              }}
            >                            
              <Image source={images['btnSend']} style={{width: 24, height: 24}} />
              <Text style={{ fontSize: 14, color: '#195493', lineHeight: 24 }}>Send</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        
        
      </BgWrapper>
    )    
  }

  handleCameraPicker = () => {
    /*
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ picture: response })
      }
    })
    */


    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (res) => {

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        this.setState({
          ...this.state,
          pictureUri: Platform.OS === "android" ? res.uri : res.uri.replace("file://", ""), 
          pictureData: res.data,
          isPictureSelected: true
        });
      }
    });
  }

  submit = () => {
    const { pictureUri, pictureData, title } = this.state
    if (title == '') {
      notifyMessage('Title can\'t be empty')
      return
    }
    if (pictureUri == null) {
      notifyMessage('Select picture.')
      return
    }
    this.setState({...this.state, isPosting: true });
    formData = new FormData();
    formData.append('image', {
      name: 'file.png',
      type: 'image/png',
      uri: pictureUri
    })
    formData.append('text', this.state.title)
    formData.append('attendee_id', this.props.profileData.id)
    axios({
      method: 'post',
      url: BASE_URL+'socials',
      data: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res.data)
      this.setState({...this.state, isPosting: false });
      this.props.navigation.navigate('SocialWalls');
    }, (err) => {
      console.log(err)
      this.setState({...this.state, isPosting: false });
      this.props.navigation.navigate('SocialWalls');
    })
    /*
    if let uploadImage = image, let imageData = uploadImage.pngData() {
                multipartFormData.append(imageData, withName: "image", fileName: "file.png", mimeType: "image/png")
            }
    */
  }
}

export default connect(
  state => ({
    profileData: state.profileData
  })
) (SocialWallPost)
