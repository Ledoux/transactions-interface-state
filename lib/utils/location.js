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
      var value = decodeURIComponent(couples[1]);
      /*
      const parseMatch = value.match(/_PARSE_(.*)/)
      if (parseMatch && parseMatch[1]) {
        value = JSON.parse(parseMatch[1])
      }
      */
      search[couples[0]] = value;
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

function getUpdatedSearchString() {
  for (var _len = arguments.length, searchs = Array(_len), _key = 0; _key < _len; _key++) {
    searchs[_key] = arguments[_key];
  }

  var nextSearch = Object.assign.apply(Object, [{}].concat(searchs));
  return getLocationSearchString(nextSearch);
}