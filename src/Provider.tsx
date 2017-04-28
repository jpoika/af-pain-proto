import Theme from './components/Theme';
import Home from './containers/Home';
import AccountEdit from './containers/AccountEdit';
import InitialAssessWizard from './containers/InitialAssessWizard';
import ReAssessmentWizard from './containers/ReAssessmentWizard';
import AccountHome from './containers/AccountHome';
import MedTrackerPage from './containers/MedTrackerPage';
import AlertScreen from './containers/AlertScreen';

import Login from './containers/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import SplashPage from './components/SplashPage';
import Debug from './containers/Debug';
import PageContainer from './containers/Main';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {navigationCreateMiddleware} from 'local-t2-navigation-redux';
import {registerPromise,appMiddleware} from 'local-t2-sw-redux';
import { createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers';
import {asynRouteMaker,syncRoute} from './lib/helpers';
import {windowResize} from './actions/device';
import navigationConfig from './navigationConfig';
import * as localForage from 'localforage'
import createMigration from 'redux-persist-migrate';
import {persistStore, autoRehydrate, purgeStoredState, getStoredState} from 'redux-persist';
let reducerKey = 'migrations'; // name of the migration reducer

const manifest = {
  9: (state) => ({...state, painLevels: undefined}),
  10: (state) => ({...state, nurseSystem: {...state.nurseSystem,userHasHighPain: 0}}),
  12: (state) => ({...state, nurseSystem: undefined})
};

//const migration = createMigration(manifest, reducerKey);
//const persistEnhancer = compose(migration, autoRehydrate());
const storageConfig = {
  keyPrefix: 'reduxPresistPainProto',
  storage: localForage
};


 
const migration = createMigration(manifest, reducerKey);
const persistEnhancer = compose(migration, autoRehydrate());
let store = createStore(reducer,
    applyMiddleware(
        routerMiddleware(hashHistory),
        thunkMiddleware,
        navigationCreateMiddleware(navigationConfig),
        appMiddleware({url: '',interval: 30000})
      ),
    persistEnhancer as any
  );

var _timeOutResizeId = null;

window.onresize = () => {
   if(_timeOutResizeId){
     clearTimeout(_timeOutResizeId);
   }
   _timeOutResizeId = setTimeout(
          function(){
              console.log('resize called');
              store.dispatch(windowResize(window.innerWidth,window.innerHeight));
          },
        500);
  
}

if (__DEVTOOLS__) {
  store.subscribe(() => {
    console.log(store.getState()); // list entire state of app in js console. Essential for debugging.
  });
}


const asyncRoute = asynRouteMaker({});


const quickRoutes = [

];


const mainSubRoutes = [
  syncRoute('settings',AccountEdit),
  syncRoute('assessment-start',InitialAssessWizard),
  syncRoute('account-home',AccountHome),
  syncRoute('mtracker',MedTrackerPage),
  syncRoute('test-signaler',AlertScreen),
  syncRoute('reassess',ReAssessmentWizard)
];

const siteRoutes = [

  {
    component: Theme,
    indexRoute: Home,
    childRoutes: [
      syncRoute('/',PageContainer, quickRoutes, Home),
      syncRoute('/login',PageContainer, quickRoutes, Login),
      syncRoute('/main',PageContainer, mainSubRoutes,Home),
      syncRoute('/debug',PageContainer, [],Debug),
      syncRoute('*',PageContainer,[],NotFound)
    ]
  }
];


const history = syncHistoryWithStore(hashHistory, store);

interface MyProps {
  [propName: string]: any;
}

interface MyState {
  [propName: string]: any;
}

export default class AppProvider extends React.Component<MyProps,  MyState>{
  constructor(store){
    super(store);
    this.state = {
      rehydrated: false
    }
  }
  componentWillMount () { // only called on first load or hard browser refresh

    persistStore(store, storageConfig, (err,state) => {

        this.setState({ rehydrated: true });
    });
  }


  render(){
   if(!this.state.rehydrated){
     return <Theme><SplashPage /></Theme>
   }
   return (
            <Provider store={store}>
              <Router history={history} routes={siteRoutes} />
            </Provider>
           );
  }
}