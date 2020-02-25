import React from 'React';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'

import {
  Login,
  Signup,
  Home,
  Profile,
  Events,
  EventDetail,
  Attendees,
  AttendeeDetail,
  FAQs,
  Notifications,
  Awards,
  SocialWalls,
  SocialWallPost
} from 'screens'

import { w, h, m } from 'common/helpers';
import { Image } from 'react-native';
import images from 'images';

const MainNavigation = createStackNavigator(
  {
    Login: { 
      screen: Login
    },
    Signup: {
      screen: Signup
    },
    Home: {
      screen: Home
    },
    Profile: {
      screen: Profile
    },
    Events: {
      screen: Events
    },
    EventDetail: {
      screen: EventDetail
    },
    Attendees: {
      screen: Attendees
    },
    AttendeeDetail: {
      screen: AttendeeDetail
    },
    FAQs: {
      screen: FAQs
    },
    Notifications: {
      screen: Notifications
    },
    SocialWalls: {
      screen: SocialWalls
    },
    SocialWallPost: {
      screen: SocialWallPost
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1756CD',
        color: '#fff'
      },
      headerTintColor: '#fff',
      headerTintStyle: {
        fontWeight: 'bold'
      },
      gesturesEnabled: false,
    },
    initialRouteName: 'Home',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    })
  }  
);

export default createAppContainer(MainNavigation);
