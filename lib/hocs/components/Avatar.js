'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = undefined;

var _reactRedux = require('react-redux');

var _transactionsReduxReact = require('transactions-redux-react');

var Avatar = exports.Avatar = function Avatar(WrappedComponent) {
  function mapStateToProps(state, _ref) {
    var id = _ref.id,
        imageUrl = _ref.imageUrl;

    if (!imageUrl) {
      var user = (0, _transactionsReduxReact.getNormalizerEntity)(state, 'users', id);
      return {
        imageUrl: user && user.imageUrl
      };
    }
    return {};
  }
  return (0, _reactRedux.connect)(mapStateToProps)(WrappedComponent);
};