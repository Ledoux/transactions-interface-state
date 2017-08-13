'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationSearch = getLocationSearch;
exports.getLocationSearchString = getLocationSearchString;
exports.getUpdatedSearchString = getUpdatedSearchString;
function getLocationSearch() {
  var searchString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var search = {};
  var items = searchString.match(/[^&?]*?=[^&?]*/g);
  if (items) {
    items.map(function (item) {
      return item.split('=');
    }).forEach(function (couples) {
      search[couples[0]] = decodeURIComponent(couples[1]);
    });
  }
  return search;
}

function getLocationSearchString(search) {
  return search && Object.keys(search).map(function (key) {
    var value = String(search[key]);
    return value && key + '=' + value;
  }).filter(function (arg) {
    return arg;
  }).join('&');
}

function getUpdatedSearchString(search) {
  var oldSearch = getLocationSearch(window.location.search);
  var newSearch = Object.assign(oldSearch, search);
  return getLocationSearchString(newSearch);
}