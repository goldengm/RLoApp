import React from 'react';
import { View, Text, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import { BgWrapper } from 'components';
import { UPLOAD_URL } from 'config';

class AttendeeDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Attendee Detail'
  }

  render() {
    const { attendee } = this.props;

    return (
      <BgWrapper>
        <ScrollView 
          style={{
            marginVertical: 20, marginHorizontal: 20
          }}
        >
          {this.renderPhoto()}
          <View style={{ marginVertical: 10 }}></View>
          {this.renderField('First Name', attendee.first_name, true)}
          {this.renderField('Last Name', attendee.last_name, true)}
          {this.renderField('Primary Email', attendee.primary_email, true)}
          {this.renderField('Secondary Email', attendee.secondary_email)}
          {this.renderField('Department', attendee.department)}
          {this.renderField('Manager Name', attendee.manager_name)}
          {this.renderField('Office Location', attendee.office_location)}
          {this.renderField('Primary Number', attendee.primary_number)}
          {this.renderField('Cell Number', attendee.cell_number)}
          {this.renderField('Emergency Contact Name', attendee.emergency_contract_name)}
          {this.renderField('Emergency Contact Phone', attendee.emergency_contract_phone)}
        </ScrollView>
      </BgWrapper>
    )
  }

  renderPhoto() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginVertical: 10
        }}
      >
        <Image
          source={{uri: UPLOAD_URL+this.props.attendee.image}}
          style={{
            width: 80, height: 80,
            borderRadius: 40
          }}
        />
      </View>
    )
  }

  renderField(label, value, isRequired=false) {
    return (
      <View style={{ borderBottomColor: '#aaa', borderBottomWidth: 1, marginVertical: 5 }}>
        <View style={{ flexDirection: 'row', padding: 5 }}>
          <Text style={{ color: '#ccc' }}>{label}</Text>
          {isRequired &&
          <Text style={{ color: '#f22020' }}>*</Text>
          }
        </View>
        <View style={{ padding: 5 }}>
          <Text style={{ color: '#fff' }}>{value}</Text>
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    attendee: state.attendees[state.selectedAttendeeIndex],    
  })
)(AttendeeDetailScreen);
