"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATES_AVAILABLE = 'T2.UPDATES_AVAILABLE';
exports.UPDATES_USER_NOTIFIED = 'T2.UPDATES_USER_NOTIFIED';
exports.CACHE_STATUS_CHANGE = 'T2.T2CACHE_STATUS_CHANGE';
exports.SW_LOG_EVENT = 'T2.SW_LOG_EVENT';
exports.UPDATES_CHECK_REQUEST_START = 'T2.UPDATES_CHECK_REQUEST_START';
exports.UPDATES_CHECK_REQUEST_END = 'T2.UPDATES_CHECK_REQUEST_END';
exports.updatesCheckStart = function () {
    return {
        type: exports.UPDATES_CHECK_REQUEST_START
    };
};
exports.updatesCheckEnd = function () {
    return {
        type: exports.UPDATES_CHECK_REQUEST_END
    };
};
exports.checkForUpdates = function () {
    var onlineId = 1;
    return function (dispatch, getState) {
        dispatch(exports.updatesCheckStart());
        var makeRequest = true;
        if ('onLine' in navigator) {
            if (onlineId && !navigator.onLine) {
                onlineId = 0;
                makeRequest = false;
                dispatch(exports.updatesCheckEnd());
            }
        }
        if (makeRequest) {
        }
    };
};
exports.cacheStatusChange = function (isReady) {
    return {
        type: exports.CACHE_STATUS_CHANGE,
        isReady: isReady
    };
};
exports.updatesAvailable = function (available, meta) {
    if (meta === void 0) { meta = ''; }
    return {
        type: exports.UPDATES_AVAILABLE,
        available: available,
        meta: meta
    };
};
exports.updateUserNotified = function (notified) {
    return {
        type: exports.UPDATES_USER_NOTIFIED,
        notified: notified
    };
};
exports.swLogEvent = function (name, info) {
    if (info === void 0) { info = undefined; }
    var curTime = new Date();
    var log = {
        name: name,
        timestamp: curTime.getTime() / 1000,
        info: info
    };
    return {
        type: exports.SW_LOG_EVENT,
        log: log
    };
};
exports.default = {
    cacheStatusChange: exports.cacheStatusChange,
    updatesAvailable: exports.updatesAvailable,
    updateUserNotified: exports.updateUserNotified,
    swLogEvent: exports.swLogEvent
};
//# sourceMappingURL=index.jsx.map