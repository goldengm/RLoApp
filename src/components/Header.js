import React, { Component } from 'React';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import images from 'images';
import { w, h, m } from 'common/helpers';

export default class Header extends Component {

  render() {
    const { 
      showBackArrow = false 
    } = this.props;

    return (
      <View style={[styles.container, { paddingLeft: showBackArrow ? w(12.5) : w(25.5) }]}>
        <TouchableOpacity onPress={() => this.props.onPressBack()}>
          <Image 
            source={images['back_arrow']}
            style={[styles.backArrow, { display: showBackArrow ? 'flex' : 'none' }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{flexDirection: 'row'}}>
          <Image 
            source={images['logo']}
            style={{ width: w(22), height: h(20)}}
          />
          <Text style={styles.title}>
            2019-20 Stats
          </Text>          
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {}}>
          {/*
          <Image 
            source={images['menu']}
            style={styles.menu}
          />
          */}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#195493',
    paddingTop: h(27),
    paddingBottom: h(8),
    paddingHorizontal: w(12.5)
  },
  title: {
    fontSize: m(18.83),
    textTransform: 'uppercase',
    paddingLeft: w(12.5),
    color: "white"
  },
  backArrow: {
    width: m(12),
    height: m(20.5),
  },
  menu: {
    width: m(20.5),
    height: m(20.5)
  }
});