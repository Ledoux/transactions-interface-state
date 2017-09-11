'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = undefined;

var _reactRedux = require('react-redux');

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

var Avatar = exports.Avatar = function Avatar(WrappedComponent) {
  function mapStateToProps(state, _ref) {
    var id = _ref.id,
        imageUrl = _ref.imageUrl;

    if (!imageUrl) {
      var user = (0, _transactionsReduxNormalizer.getNormalizerEntity)(state, 'users', id);
      return {
        imageUrl: user && user.imageUrl
      };
    }
    return {};
  }
  return (0, _reactRedux.connect)(mapStateToProps)(WrappedComponent);
};