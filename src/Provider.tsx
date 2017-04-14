import Theme from './components/Theme';
import Home from './containers/Home';
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
  '00001': (state) => ({...state, navigation: undefined}),
};



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
        appMiddleware({url: 'http://localhost:3014/version.json',interval: 30000})
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


if(__INCLUDE_SERVICE_WORKER__){ // __INCLUDE_SERVICE_WORKER__ and other __VAR_NAME__ variables are used by webpack durring the build process. See <root>/webpack-production.config.js
  if ('serviceWorker' in navigator) {
    console.log("Registering Service Worker");
    /**
     * Service workers are not supported currently in an iOS browsers
     */
    const registrationPromise = navigator.serviceWorker.register('./sw.js');
    /**
     * registerPromise takes the serviceWorker promise and listens for
     * certain events which will trigger redux dispatch events
     *
     */
   
    registerPromise(registrationPromise, store).then(function (res) {
      if (__DEVTOOLS__) {
        console.log(res);
      }
    }).catch(function (e) {
      if (__DEVTOOLS__) {
        console.log(e);
      }
      throw e;
    });
  
  }
}


const asyncRoute = asynRouteMaker({});


const quickRoutes = [

];


const mainSubRoutes = [
  asyncRoute('settings',System.import('./containers/Account')),
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