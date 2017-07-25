'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchRequestFormPutAction = watchRequestFormPutAction;

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _marked = [fromWatchRequestFormPutActionData, watchRequestFormPutAction].map(regeneratorRuntime.mark);

var _require$default = require('../reducers/form').default,
    getFormPutOptions = _require$default.getFormPutOptions,
    REQUEST_FORM_PUT = _require$default.REQUEST_FORM_PUT,
    resetForm = _require$default.resetForm;

function fromWatchRequestFormPutActionData() {
  var formPutOptions;
  return regeneratorRuntime.wrap(function fromWatchRequestFormPutActionData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(getFormPutOptions);

        case 2:
          formPutOptions = _context.sent;

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

// WATCHES
function watchRequestFormPutAction() {
  return regeneratorRuntime.wrap(function watchRequestFormPutAction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.delegateYield((0, _reduxSaga.takeEvery)(REQUEST_FORM_PUT, fromWatchRequestFormPutActionData), 't0', 1);

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}