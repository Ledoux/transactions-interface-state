'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = undefined;

var _reactRedux = require('react-redux');

var Loading = exports.Loading = (0, _reactRedux.connect)(function (state, ownProps) {
  return {
    isActive: state.loading.isActive && ownProps.tag === state.loading.tag
  };
});