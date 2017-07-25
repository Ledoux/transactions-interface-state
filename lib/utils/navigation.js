'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthorizedLink = isAuthorizedLink;
exports.getAuthorizedLinks = getAuthorizedLinks;
exports.getLocationSearch = getLocationSearch;
exports.getLocationSearchString = getLocationSearchString;
exports.getUpdatedSearchString = getUpdatedSearchString;
function isAuthorizedLink(link, authorizedModeNames) {
  var label = link.label,
      modeNames = link.modeNames;

  if (modeNames) {
    return modeNames.find(function (modeName) {
      return authorizedModeNames.includes(modeName);
    });
  }
  return label;
}

function getAuthorizedLinks(authorizedModes) {
  var authorizedModeNames = authorizedModes.map(function (authorizedMode) {
    return authorizedMode.name;
  });
  return menuLinks.filter(function (link) {
    return isAuthorizedLink(link, authorizedModeNames);
  }).map(function (_ref) {
    var label = _ref.label,
        path = _ref.path;
    return { label: label, path: path };
  });
}

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