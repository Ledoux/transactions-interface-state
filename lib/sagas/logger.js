'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchAllActions = watchAllActions;

var _reduxSaga = require('redux-saga');

var _marked = /*#__PURE__*/regeneratorRuntime.mark(logData),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watchAllActions);

// DATA
function logData(action) {
  return regeneratorRuntime.wrap(function logData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(action.type, action);

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

// WATCHER
function watchAllActions() {
  return regeneratorRuntime.wrap(function watchAllActions$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.delegateYield((0, _reduxSaga.takeEvery)(function () {
            return true;
          }, logData), 't0', 1);

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}