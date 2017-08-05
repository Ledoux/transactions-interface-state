'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_USER = exports.SET_ACTIVE_USER = undefined;
exports.user = user;
exports.setActiveUser = setActiveUser;
exports.setUser = setUser;

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SET_ACTIVE_USER = exports.SET_ACTIVE_USER = 'SET_ACTIVE_USER';
var SET_USER = exports.SET_USER = 'SET_USER';

var intialState = {};

function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];

  switch (action.type) {
    case SET_ACTIVE_USER:
      return (0, _lodash2.default)({}, state, { active: true });
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}

function setActiveUser() {
  return {
    type: SET_ACTIVE_USER
  };
}

function setUser(user, config) {
  return {
    type: SET_USER,
    config: config,
    user: user
  };
}