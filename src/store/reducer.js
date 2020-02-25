import actionType from './actionType'

const initialState = {
  isLoggedIn: false,
  profileData: {},
  events: [],
  selectedEventIndex: 0,
  attendees: [],
  selectedAttendeeIndex: 0,
  notifications: [],
  selectedNotificationIndex: 0,
  socialWalls: [],
  selectedSocialWallIndex: 0
};

/*
const initialState = {
  isLoggedIn: true,
  profileData: {
    "id": 31,
    "image": "uploads/avatar/attendee/JgqgfCWAdxm37ELH1572532796.png",
    "primary_email": "test@townhall.com",
    "secondary_email": "test@sec.com",
    "first_name": "App",
    "middle_name": "",
    "last_name": "Store",
    "department": "asd",
    "job": "",
    "manager_name": "asd123",
    "manager_title": "",
    "office_location": "asd123",
    "primary_number": "",
    "cell_number": "",
    "emergency_contract_name": "",
    "emergency_contract_phone": "",
    "air_travel_assistance": "Yes",
    "hotel_room": "Yes",
    "dietary_concerns": "",
    "password": "$2y$10$YuZ9SA7x4heivzDH61r1QuO5qd2whZfZDpR3SK1FmCyQgCwcqQimK",
    "venue_id": 4,
    "created_at": "2019-10-31 14:34:47",
    "updated_at": "2019-11-30 08:12:09"
  },
  events: [],
  selectedEventIndex: 0,
  attendees: [],
  selectedAttendeeIndex: 0,
  notifications: [],
  selectedNotificationIndex: 0,
  socialWalls: [],
  selectedSocialWallIndex: 0
}
*/

export default function rootReducer(state = initialState, action) {
  if (action.type === actionType.AUTH_LOGIN_SUCCESS) {    
    return {
      ...state,
      isLoggedIn: true,
      profileData: action.payload.data
    }
  }
  if (action.type === actionType.AUTH_LOGOUT) {
    return {
      ...state,
      isLoggedIn: false,
      profileData: {}
    }
  }
  if (action.type === actionType.SET_EVENTS) {
    return {
      ...state,
      events: action.payload.data
    }
  }
  if (action.type === actionType.SET_SELECTED_EVENT_INDEX) {
    return {
      ...state,
      selectedEventIndex: action.payload.index
    }
  }
  if (action.type === actionType.SET_ATTENDEES) {
    return {
      ...state,
      attendees: action.payload.data
    }
  }
  if (action.type === actionType.SET_SELECTED_ATTENDEE_INDEX) {
    return {
      ...state,
      selectedAttendeeIndex: action.payload.index
    }
  }
  if (action.type === actionType.SET_NOTIFICATIONS) {
    return {
      ...state,
      notifications: action.payload.data
    }
  }
  if (action.type === actionType.SET_SELECTED_NOTIFICATION_INDEX) {
    return {
      ...state,
      selectedNotificationIndex: action.payload.index
    }
  }
  if (action.type === actionType.SET_SOCIAL_WALLS) {
    return {
      ...state,
      socialWalls: action.payload.data
    }
  }
  if (action.type === actionType.SET_SELECTED_SOCIAL_WALLS_INDEX) {
    return {
      ...state,
      selectedSocialWallsIndex: action.payload.index
    }
  }

  return state;
}
