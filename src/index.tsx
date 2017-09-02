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



import reducer from './reducers';
import {redirectTo} from './actions';
import {addAssessmentIfNecessary} from './actions/assessment';
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

function configPromise() {
  // use desired middlewares
  let db = null;
  const thunkArgs = {
    isCordova: __IS_CORDOVA_BUILD__,
    platform: __IS_CORDOVA_BUILD__ ? (window as any).device.platform.toLowerCase() : 'browser',
    nativeSettings: __IS_CORDOVA_BUILD__  ? (window as any).cordova.plugins.settings : null,
    db: db
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
            blacklist: ['medicationchoiceIds','medicationchoices','view','painLevels','painLevelIds','bodySections','bodySectionIds'],
            storage: localForage,
            keyPrefix: 'afPainApp:'
          },
          () => resolve(store as any)
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
  const localNotification = new LocalNotification(() => {
    return cordova.plugins.notification.local;
  });

  configPromise().then((store) => {
  localNotification.onReady(function(){
      this.on('click',(notification) => {
        store.dispatch(viewActions.sendMessage(notification.title));
        if(notification.data.app === 'af_pain'){
          switch(notification.data.type){
            case 'assessment':
                  switch (notification.data) {
                    case "initial":
                        store.dispatch(redirectTo('/main/assessment-start'));
                      break;
                    case "reassessment":
                        store.dispatch(addAssessmentIfNecessary('reassessment'));
                        store.dispatch(redirectTo('/main/reassess'));
                      break;
                  }
              break;
          }
        }

      });
  });

  setTimeout(() => {

    store.dispatch(redirectTo('/main/reassess/ruddy'));
  }, 5000);
    
    store.subscribe(() => {
        console.log(store.getState()); // list entire state of app
    });

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
