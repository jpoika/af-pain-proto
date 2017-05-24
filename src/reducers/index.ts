import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {device} from './device';
import {appReducer} from 'local-t2-sw-redux';
import {navigationReducer} from 'local-t2-navigation-redux';
import {viewReducer} from '../lib/local-t2-view';
import {notifications, notificationIds} from './notifications';
import {messageDialogs, messageDialogIds,messages, messageIds,messagePromptIds,messagePrompts} from './messages';

import {
  RESET_APP,
  FLAG_AS_AUTHENTICATED,
  USER_SET_MEDICATION_STATUS,
  FLAG_AS_DEAUTHENTICATED,
  SET_USERNAME,UPDATE_ACCOUNT_INFO,
  USER_ENABLE_DO_NOT_DISTURB,
  USER_DISABLE_DO_NOT_DISTURB
} from '../actions';


import {
  assessments,
  assessmentIds,
  bodySections,
  bodySectionIds,
  painLevels, 
  painLevelIds, 
  assessmentSystem,
  newPainBodySections
} from './assessments';
import {medications, medicationIds} from './medication';
import {nurseSystem} from './nurse';
const defaultUser = {
  status: 0,
  username: '',
  authenticated: false,
  doNotDisturb: false,
  lastActivityTime: 0,
  firstname: '',
  middlename: '',
  lastname: '',
  dob: null,
  gender: null,
  understands_meds: 0//0: has not specified, 1: not taking meds, 2: Is taking meds and understands, 3: Taking meds and does not understand them.
}

const user = (state: any = defaultUser, action: any) => {

  switch(action.type){
    case USER_ENABLE_DO_NOT_DISTURB:
      state = {...state,doNotDisturb: true};
      break;
    case USER_DISABLE_DO_NOT_DISTURB:
      state = {...state,doNotDisturb: false};
      break;
    case FLAG_AS_AUTHENTICATED:
      state = {...state,authenticated: true};
      break;
    case FLAG_AS_DEAUTHENTICATED:
      state = {...defaultUser,authenticated: false};
      break;
    case SET_USERNAME:
      state = {...state,username: action.username};
      break;
    case UPDATE_ACCOUNT_INFO:
      state = {...state,
                        firstname: action.account.firstname,
                        lastname: action.account.lastname,
                        middlename: action.account.middlename,
                        dob: action.account.dob,
                        gender: action.account.gender
                      };
      break;
    case USER_SET_MEDICATION_STATUS:
      state = {...state,understands_meds: action.status};
      break;
  }
  return state;
}



export const migrations = (state = {}, action) => {
  return state;
};
const appHub = combineReducers({
  routing: routerReducer,
  user,
  device,
  app: appReducer,
  navigation: navigationReducer,
  view: viewReducer,
  bodySections, //TODO remove? (static data)
  bodySectionIds, //TODO remove? (static data)
  assessments,
  assessmentIds,
  assessmentSystem,
  painLevels, //TODO remove? (static data)
  painLevelIds, //TODO remove? (static data)
  migrations,
  medications,
  medicationIds,
  nurseSystem,
  notifications,
  notificationIds,
  newPainBodySections,
  messageDialogs, 
  messageDialogIds,
  messages, 
  messageIds,
  messagePromptIds,
  messagePrompts
});
const rootReducer = (state, action) => {
  // if (action.type === 'RESET') return action.stateFromLocalStorage
  if (action.type === RESET_APP) {
    state = undefined;
  }

  return appHub(state, action)
}
export default rootReducer;