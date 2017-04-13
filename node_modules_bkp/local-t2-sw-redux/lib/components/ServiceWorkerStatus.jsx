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
var styles_1 = require("./styles");
var ServiceWorkerStatus = (function (_super) {
    __extends(ServiceWorkerStatus, _super);
    function ServiceWorkerStatus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dateToTimeStamp = function (date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var hoursS = "" + hours;
            var minutesS = "" + minutes;
            var secondsS = "" + seconds;
            if (hours < 10) {
                hoursS = "0" + hours;
            }
            if (minutes < 10) {
                minutesS = "0" + minutes;
            }
            if (seconds < 10) {
                secondsS = "0" + seconds;
            }
            return hoursS + ':' + minutesS + ':' + secondsS;
        };
        _this.timestampToDateString = function (secondsEpoch) {
            var d = new Date(0);
            d.setUTCSeconds(secondsEpoch);
            var mm = d.getMonth() + 1; // getMonth() is zero-based
            var dd = d.getDate();
            var seconds = d.getSeconds();
            var timeStamp = _this.dateToTimeStamp(d);
            var res = [d.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('-') + ' ' + timeStamp;
            return res;
        };
        return _this;
    }
    ServiceWorkerStatus.prototype.render = function () {
        var _this = this;
        var _a = this.props, updates = _a.updates, cache = _a.cache, log = _a.log, actions = _a.actions, dispatchAction = _a.dispatchAction;
        console.log(actions);
        return (<div>
          <h1>Service Worker Info</h1>
          <div style={styles_1.flexParentRowStyle}>
             
             <div style={styles_1.flexRowItemStyle}>
               <h3>Update Status</h3>
               <div>
                 <pre>
                    {JSON.stringify(updates, undefined, 3)}
                 </pre>
               </div>
               <h3>Cache Status</h3>
               <div>
                 <pre>
                    {JSON.stringify(cache, undefined, 3)}
                 </pre>
               </div>
               <h3>Actions</h3>
               {actions.map(function (action, i) {
            return (<div key={i}>
                       <button onClick={dispatchAction(action.actions)} type="button">
                         {action.name}
                       </button>
                     </div>);
        })}
             </div>
             <div style={styles_1.flexRowItemStyle}>
               <h3>SW Event Logs</h3>
            
               {log.map(function (entry, i) {
            return (<div key={i}>
                       <h4>{_this.timestampToDateString(entry.timestamp)}: {entry.name}</h4>
                       <div>
                         <pre>
                            {JSON.stringify(entry.info, undefined, 3)}
                         </pre>
                       </div>
                     </div>);
        })}
             </div>

          </div>
        </div>);
    };
    return ServiceWorkerStatus;
}(React.Component));
exports.default = ServiceWorkerStatus;
//# sourceMappingURL=ServiceWorkerStatus.jsx.map