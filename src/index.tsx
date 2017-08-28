import * as React from 'react';
import {compose, createStore,applyMiddleware} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import * as localForage from "localforage";
//import {getPermissions} from './containers/selectors'

import thunk from 'redux-thunk';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './containers/AppTheme';

import reducer from './reducers';
//import {watchCurrentLocation,unWatchCurrentLocation,setUserPlatform} from './actions';

injectTapEventPlugin();
require('./index.html'); //load and emit index.html

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
            blacklist: ['view','painLevels','painLevelIds','bodySections','bodySectionIds'],
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

  configPromise().then((store) => {

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
