"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetch = require("isomorphic-fetch");
var defaultConfig = {
    url: '',
    delay: 60000
};
// Our worker Saga: will perform the async increment task
function makeUpdateCheckCall(url) {
    return fetch(url)
        .then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    });
}
/*
function checkUpdates (cfg) {
  return function* () {
    while (true) {
      yield call(delay, cfg.delay);
      if(cfg.url){
         put(updatesCheckStart());
         try {
            let versionData = yield call(makeUpdateCheckCall,cfg.url);
            console.log(versionData);
            yield put(updatesCheckEnd());
         } catch (e) {
            yield put(updatesCheckEnd());
         }
      }
    }
  }
}

// Our watcher Saga
export default function* sagaRoot (cfg = defaultConfig) {

  yield fork(checkUpdates(cfg));
}

*/
exports.default = {};
//# sourceMappingURL=Sagas.js.map