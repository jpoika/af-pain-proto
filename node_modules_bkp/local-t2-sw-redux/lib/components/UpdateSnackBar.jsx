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
var Snackbar_1 = require("material-ui/Snackbar");
/**
 * Alerts user to updates
 */
var UpdateSnackBar = (function (_super) {
    __extends(UpdateSnackBar, _super);
    function UpdateSnackBar(props) {
        var _this = _super.call(this, props) || this;
        /*
          componentWillReceiveProps = (nextProps) => {
              if(nextProps.open && !this.state.open){
                this.setState({open: true})
              }
          }
          */
        _this.handleActionTouchTap = function () {
            var onClick = _this.props.onClick;
            onClick();
        };
        _this.handleTouchTap = function () {
            _this.setState({
                open: true,
            });
        };
        _this.handleRequestClose = function () {
            _this.setState({
                open: false,
            });
        };
        _this.state = {
            open: false,
        };
        return _this;
    }
    UpdateSnackBar.prototype.render = function () {
        var _a = this.props, message = _a.message, open = _a.open, autoHideDuration = _a.autoHideDuration;
        return (<Snackbar_1.default open={open} action="update" message={message} autoHideDuration={autoHideDuration} onActionTouchTap={this.handleActionTouchTap} onRequestClose={this.handleRequestClose}/>);
    };
    return UpdateSnackBar;
}(React.Component));
exports.default = UpdateSnackBar;
//# sourceMappingURL=UpdateSnackBar.jsx.map