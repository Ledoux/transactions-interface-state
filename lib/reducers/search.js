'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_SEARCH = undefined;
exports.search = search;
exports.setSearch = setSearch;

var _location = require('../utils/location');

var SET_SEARCH = exports.SET_SEARCH = 'SET_SEARCH';

var initialState = {};

function search() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case SET_SEARCH:
      return (0, _location.getLocationSearch)(action.searchString);
    default:
      return state;
  }
}

function setSearch(searchString) {
  return { searchString: searchString,
    type: SET_SEARCH
  };
}