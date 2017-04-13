"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Dialog_1 = require("material-ui/Dialog");
var FlatButton_1 = require("material-ui/FlatButton");
/**
 * Alerts user to updates
 */
var UpdateDialog = (function (_super) {
    __extends(UpdateDialog, _super);
    function UpdateDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateDialog.prototype.render = function () {
        var _a = this.props, open = _a.open, onClick = _a.onClick, message = _a.message;
        var actions = [
            React.createElement(FlatButton_1.default, { label: "Ok", primary: true, onTouchTap: onClick })
        ];
        return (React.createElement(Dialog_1.default, { actions: actions, modal: true, open: open, onRequestClose: onClick }, message));
    };
    return UpdateDialog;
}(React.Component));
exports.default = UpdateDialog;
//# sourceMappingURL=UpdateDialog.js.map