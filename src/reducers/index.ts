import {combineReducers} from 'redux';
import {device} from './device';
import {appReducer} from 'local-t2-sw-redux';
import {notifications, notificationIds} from './notifications';
import {messageDialogs, messageDialogIds,messages, messageIds,messagePromptIds,messagePrompts} from './messages';

import {
  RESET_APP,
  FLAG_AS_AUTHENTICATED,
  USER_SET_MEDICATION_STATUS,
  FLAG_AS_DEAUTHENTICATED,
  SET_USERNAME,UPDATE_ACCOUNT_INFO,
  USER_ENABLE_DO_NOT_DISTURB,
  USER_DISABLE_DO_NOT_DISTURB,
  WINDOW_RESIZE,
  SET_PAGE_TITLE,
  T2_APP_MESSAGE_CLEAR,
  T2_APP_MESSAGE_START,
  REDIRECT_TO,
  REDIRECT_CLEAR
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

import {medications, medicationIds, medicationchoices, medicationchoiceIds} from './medication';
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


const defaultView = {
  screen: {
    width: 500,
    height: 500
  },
  page: {
    title: 'Welcome'
  },
  flash: {
    message: '',
    open: false
  },
  redirect: {
    path: '',
    method: 'push'
  }
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

const view = (state = defaultView, action) => {
  let redirect: any = {};
  switch (action.type) {
    case WINDOW_RESIZE:
      state = {...state,screen: {...state.screen, width: action.width, height: action.height}};
      break;
    case SET_PAGE_TITLE:
      state = {...state,page: {...state.page, title: action.title}};
      break;
    case T2_APP_MESSAGE_START:
      state = {...state,flash: {message: action.message, open: true}};
      break;
    case T2_APP_MESSAGE_CLEAR:
      state = {...state,flash: {message: '', open: false}};
      break;
    case REDIRECT_TO:
      redirect = {...state.redirect, path: action.path};
      state = {...state,redirect: redirect};
      break;
    case REDIRECT_CLEAR:
      redirect = {...state.redirect, path: ''};
      state = {...state,redirect: redirect}
      break;
  }
  return state;
}

export const migrations = (state = {}, action) => {
  return state;
};
const appHub = combineReducers({
  user,
  device,
  app: appReducer,
  view,
  bodySections, //don't persist
  bodySectionIds, //don't persist
  assessments,
  assessmentIds,
  assessmentSystem,
  painLevels, //don't persist
  painLevelIds, //don't persist
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
  messagePrompts,
  medicationchoices,
  medicationchoiceIds
});
const rootReducer = (state, action) => {

  if (action.type === RESET_APP) {
    state = undefined;
  }

  return appHub(state, action)
}
export default rootReducer;