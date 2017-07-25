'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasValidAuthToken = hasValidAuthToken;
exports.getNewAuthToken = getNewAuthToken;
exports.getAuthorizationData = getAuthorizationData;
exports.watchRequestAuthorizedApiAction = watchRequestAuthorizedApiAction;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _authorization = require('../reducers/authorization');

var _apis = require('../utils/apis');

var _subscription = require('../utils/subscription');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getAuthorizationData, fromWatchRequestAuthorizedApiActionData, watchRequestAuthorizedApiAction].map(regeneratorRuntime.mark);

var AUTH_RENEWAL_THRESHOLD = 1000 * 60 * 5; // 5 minutes before expiry

function hasValidAuthToken(user) {
  var authToken = user.authToken,
      authTokenExpiry = user.authTokenExpiry;

  return authToken && authTokenExpiry && authTokenExpiry - Date.now() > AUTH_RENEWAL_THRESHOLD;
}

function getNewAuthToken(user, url) {
  return window.fetch(url + '/authenticate', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // send cookies, so we can use req.user on server
    credentials: 'same-origin',
    body: JSON.stringify({ email: user.email })
  }).then(function (req) {
    return req.json();
  }).catch(function (e) {
    console.log('/authenticate gave error', e);
  });
}

// DATA

// use this function to automatically handle
// ensuring having valid api auth
// to be able to fulfill api request
function getAuthorizationData(action) {
  var user, response;
  return regeneratorRuntime.wrap(function getAuthorizationData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(function (_ref) {
            var user = _ref.user;
            return user;
          });

        case 2:
          user = _context.sent;

          if (!(typeof user.authToken === 'undefined')) {
            _context.next = 5;
            break;
          }

          return _context.abrupt('return', action.method === 'GET' && _subscription.guestMode.availableCollectionNames.includes(action.collectionName));

        case 5:
          if (hasValidAuthToken(user)) {
            _context.next = 18;
            break;
          }

          if (!(!action.extra || !action.extra.signPath)) {
            _context.next = 9;
            break;
          }

          console.warn('failed to get the extra.signPath in action');
          return _context.abrupt('return');

        case 9:
          _context.next = 11;
          return (0, _effects.call)(getNewAuthToken, user, action.extra.signPath);

        case 11:
          response = _context.sent;

          if (!response.error) {
            _context.next = 15;
            break;
          }

          console.warn('failed to get new auth token', response.error);
          return _context.abrupt('return');

        case 15:
          return _context.abrupt('return', response.authToken);

        case 18:
          return _context.abrupt('return', user.authToken);

        case 19:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function fromWatchRequestAuthorizedApiActionData(action) {
  var authToken;
  return regeneratorRuntime.wrap(function fromWatchRequestAuthorizedApiActionData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.call)(getAuthorizationData);

        case 2:
          authToken = _context2.sent;
          _context2.next = 5;
          return (0, _effects.call)(_apis.apiFetch, action.endpoint, (0, _lodash2.default)({
            headers: { Authorization: 'JWT ' + authToken }
          }, action.config));

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

// WATCHES
function watchRequestAuthorizedApiAction() {
  return regeneratorRuntime.wrap(function watchRequestAuthorizedApiAction$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.delegateYield((0, _reduxSaga.takeEvery)(_authorization.REQUEST_AUTHORIZED_API, fromWatchRequestAuthorizedApiActionData), 't0', 1);

        case 1:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}