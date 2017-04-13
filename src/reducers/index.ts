import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {device} from './device';
import {appReducer} from 'local-t2-sw-redux';
import {navigationReducer} from 'local-t2-navigation-redux';
import {viewReducer} from '../lib/local-t2-view';


const defaultUser = {
  status: 0,
  username: '',
  authenticated: false
}

const user = (state: any = defaultUser, action: any) => {
  return state;
}


const appHub = combineReducers({
  routing: routerReducer,
  user,
  device,
  app: appReducer,
  navigation: navigationReducer,
  view: viewReducer
});

export default appHub;