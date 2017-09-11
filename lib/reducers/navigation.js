'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLOSE_NAVIGATION = exports.SHOW_NAVIGATION = undefined;
exports.navigation = navigation;
exports.closeNavigation = closeNavigation;
exports.showNavigation = showNavigation;

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _tracking = require('../utils/tracking');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHOW_NAVIGATION = exports.SHOW_NAVIGATION = 'SHOW_NAVIGATION';
var CLOSE_NAVIGATION = exports.CLOSE_NAVIGATION = 'CLOSE_NAVIGATION';

var initialState = {
  isActive: false
};

function navigation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case SHOW_NAVIGATION:
      return (0, _lodash2.default)({}, state, {
        isActive: true
      });
    case CLOSE_NAVIGATION:
      return (0, _lodash2.default)({}, state, {
        isActive: false
      });
    default:
      return state;
  }
}

function closeNavigation() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  action.trackEvent && action.trackEvent('closeNavigation');
  return { type: CLOSE_NAVIGATION };
}

function showNavigation() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  action.trackEvent && action.trackEvent('showNavigation');
  return { type: SHOW_NAVIGATION };
}