'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transactionsReduxRequest = require('transactions-redux-request');

var _authorization = require('./authorization');

var _config = require('../utils/config');

// create the watches
var config = {
  getAuthorizationData: _authorization.getAuthorizationData
};
if (_config.IS_PROD) {
  config.logger = null;
}
var transactionsSaga = (0, _transactionsReduxRequest.createTransactionsSaga)(config);
exports.default = transactionsSaga;