import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { BgWrapper } from 'components';
import axios from 'axios';
import { BASE_URL, UPLOAD_URL } from 'config';
import { connect } from 'react-redux';
import actionType from 'store/actionType';

class AttendeesScreen extends React.Component {
  static navigationOptions = {
    title: 'Attendees'
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: BASE_URL+'attendees',
      params: { venue_id: this.props.profileData.venue_id}
    }).then((res) => {
      res = res.data
      this.props.setAttendees(res.data);
    }, (err) => {})
  }

  render() {
    return (
      <BgWrapper>
        <ScrollView 
          style={{ marginBottom: 60 }}
        >
          {this.props.attendees.map((attendee, index) => (
            this.renderItem(attendee, index)
          ))}
        </ScrollView>
      </BgWrapper>
    )
  }

  renderItem(attendee, index) {
    return (
      <TouchableOpacity onPress={() => this.goDetail(index)}>
        <View 
          style={{
            paddingVertical: 10, paddingHorizontal: 20,
            flexDirection: 'row',
            borderBottomColor: '#ccc', borderBottomWidth: 1
          }}
        >
          <View>
            <Image source={{ uri: UPLOAD_URL+attendee.image }} 
              style={{
                width: 80, height: 80,
                borderRadius: 40
              }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{color: '#fff', fontSize: 18, marginVertical: 10}}>{attendee.first_name} {attendee.last_name}</Text>
            <Text style={{color: '#888', fontSize: 14, marginVertical: 10 }}>{attendee.primary_email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )    
  }

  goDetail = (index) => {
    this.props.setSelectedAttendeeIndex(index);
    this.props.navigation.navigate('AttendeeDetail');
  }
}

export default connect(
  state => ({
    profileData: state.profileData,
    attendees: state.attendees
  }),
  dispatch => ({
    setAttendees: (data) => dispatch({ type: actionType.SET_ATTENDEES, payload: {data} }),
    setSelectedAttendeeIndex: (index) => dispatch({ type:actionType.SET_SELECTED_ATTENDEE_INDEX, payload: {index} })
  })
)(AttendeesScreen);
