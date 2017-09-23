'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromWatchTransactionFails = fromWatchTransactionFails;
exports.watchTransactionFails = watchTransactionFails;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _modal = require('../reducers/modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(fromWatchTransactionFails),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watchTransactionFails);

// DATA
function fromWatchTransactionFails(_ref) {
  var method = _ref.method,
      error = _ref.error,
      tag = _ref.tag;
  var isModalActive, ModalComponent;
  return regeneratorRuntime.wrap(function fromWatchTransactionFails$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!error) {
            _context.next = 12;
            break;
          }

          _context.next = 3;
          return (0, _effects.select)(function (_ref2) {
            var isActive = _ref2.modal.isActive;
            return isActive;
          });

        case 3:
          isModalActive = _context.sent;

          if (isModalActive) {
            _context.next = 12;
            break;
          }

          _context.next = 7;
          return (0, _effects.select)(function (_ref3) {
            var warning = _ref3.modalViewer.warning;
            return warning;
          });

        case 7:
          ModalComponent = _context.sent;

          if (ModalComponent) {
            _context.next = 10;
            break;
          }

          return _context.abrupt('return');

        case 10:
          _context.next = 12;
          return (0, _effects.put)((0, _modal.showModal)(_react2.default.createElement(ModalComponent, {
            icon: 'warning',
            subtext: error,
            text: 'Error with a "' + method + ' ' + (tag || '') + '" request'
          })));

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

// WATCHER
function watchTransactionFails() {
  return regeneratorRuntime.wrap(function watchTransactionFails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.delegateYield((0, _reduxSaga.takeEvery)(function (_ref4) {
            var type = _ref4.type;
            return (/FAIL_TRANSACTIONS_(.*)/.test(type)
            );
          }, fromWatchTransactionFails), 't0', 1);

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}