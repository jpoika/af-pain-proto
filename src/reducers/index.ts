import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {device} from './device';
import {appReducer} from 'local-t2-sw-redux';
import {navigationReducer} from 'local-t2-navigation-redux';
import {viewReducer} from '../lib/local-t2-view';
import {
  FLAG_AS_AUTHENTICATED,
  FLAG_AS_DEAUTHENTICATED,SET_USERNAME,UPDATE_ACCOUNT_INFO} from '../actions';
import {ASSESS_MOVE_STEP, ASSESS_MOVE_STEP_IF_NEXT} from '../actions/assessment';
import { normalize, schema } from 'normalizr';
import {bodySectionList} from '../res/data/body';
import {assessments,assessmentIds,bodySections,bodySectionIds,painLevels, painLevelIds} from './assessments';
import {medications, medicationIds} from './medications';

const defaultUser = {
  status: 0,
  username: '',
  authenticated: false,
  firstname: '',
  middlename: '',
  lastname: '',
  dob: null,
  gender: null
}

const user = (state: any = defaultUser, action: any) => {

  switch(action.type){
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
  }
  return state;
}

const defaultInitAssess = {
  step: 0
}

const initialAssessment = (state = defaultInitAssess, action: any) => {
  switch (action.type) {
    case ASSESS_MOVE_STEP:
      state = {...state, step: action.stepIndex}
      break;
    case ASSESS_MOVE_STEP_IF_NEXT:
      console.log(state.step,action.stepIndex);
      if(state.step=== action.stepIndex){
        state = {...state, step: action.stepIndex + 1}
      }
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
  initialAssessment,
  bodySections,
  bodySectionIds,
  assessments,
  assessmentIds,
  painLevels,
  painLevelIds,
  migrations,
  medications,
  medicationIds
});

export default appHub;