'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loading = loading;
exports.showLoading = showLoading;
exports.closeLoading = closeLoading;
var SHOW_LOADING = exports.SHOW_LOADING = 'SHOW_LOADING';
var CLOSE_LOADING = exports.CLOSE_LOADING = 'CLOSE_LOADING';

var intialState = {
  isActive: false,
  tag: null
};

function loading() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];

  switch (action.type) {
    case SHOW_LOADING:
      return Object.assign({}, state, {
        isActive: true,
        tag: action.tag
      });
    case CLOSE_LOADING:
      return Object.assign({}, state, {
        isActive: false,
        tag: null
      });
    default:
      return state;
  }
}

// ACTIONS
function showLoading(tag) {
  return {
    tag: tag,
    type: SHOW_LOADING
  };
}

function closeLoading() {
  return {
    type: CLOSE_LOADING
  };
}