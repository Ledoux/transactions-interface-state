'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

// automatic packager
var reducerPackage = (0, _transactionsReduxNormalizer.getReducerPackage)('pipeline');

// export
exports.default = reducerPackage;