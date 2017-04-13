"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//require('babel-polyfill');
var reducers_1 = require("./reducers");
exports.appReducer = reducers_1.default;
var actions_1 = require("./actions");
exports.appActions = actions_1.default;
var UpdateSnackBar_1 = require("./containers/UpdateSnackBar");
exports.UpdateSnackBar = UpdateSnackBar_1.default;
var serviceWorker_1 = require("./lib/serviceWorker");
exports.registerPromise = serviceWorker_1.registerPromise;
var helpers_1 = require("./lib/helpers");
function newDateTs() {
    var intervalDate = new Date();
    return intervalDate.getTime();
}
var lastTs = newDateTs();
var appMiddleware = function (config) {
    return function (store) { return function (next) {
        return function (action) {
            var result = next(action);
            if ((lastTs + config.interval) < newDateTs()) {
                lastTs = newDateTs();
                helpers_1.handleUpdateCheck(store, config);
            }
            return result;
        };
    }; };
};
exports.appMiddleware = appMiddleware;
exports.default = serviceWorker_1.registerPromise;
//# sourceMappingURL=index.js.map