'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_AUTHORIZATION_SELECTED_MODE = exports.SET_AUTHORIZATION_LINKS = exports.SET_AUTHORIZATION_IDS_BY_MODE_NAME = exports.REQUEST_AUTHORIZED_API = undefined;
exports.authorization = authorization;
exports.setAuthorizationIdsByModeName = setAuthorizationIdsByModeName;
exports.setAuthorizationSelectedMode = setAuthorizationSelectedMode;
exports.setAuthorizationLinks = setAuthorizationLinks;
exports.requestAuthorizedApi = requestAuthorizedApi;
exports.getNewAuthorizedModes = getNewAuthorizedModes;

var _lodash = require('lodash.flatten');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUEST_AUTHORIZED_API = exports.REQUEST_AUTHORIZED_API = 'REQUEST_AUTHORIZED_API';
var SET_AUTHORIZATION_IDS_BY_MODE_NAME = exports.SET_AUTHORIZATION_IDS_BY_MODE_NAME = 'SET_AUTHORIZATION_IDS_BY_MODE_NAME';
var SET_AUTHORIZATION_LINKS = exports.SET_AUTHORIZATION_LINKS = 'SET_AUTHORIZATION_LINKS';
var SET_AUTHORIZATION_SELECTED_MODE = exports.SET_AUTHORIZATION_SELECTED_MODE = 'SET_AUTHORIZATION_SELECTED_MODE';

var intialState = {
  collectionNames: null,
  modes: null,
  links: null,
  selectedMode: null
};

function authorization() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];

  switch (action.type) {
    case SET_AUTHORIZATION_IDS_BY_MODE_NAME:
      return Object.assign({}, state, {
        idsByModeName: action.idsByModeName
      });
    case SET_AUTHORIZATION_SELECTED_MODE:
      return Object.assign({}, state, {
        selectedMode: action.mode
      });
    case SET_AUTHORIZATION_LINKS:
      var authorizedModes = action.modes.map(function (mode, index) {
        return Object.assign({
          index: index
        }, mode);
      });
      var switchModes = authorizedModes.filter(isSwitchMode);
      return Object.assign({}, state, {
        collectionNames: (0, _lodash2.default)(authorizedModes.map(function (mode) {
          return mode.availableCollectionNames;
        })),
        links: action.links,
        modes: authorizedModes,
        switchModes: switchModes
      });
    default:
      return state;
  }
}

// ACTION CREATORS
function setAuthorizationIdsByModeName(idsByModeName) {
  return {
    type: SET_AUTHORIZATION_IDS_BY_MODE_NAME,
    idsByModeName: idsByModeName
  };
}

function setAuthorizationSelectedMode(mode) {
  return {
    type: SET_AUTHORIZATION_SELECTED_MODE,
    mode: mode
  };
}

function setAuthorizationLinks(links, modes) {
  return {
    type: SET_AUTHORIZATION_LINKS,
    links: links, modes: modes
  };
}

function requestAuthorizedApi(endpoint, config) {
  return {
    type: REQUEST_AUTHORIZED_API,
    endpoint: endpoint, config: config
  };
}

// SELECTORS
function getNewAuthorizedModes(state) {
  return modes.filter(function (mode) {
    return mode.hasModeAccess(state, mode.collectionName);
  });
}