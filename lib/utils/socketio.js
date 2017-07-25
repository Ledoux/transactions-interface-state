'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketio = undefined;

var _transactionsReduxSocketio = require('transactions-redux-socketio');

var _getClient = (0, _transactionsReduxSocketio.getClient)();

var socketio = _getClient.socketio;
exports.socketio = socketio;