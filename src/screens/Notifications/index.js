import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from 'config';
import actionType from 'store/actionType';

class NotificationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Notifications'
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: BASE_URL+'notificatons',
      params: {venue_id: this.props.profileData.venue_id, attendee_id: this.props.profileData.id}
    }).then((res) => {
      res = res.data
      this.props.setNotifications(res)
    }, (err) => {
      console.log(err)

    })
  }

  render() {
    return (
      <ScrollView 
        style={{
          marginTop: 30, marginBottom: 60
        }}
      >
        {this.props.notifications.map((notification, index) => (
          this.renderItem(notification, index)
        ))}
      </ScrollView>
    )
  }

  renderItem(notification, index) {
    return (
      <View style={{
        borderBottomColor: '#aaa', borderBottomWidth: 1, 
        marginVertical: 10, marginHorizontal: 10,
        paddingLeft: 30
      }}>
        <Text style={{ fontSize: 16, lineHeight: 20, marginBottom: 10 }}>
          {notification.head}
        </Text>
        <Text style={{ color: '#888', marginBottom: 10 }}>
          {notification.updated_at}
        </Text>
      </View>
    )
  }
}

export default connect(
  state => ({
    profileData: state.profileData,
    notifications: state.notifications
  }),
  dispatch => ({
    setNotifications: (data) => dispatch({ type: actionType.SET_NOTIFICATIONS, payload: {data} }),
    setSelectedNotificationIndex: (index) => dispatch({ type: actionType.SET_SELECTED_NOTIFICATION_INDEX, payload: {index} })
  })
)(NotificationsScreen);
