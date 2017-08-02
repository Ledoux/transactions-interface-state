'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchSetUser = watchSetUser;
exports.watchMergeNormalizerGetSignAction = watchMergeNormalizerGetSignAction;

var _lodash = require('lodash.values');

var _lodash2 = _interopRequireDefault(_lodash);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _transactionsReduxReselector = require('transactions-redux-reselector');

var _transactionsReduxRequest = require('transactions-redux-request');

var _authorization = require('../reducers/authorization');

var _user = require('../reducers/user');

var _config = require('../utils/config');

var _linking = require('../utils/linking');

var _location = require('../utils/location');

var _socketio = require('../utils/socketio');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [fromWatchSetUserData, fromWatchMergeNormalizerGetSignActionData, watchSetUser, watchMergeNormalizerGetSignAction].map(regeneratorRuntime.mark);

// DATA
function fromWatchSetUserData(action) {
  var _action$user, active, id;

  return regeneratorRuntime.wrap(function fromWatchSetUserData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _action$user = action.user, active = _action$user.active, id = _action$user.id;

          if (!(!action.config || !action.config.requestTransactions)) {
            _context.next = 4;
            break;
          }

          console.warn('transactions-interface-state fromWatchSetUserData, you need to pass a requestTransactions in your action');
          return _context.abrupt('return');

        case 4:
          if (!active) {
            _context.next = 8;
            break;
          }

          // say to the socket server that we are connected as a user !
          _socketio.socketio.emit('connect_user', action.user);
          // now we need to get all the joined collections
          // that say more about the user... Is she/he a reviewer, an editor...?
          _context.next = 8;
          return (0, _effects.put)(action.config.requestTransactions('GET', [{
            collectionName: 'users',
            query: { id: id }
          }], {
            tag: 'sign'
          }));

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function fromWatchMergeNormalizerGetSignActionData(action) {
  var patch, users, userId, idsByModeName, modes, links;
  return regeneratorRuntime.wrap(function fromWatchMergeNormalizerGetSignActionData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // retrieving the authorized modes needs
          // to use the state that will look at several reducer states:
          // first the user one to look at admin
          // second if the normalizer to see all the joined collection
          // if they have at least one associated good userId
          // and this is only possible if we have set also the filter
          patch = action.normalizer && action.normalizer.patch;

          if (!patch) {
            _context2.next = 16;
            break;
          }

          users = (0, _lodash2.default)(patch.usersById);

          if (!(users.length === 1)) {
            _context2.next = 13;
            break;
          }

          // we need to set the filter only when we have fetched the users array
          // of the only one user logged!
          userId = users[0].id;
          _context2.next = 7;
          return (0, _effects.put)((0, _transactionsReduxReselector.mergeReselector)({
            WITH_UNIQ_USER_JOIN: {
              userId: userId
            }
          }));

        case 7:
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
          _context2.next = 11;
          return (0, _effects.put)((0, _authorization.setAuthorizationIdsByModeName)(idsByModeName));

        case 11:
          _context2.next = 14;
          break;

        case 13:
          console.warn('After MERGE_NORMALIZER_GET_SIGN we did not get again\n      the logged active user', action);

        case 14:
          _context2.next = 17;
          break;

        case 16:
          console.warn('there should be a patch here to determine if we have\n      merged the logged user', action);

        case 17:
          _context2.next = 19;
          return (0, _effects.select)(_authorization.getNewAuthorizedModes);

        case 19:
          modes = _context2.sent;
          links = (0, _linking.getAuthorizedLinks)(modes);
          _context2.next = 23;
          return (0, _effects.put)((0, _authorization.setAuthorizationLinks)(links, modes));

        case 23:
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

function watchMergeNormalizerGetSignAction() {
  return regeneratorRuntime.wrap(function watchMergeNormalizerGetSignAction$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.delegateYield((0, _reduxSaga.takeEvery)(function (action) {
            return action.type === 'MERGE_NORMALIZER_GET_SIGN';
          }, fromWatchMergeNormalizerGetSignActionData), 't0', 1);

        case 1:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}