"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UpdateDialog_1 = require("../components/UpdateDialog");
var react_redux_1 = require("react-redux");
var actions_1 = require("../actions");
var stateToProps = function (state, ownProps) {
    return {
        open: state.app.updates.available && !state.app.updates.userNotified,
        message: 'There are updates available for this app. This page will reload.'
    };
};
var stateToDispatch = function (dispatch, ownProps) {
    return {
        onClick: function () {
            dispatch(actions_1.updateUserNotified(true));
            dispatch(actions_1.updatesAvailable(false, 'user dialog click'));
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
    };
};
exports.default = react_redux_1.connect(stateToProps, stateToDispatch)(UpdateDialog_1.default);
//# sourceMappingURL=UpdateDialog.jsx.map