"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var logMax = 30;
var loadDate = new Date();
var firstLog = {
    name: 'log init',
    timestamp: loadDate.getTime() / 1000
};
var defaultApp = {
    cache: {
        isReady: false // ready for offlining
    },
    updates: {
        available: false,
        userNotified: false
    },
    log: [firstLog],
    version: null
};
exports.app = function (state, action) {
    if (state === void 0) { state = defaultApp; }
    switch (action.type) {
        case actions_1.UPDATES_SET_VERSION:
            return __assign({}, state, { version: action.version });
        case actions_1.UPDATES_USER_NOTIFIED:
            return __assign({}, state, { updates: __assign({}, state.updates, { userNotified: action.notified }) });
        case actions_1.CACHE_STATUS_CHANGE:
            return __assign({}, state, { cache: __assign({}, state.cache, { isReady: action.isReady }) });
        case actions_1.UPDATES_AVAILABLE:
            return __assign({}, state, { updates: __assign({}, state.updates, { available: action.available }) });
        case actions_1.SW_LOG_EVENT:
            var logLength = state.log.unshift(action.log);
            if (logLength > logMax) {
                state.log = state.log.slice(0, logMax);
            }
            return __assign({}, state, { log: state.log });
    }
    return state;
};
exports.default = exports.app;
//# sourceMappingURL=index.js.map