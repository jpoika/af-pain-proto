// import Theme from './components/Theme';
// import Home from './containers/Home';
// import AccountEdit from './containers/pages/AccountEditPage';
// import ExtrasPage from './containers/pages/ExtrasPage';
// import InitialAssessWizard from './containers/InitialAssessWizard';
// import ReAssessmentPage from './containers/pages/ReAssessmentPage';
// import NewPainPage from './containers/pages/NewPainPage';
// import AccountHome from './containers/pages/AccountHomePage';
// import AssessmentOverviewPage from './containers/pages/AssessmentOverviewPage';
// import MedTrackerPage from './containers/pages/MedTrackerPage';
// import NotificationsDashbord from './containers/NotificationsDashbord';
// import EducationResourcesPage from './containers/pages/EducationResourcesPage';
import {viewActions} from './lib/local-t2-view';
import {sheduleInitialAssessment} from './actions/assessment';
// import NotFound from './components/NotFound';
// import SplashPage from './components/SplashPage';
// import PageContainer from './containers/Main';
import * as React from 'react';

// import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
// import {Router, hashHistory} from 'react-router';
import { createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers';
// import {syncRoute} from './lib/helpers';
import {windowResize} from './actions/device';
import {assessmentNotificationClick} from './actions/assessment';
//import {T2CordovaStorageEngine, BrowserCryptoPromise} from './lib/cordova/crypto/';

import * as localForage from 'localforage'
import createMigration from 'redux-persist-migrate';
import LocalNotification from './lib/cordova/local-notifications';
import {initCordova,CordovaConfiguratorInterface} from './lib/cordova/cordova-helper';
import {persistStore, autoRehydrate} from 'redux-persist';
let reducerKey = 'migrations'; // name of the migration reducer

const manifest = {
  9: (state) => ({...state, painLevels: undefined}),
  10: (state) => ({...state, nurseSystem: {...state.nurseSystem,userHasHighPain: 0}}),
  12: (state) => ({...state, nurseSystem: undefined}),
  13: (state) => ({...state, assessments: undefined, assessmentIds: undefined}),
  17: (state) => ({...state, bodySections: undefined})
};

//const migration = createMigration(manifest, reducerKey);
//const persistEnhancer = compose(migration, autoRehydrate());
const storageConfig = {
  keyPrefix: 'reduxPresistPainProto',
  storage: localForage
};

/*
const storageEngine = new T2CordovaStorageEngine({
  crypto: new BrowserCryptoPromise(),
  storage: localForage,
  plainFields: ['routing','device','app','navigation','painLevels','painLevelIds'],
  encryptFields: ['assessmentIds','assessments','medications','user','notifications','notificationIds'],
  lockableFields: ['assessmentIds','assessments']
}); */

 
const migration = createMigration(manifest, reducerKey);
const persistEnhancer = compose(migration, autoRehydrate());

const localNotification = new LocalNotification(() => {
  return cordova.plugins.notification.local;
});


localNotification.onReady(function(){
    this.on('click',(notification) => {
      store.dispatch(viewActions.sendMessage(notification.title));
      if(notification.data.app === 'af_pain'){
        switch(notification.data.type){
          case 'assessment':
            store.dispatch(assessmentNotificationClick(notification.data));
            break;
        }
      }

    });
});


const actionArgs:CordovaConfiguratorInterface = {
  isReady: false,
  plugins: {
    notification: localNotification
  }
};


let store = createStore(reducer,
    applyMiddleware(
        thunkMiddleware.withExtraArgument(actionArgs)
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
              store.dispatch(windowResize(window.innerWidth,window.innerHeight));
          },
        500);
  
}

if (__DEVTOOLS__) {
  store.subscribe(() => {
    console.log(store.getState()); // list entire state of app in js console. Essential for debugging.
  });
}




// const quickRoutes = [

// ];


// const mainSubRoutes = [
//   syncRoute('settings',AccountEdit),
//   syncRoute('assessment-start',InitialAssessWizard),
//   syncRoute('account-home',AccountHome),
//   syncRoute('mtracker',MedTrackerPage),
//   syncRoute('test-stub',NotificationsDashbord),
//   syncRoute('reassess',ReAssessmentPage),
//   syncRoute('newpain',NewPainPage),
//   syncRoute('resources', EducationResourcesPage),
//   syncRoute('resources/:open', EducationResourcesPage),
//   syncRoute('extras', ExtrasPage),
//   syncRoute('assess-overview/:id', AssessmentOverviewPage)

// ];

// const siteRoutes = [

//   {
//     component: Theme,
//     indexRoute: Home,
//     childRoutes: [
//       syncRoute('/',PageContainer, quickRoutes, Home),
//       syncRoute('/main',PageContainer, mainSubRoutes,Home),
//       syncRoute('*',PageContainer,[],NotFound)
//     ]
//   }
// ];


//const history = syncHistoryWithStore(hashHistory, store);

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
    actionArgs.isReady = __IS_CORDOVA_BUILD__;

    

    if(__IS_CORDOVA_BUILD__){
        initCordova(actionArgs)
    }
   
    persistStore(store, storageConfig, (err,state) => {
        if(__IS_CORDOVA_BUILD__){
          setTimeout(() => {
            if(!store.getState().notificationIds.length){ //check hand see if inital assessemnt reminder has been set
              store.dispatch(sheduleInitialAssessment());
            }

          },1000);
        }
        this.setState({ rehydrated: true });
    });
  }

  render(){
    return <div>Old provider</div>;
   // if(!this.state.rehydrated){
   //   return <Theme><SplashPage /></Theme>
   // }
   // return (
   //          <Provider store={store}>
   //            <Router history={history} routes={siteRoutes} />
   //          </Provider>
   //         );
  }
}