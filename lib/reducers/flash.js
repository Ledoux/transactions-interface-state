'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ASSIGN_IN_FLASH = undefined;
exports.flash = flash;
exports.assignInFlash = assignInFlash;

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ASSIGN_IN_FLASH = exports.ASSIGN_IN_FLASH = 'ASSIGN_IN_FLASH';

var intialState = null;

function flash() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];

  switch (action.type) {
    case ASSIGN_IN_FLASH:
      return (0, _lodash2.default)({}, state, action.patch);
    default:
      return state;
  }
}

function assignInFlash(patch) {
  return {
    type: ASSIGN_IN_FLASH,
    patch: patch
  };
}