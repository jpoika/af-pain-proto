"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
exports.registerPromise = function (registrationPromise, appStore) {
    return registrationPromise.then(function (reg) {
        reg.onupdatefound = function () {
            // The updatefound event implies that reg.installing is set; see
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = reg.installing;
            appStore.dispatch(actions_1.swLogEvent('onupdatefound'));
            installingWorker.onstatechange = function () {
                appStore.dispatch(actions_1.swLogEvent('onstatechange'));
                switch (installingWorker.state) {
                    case 'installed':
                        if (navigator.serviceWorker.controller) {
                            appStore.dispatch(actions_1.swLogEvent('installed', 'navigator.serviceWorker.controller is set'));
                            // At this point, the old content will have been purged and the fresh content will
                            // have been added to the cache.
                            // It's the perfect time to display a 'New content is available; please refresh.'
                            // message in the page's interface.
                            if (__DEVTOOLS__) {
                                console.log('New or updated content is now available.');
                            }
                            appStore.dispatch(actions_1.updatesAvailable(true, 'new content'));
                            appStore.dispatch(actions_1.updateUserNotified(false));
                            appStore.dispatch(actions_1.cacheStatusChange(true));
                        }
                        else {
                            // At this point, everything has been precached.
                            // It's the perfect time to display a 'Content is cached for offline use.' message.
                            appStore.dispatch(actions_1.swLogEvent('installed', 'navigator.serviceWorker.controller is NOT set'));
                            appStore.dispatch(actions_1.cacheStatusChange(true));
                            appStore.dispatch(actions_1.updatesAvailable(false, 'avail offline'));
                            appStore.dispatch(actions_1.updateUserNotified(true));
                            if (__DEVTOOLS__) {
                                console.log('Content is now available offline!');
                            }
                        }
                        break;
                    case 'redundant':
                        if (__DEVTOOLS__) {
                            console.error('The installing service worker became redundant.');
                        }
                        appStore.dispatch(actions_1.swLogEvent('redundant'));
                        appStore.dispatch(actions_1.updateUserNotified(false));
                        appStore.dispatch(actions_1.updatesAvailable(true, 'redundant'));
                        break;
                    default:
                        appStore.dispatch(actions_1.swLogEvent(installingWorker.state, 'no action taken by app'));
                }
            };
        };
        return reg;
    }).catch(function (e) {
        appStore.dispatch(actions_1.updateUserNotified(true));
        appStore.dispatch(actions_1.updatesAvailable(false, ' catch'));
        if (__DEVTOOLS__) {
            console.error('Error during service worker registration:', e);
        }
        appStore.dispatch(actions_1.swLogEvent('error', e));
        throw e;
    });
};
exports.default = {
    registerPromise: exports.registerPromise
};
//# sourceMappingURL=serviceWorker.js.map