import * as React from 'react';
import {compose, createStore,applyMiddleware} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import * as localForage from "localforage";
//import {getPermissions} from './containers/selectors'
import LocalNotification from './lib/cordova/local-notifications';
import thunk from 'redux-thunk';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './containers/AppTheme';
import {viewActions} from './lib/local-t2-view';
import {sheduleInitialAssessment} from './actions/assessment';
//import LocalNotification from './lib/cordova/cordova-helper';


import reducer from './reducers';
import {redirectTo} from './actions';
import {getCompleteAssessements} from './containers/assessment/selectors';

//import {watchCurrentLocation,unWatchCurrentLocation,setUserPlatform} from './actions';

//TODO migrations
/**
 * medications
 * medicationIds
 */


injectTapEventPlugin();
require('./index.html'); //load and emit index.html


/**
 * this configuration function returns a promise that won't be resolved until
 * the persisted data is loaded.
 *
 * It is currently being used to prevent the rendering of react components until the data is loaded.
 */
const localNotification = new LocalNotification(() => cordova.plugins.notification.local);
function configPromise() {
  // use desired middlewares

  __IS_CORDOVA_BUILD__ && localNotification.init();

  const thunkArgs = {
    isCordova: __IS_CORDOVA_BUILD__,
    platform: __IS_CORDOVA_BUILD__ ? (window as any).device.platform.toLowerCase() : 'browser',
    nativeSettings: __IS_CORDOVA_BUILD__  ? (window as any).cordova.plugins.settings : null,
    appConfig: {
      notifications: {
        interval: 60 * 1000 * 60 * 2 //2 hours
      }
    },
    localNotification
  }

  return new Promise<any>((resolve, reject) => {
    try {
      const store = createStore(
          reducer,
          undefined,
          compose(
            applyMiddleware(thunk.withExtraArgument(thunkArgs)),
            autoRehydrate()
          ) as any
        );

        persistStore(store,{
            //blacklist: ['medicationchoiceIds','medicationchoices','view','painLevels','painLevelIds','bodySections','bodySectionIds'],
            whitelist: [
              'assessments',
              'assessmentIds',
              'assessmentSystem',
              'medicationIds',
              'medications',
              'medicationchoiceIds',
              'medicationchoices',
              'migrations',
              'notificationIds',
              'notifications',
              'painReductionIds',
              'painReductions',
              'user'
            ],
            storage: localForage,
            keyPrefix: 'afPainApp:'
          },
          () => resolve(store as any) //rehydration is complete
        );
    } catch (e) {
      reject(e);
    }
  });
}

const render = (Component: any) => {




  const cordovaPause = () => {
   
  }

  const cordovaResume = () => {


  }

  if(__IS_CORDOVA_BUILD__){
    document.addEventListener("pause", cordovaPause, false);
    document.addEventListener("resume", cordovaResume, false);
  }

  configPromise().then((store) => {

    if(
        store.getState().notificationIds.length === 0 && 
        getCompleteAssessements(store.getState(),{}).length === 0){
      store.dispatch(sheduleInitialAssessment());
    }

    localNotification.onReady(function(){
        this.on('click',(notification) => {
          store.dispatch(viewActions.sendMessage(notification.title));
          if(notification.data.app === 'af_pain'){
            switch(notification.data.type){
              case 'assessment':
                    switch (notification.data.name) {
                      case "initial":
                          store.dispatch(redirectTo('/main/assessment-start'));
                        break;
                      case "reassessment":
                          store.dispatch(redirectTo('/main/reassess'));
                        break;
                    }
                break;
            }
          }

        });
    });

    if(__DEVTOOLS__){
      store.subscribe(() => {
          console.log(store.getState()); // list entire state of app
      });
    }


    ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <HashRouter>
              <Component />
            </HashRouter>
          </Provider>
        </AppContainer>,
        document.getElementById("spaApp")
    );
  })
}
if(__IS_CORDOVA_BUILD__){
  document.addEventListener("deviceready", function(){

    // document.addEventListener("menubutton", onMenuKeyDown, false);

       render(App);
  })
} else {
  render(App);
  // Hot Module Replacement API. Only used when running the dev server.
  if ((module as any).hot) {
    (module as any).hot.accept('./containers/AppTheme', () => {
      render(App);
    });
  }
}
