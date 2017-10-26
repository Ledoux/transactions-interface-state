'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stream = undefined;

var _entities = require('../withs/entities');

var Stream = exports.Stream = function Stream(WrappedComponent) {
  return (0, _entities.withEntities)('entities')(WrappedComponent);
};