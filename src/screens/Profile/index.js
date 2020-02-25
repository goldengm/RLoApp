import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { BgWrapper } from 'components';
import { connect } from 'react-redux';
import { UPLOAD_URL } from 'config';

class ProfileScreen extends React.Component {
  render() {
    return (
      <BgWrapper>
        <ScrollView 
          style={{
            marginVertical: 20, marginHorizontal: 20
          }}
        >
          {this.renderPhoto()}
          <View style={{ marginVertical: 10 }}></View>
          {this.renderField('First Name', this.props.profileData.first_name, true)}
          {this.renderField('Last Name', this.props.profileData.last_name, true)}
          {this.renderField('Primary Email', this.props.profileData.primary_email, true)}
          {this.renderField('Secondary Email', this.props.profileData.secondary_email)}
          {this.renderField('Department', this.props.profileData.department)}
          {this.renderField('Manager Name', this.props.profileData.manager_name)}
          {this.renderField('Office Location', this.props.profileData.office_location)}
          {this.renderField('Primary Number', this.props.profileData.primary_number)}
          {this.renderField('Cell Number', this.props.profileData.cell_number)}
          {this.renderField('Emergency Contact Name', this.props.profileData.emergency_contract_name)}
          {this.renderField('Emergency Contact Phone', this.props.profileData.emergency_contract_phone)}
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
          source={{uri: UPLOAD_URL+this.props.profileData.image}}
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
    profileData: state.profileData
  })
) (ProfileScreen)
