'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHOW_INFORMATION = exports.CLOSE_INFORMATION = undefined;
exports.information = information;
exports.closeInformation = closeInformation;
exports.showInformation = showInformation;

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _tracking = require('../utils/tracking');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLOSE_INFORMATION = exports.CLOSE_INFORMATION = 'CLOSE_INFORMATION';
var SHOW_INFORMATION = exports.SHOW_INFORMATION = 'SHOW_INFORMATION';

var intialState = {
  isActive: false
};

function information() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];

  switch (action.type) {
    case SHOW_INFORMATION:
      return (0, _lodash2.default)({}, state, {
        isActive: true
      });
    case CLOSE_INFORMATION:
      return (0, _lodash2.default)({}, state, {
        isActive: false
      });
    default:
      return state;
  }
}

function closeInformation() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  action.trackEvent && action.trackEvent('closeInformation');
  return { type: CLOSE_INFORMATION };
}

function showInformation() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  action.trackEvent && action.trackEvent('showInformation');
  return { type: SHOW_INFORMATION };
}