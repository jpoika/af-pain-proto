"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceWorkerStatus_1 = require("../components/ServiceWorkerStatus");
var react_redux_1 = require("react-redux");
var actions_1 = require("../actions");
var stateToProps = function (state, ownProps) {
    return {
        updates: state.app.updates,
        cache: state.app.cache,
        log: state.app.log,
        actions: [
            { actions: [actions_1.swLogEvent('random event')], name: 'random event' },
            { actions: [actions_1.updatesAvailable(true), actions_1.updateUserNotified(false)], name: 'Fake new SW' },
        ]
    };
};
var dispatchToProps = function (dispatch) {
    return {
        dispatchAction: function (actions) {
            return function () {
                actions.map(function (action) { return dispatch(action); });
            };
        }
    };
};
exports.default = react_redux_1.connect(stateToProps, dispatchToProps)(ServiceWorkerStatus_1.default);
//# sourceMappingURL=AppStatus.jsx.map