import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import images from 'assets/images';

export default class BgWrapper extends React.Component {
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
      <>
        <Image source={images['bg']} 
          style={{
            width: fullWidth, height: fullHeight, resizeMode: 'cover',
            position: 'absolute', zIndex: 5
          }}/>
        <View 
          style={{
            position: 'absolute', zIndex: 10,
            width: fullWidth, height: fullHeight
          }}
        >
          {this.props.children}
        </View>
      </>
    )
  }
}
