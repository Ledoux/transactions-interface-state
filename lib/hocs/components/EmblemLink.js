'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmblemLink = undefined;

var _reactRedux = require('react-redux');

var EmblemLink = exports.EmblemLink = function EmblemLink(WrappedComponent) {
  return (0, _reactRedux.connect)(function (_ref) {
    var siteLabel = _ref.siteLabel;
    return { siteLabel: siteLabel };
  })(WrappedComponent);
};