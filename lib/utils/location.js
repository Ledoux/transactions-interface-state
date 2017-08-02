'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationSearch = getLocationSearch;
exports.getLocationSearchString = getLocationSearchString;
exports.getUpdatedSearchString = getUpdatedSearchString;
exports.getIsEditOrNewNotBlock = getIsEditOrNewNotBlock;
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

function getIsEditOrNewNotBlock(search, nextSearch) {
  var isEdit = search.isEdit === 'true';
  var isNew = search.slug === 'new';
  // We here handle the fact that the user may want to change the page, but
  // a content is still been modified, so we have to know if the user wants
  // really to leave
  var isForcingLocationChange = search.isForcingLocationChange === 'true';
  var nextIsForcingLocationChange = nextSearch.isForcingLocationChange === 'true';
  var nextIsEdit = nextSearch.isEdit === 'true';
  if (!nextIsForcingLocationChange && (isEdit && !nextIsEdit || isNew && !isForcingLocationChange)) {
    // return false to block the change of location
    return false;
  }
}