"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UpdateSnackBar_1 = require("../components/UpdateSnackBar");
var react_redux_1 = require("react-redux");
var actions_1 = require("../actions");
var stateToProps = function (state, ownProps) {
    return {
        open: state.app.updates.available && !state.app.updates.userNotified,
        message: state.app.updates.available ? 'There are updates available for this app.' : '',
        autoHideDuration: 2000
    };
};
var stateToDispatch = function (dispatch, ownProps) {
    return {
        onClick: function () {
            dispatch(actions_1.updateUserNotified(true));
            dispatch(actions_1.updatesAvailable(false, 'user update click'));
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
    };
};
exports.default = react_redux_1.connect(stateToProps, stateToDispatch)(UpdateSnackBar_1.default);
//# sourceMappingURL=UpdateSnackBar.js.map