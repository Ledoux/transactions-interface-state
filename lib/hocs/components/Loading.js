'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = undefined;

var _reactRedux = require('react-redux');

var Loading = exports.Loading = function Loading(WrappedComponent) {
  function mapStateToProps(_ref) {
    var isActive = _ref.loading.isActive;

    return { isActive: isActive };
  }
  return (0, _reactRedux.connect)(mapStateToProps)(WrappedComponent);
};