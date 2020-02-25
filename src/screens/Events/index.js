import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from 'config';
import images from 'assets/images';
import { connect } from 'react-redux';
import actionType from 'store/actionType';

class EventsScreen extends React.Component {
  static navigationOptions = {
    title: 'Events'
  }

  componentDidMount() {
    var formData = new FormData();
    formData.append('venue_id', this.props.profileData.venue_id)
    axios({
      method: 'GET',
      url: BASE_URL+'agendas',
      params: {venue_id: this.props.profileData.venue_id}
    }).then((res) => {
      res = res.data
      this.props.setEvents(res)
    }, (err) => {
      console.log(err)

    })
  }
  
  render() {
    return (
      <ScrollView 
        style={{
          marginVertical: 30
        }}
      >
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <Image source={images['logo']}
            style={{
              width: 100, height: 100
            }}
          />
        </View>
        {this.props.events.map((event, index) => (
          this.renderItem(event, index)          
        ))}
      </ScrollView>
    )
  }

  renderItem(event, index) {
    return (
      <TouchableOpacity onPress={() => this.goDetail(index)} key={index}>
        <View style={{
          borderBottomColor: '#aaa', borderBottomWidth: 1, marginVertical: 10, marginHorizontal: 10
        }}>
          <View style={{marginVertical: 5}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{event.title}</Text>              
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={{fontSize: 16, color: '#888'}}>{event.date}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
            <Text style={{fontSize: 16, color: '#888'}}>{event.start_time} - {event.end_time}</Text>
            <Text style={{fontSize: 16, color: '#888'}}>{event.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  goDetail = (index) => {
    this.props.setSelectedEventIndex(index);
    this.props.navigation.navigate('EventDetail');
  }
}

export default connect(
  state => ({
    profileData: state.profileData,
    events: state.events
  }),
  dispatch => ({
    setEvents: (data) => dispatch({ type: actionType.SET_EVENTS, payload: {data} }),
    setSelectedEventIndex: (index) => dispatch({ type: actionType.SET_SELECTED_EVENT_INDEX, payload: {index} })
  })
)(EventsScreen);
