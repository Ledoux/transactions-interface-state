'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchModalActions = watchModalActions;

var _effects = require('redux-saga/effects');

var _modal = require('../reducers/modal');

var _marked = /*#__PURE__*/regeneratorRuntime.mark(fromWatchCloseModalAction),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(fromWatchShowModalAction),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(watchModalActions);

function fromWatchCloseModalAction(action) {
  return regeneratorRuntime.wrap(function fromWatchCloseModalAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.body.style.overflow = 'scroll';

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function fromWatchShowModalAction(action) {
  return regeneratorRuntime.wrap(function fromWatchShowModalAction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          document.body.style.overflow = 'hidden';

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function watchModalActions() {
  return regeneratorRuntime.wrap(function watchModalActions$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.takeEvery)(_modal.CLOSE_MODAL, fromWatchCloseModalAction);

        case 2:
          _context3.next = 4;
          return (0, _effects.takeEvery)(_modal.SHOW_MODAL, fromWatchShowModalAction);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}