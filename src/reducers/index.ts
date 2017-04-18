import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {device} from './device';
import {appReducer} from 'local-t2-sw-redux';
import {navigationReducer} from 'local-t2-navigation-redux';
import {viewReducer} from '../lib/local-t2-view';
import {FLAG_AS_AUTHENTICATED,FLAG_AS_DEAUTHENTICATED,SET_USERNAME,UPDATE_ACCOUNT_INFO} from '../actions';
import {ASSESS_MOVE_STEP} from '../actions/assessment';
import { normalize, schema } from 'normalizr';
import {bodySectionList} from '../res/data/body';
import {assessments,assessmentIds,bodySections,bodySectionIds,painLevels, painLevelIds} from './assessments'

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
  }
  return state;
}


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
  painLevelIds
});

export default appHub;