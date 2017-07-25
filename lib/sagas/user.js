'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchSetUser = watchSetUser;
exports.watchSuccessTransactionsModeOrSignAction = watchSuccessTransactionsModeOrSignAction;

var _lodash = require('lodash.values');

var _lodash2 = _interopRequireDefault(_lodash);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _transactionsReduxReselector = require('transactions-redux-reselector');

var _transactionsReduxRequest = require('transactions-redux-request');

var _transactions = require('../reducers/transactions');

var _authorization = require('../reducers/authorization');

var _user = require('../reducers/user');

var _config = require('../utils/config');

var _subscription = require('../utils/subscription');

var _navigation = require('../utils/navigation');

var _socketio = require('../utils/socketio');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [fromWatchSetUserData, fromWatchSuccessTransactionsModeOrSignActionData, watchSetUser, watchSuccessTransactionsModeOrSignAction].map(regeneratorRuntime.mark);

// DATA
function fromWatchSetUserData(action) {
  var _action$user, active, id;

  return regeneratorRuntime.wrap(function fromWatchSetUserData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _action$user = action.user, active = _action$user.active, id = _action$user.id;

          if (!active) {
            _context.next = 5;
            break;
          }

          // say to the socket server that we are connected as a user !
          _socketio.socketio.emit('connect_user', action.user);
          // now we need to get all the joined collections
          // that say more about the user... Is she/he a reviewer, an editor...?
          _context.next = 5;
          return (0, _effects.put)((0, _transactions.requestTransactionsSign)(id));

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function fromWatchSuccessTransactionsModeOrSignActionData(action) {
  var patch, users, userId, idsByModeName, modes, links, _ref, authorization, search, selectedHomeName, automaticHomeMode;

  return regeneratorRuntime.wrap(function fromWatchSuccessTransactionsModeOrSignActionData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(action.type === _transactions.MERGE_NORMALIZER_GET_SIGN)) {
            _context2.next = 18;
            break;
          }

          patch = action.normalizer && action.normalizer.patch;

          if (!patch) {
            _context2.next = 17;
            break;
          }

          users = (0, _lodash2.default)(patch.usersById);

          if (!(users.length === 1)) {
            _context2.next = 14;
            break;
          }

          // we need to set the filter only when we have fetched the users array
          // of the only one user logged!
          userId = users[0].id;
          _context2.next = 8;
          return (0, _effects.put)((0, _transactionsReduxReselector.mergeReselector)({
            WITH_CLAIM_JOIN: {
              userId: userId
            },
            WITH_DEEP_ARTICLE_JOIN: {
              userId: userId
            },
            WITH_FAST_ARTICLE_JOIN: {
              userId: userId
            },
            WITH_UNIQ_USER_JOIN: {
              userId: userId
            }
          }));

        case 8:
          // set in the state the joins
          idsByModeName = {};

          Object.keys(patch).forEach(function (collectionKey) {
            var collection = patch[collectionKey];
            var ids = Object.keys(collection);
            if (ids.length === 1) {
              var collectionName = collectionKey.slice(0, -4);
              // don't set for the user mode, just to the other modes
              if (collectionName !== 'users') {
                var entityName = (0, _pluralize2.default)(collectionName, 1);
                idsByModeName[entityName] = ids[0];
              }
            }
          });
          _context2.next = 12;
          return (0, _effects.put)((0, _authorization.setAuthorizationIdsByModeName)(idsByModeName));

        case 12:
          _context2.next = 15;
          break;

        case 14:
          console.warn('After MERGE_NORMALIZER_GET_SIGN we did not get again\n        the logged active user', action);

        case 15:
          _context2.next = 18;
          break;

        case 17:
          console.warn('there should be a patch here to determine if we have\n        merged the logged user', action);

        case 18:
          _context2.next = 20;
          return (0, _effects.select)(_authorization.getNewAuthorizedModes);

        case 20:
          modes = _context2.sent;
          links = (0, _navigation.getAuthorizedLinks)(modes);
          _context2.next = 24;
          return (0, _effects.put)((0, _authorization.setAuthorizationLinks)(links, modes));

        case 24:
          _context2.next = 26;
          return (0, _effects.select)(function (state) {
            return state;
          });

        case 26:
          _ref = _context2.sent;
          authorization = _ref.authorization;
          search = (0, _navigation.getLocationSearch)(window.location.search);

          if (authorization.selectedModeName) {
            _context2.next = 35;
            break;
          }

          selectedHomeName = search.selectedHomeName || authorization.automaticHomeName;
          automaticHomeMode = modes.find(function (mode) {
            return mode.homeName === selectedHomeName;
          });

          if (!automaticHomeMode) {
            _context2.next = 35;
            break;
          }

          _context2.next = 35;
          return (0, _effects.put)((0, _authorization.setAuthorizationSelectedMode)(automaticHomeMode));

        case 35:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

// WATCHES
function watchSetUser() {
  return regeneratorRuntime.wrap(function watchSetUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (_config.IS_UNDER_CONSTRUCTION) {
            _context3.next = 2;
            break;
          }

          return _context3.delegateYield((0, _reduxSaga.takeEvery)(_user.SET_USER, fromWatchSetUserData), 't0', 2);

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function watchSuccessTransactionsModeOrSignAction() {
  return regeneratorRuntime.wrap(function watchSuccessTransactionsModeOrSignAction$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.delegateYield((0, _reduxSaga.takeEvery)(function (action) {
            return (0, _transactionsReduxRequest.isSuccessTransactionsAction)(action) && action.tag === 'mode' || action.type === _transactions.MERGE_NORMALIZER_GET_SIGN;
          }, fromWatchSuccessTransactionsModeOrSignActionData), 't0', 1);

        case 1:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}