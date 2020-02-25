import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class EventDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Event Detail'
  }

  render() {
    const { event } = this.props;

    return (
      <View style={{ marginHorizontal: 20 }}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>{event.title}</Text>          
          <Text style={{ fontSize: 14, color: '#888', marginVertical: 10 }}>{event.date} {event.start_time} - {event.end_time}</Text>
          <Text style={{ fontSize: 14, color: '#888', marginVertical: 10 }}>{event.location}</Text>
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 5 }}>Description</Text>
          <Text style={{ fontSize: 14, color: '#888', marginVertical: 5 }}>{event.description}</Text>
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    event: state.events[state.selectedEventIndex],    
  })
)(EventDetailScreen);
