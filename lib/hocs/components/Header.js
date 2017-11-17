'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = undefined;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _transactionsReduxReact = require('transactions-redux-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withoutSigninPaths = ['/signin', '/signup'];

var Header = exports.Header = (0, _redux.compose)((0, _reactRedux.connect)(function (_ref) {
  var authorization = _ref.authorization,
      pathname = _ref.router.location.pathname,
      pageName = _ref.setup.params.pageName,
      user = _ref.user;

  var newState = { isSigninPage: withoutSigninPaths.includes(pathname),
    pageName: pageName,
    pathname: pathname
  };
  if (authorization) {
    var visibleModes = authorization.visibleModes;

    Object.assign(newState, { visibleModes: visibleModes });
  }
  if (user) {
    var active = user.active,
        firstName = user.firstName,
        id = user.id,
        imageUrl = user.imageUrl;

    Object.assign(newState, { active: active,
      firstName: firstName,
      id: id,
      imageUrl: imageUrl
    });
  }
  return newState;
}), (0, _transactionsReduxReact.withComputedProps)({
  visibleLinks: function visibleLinks(props) {
    return props.menuLinks && props.menuLinks.filter(function (_ref2) {
      var getIsVisible = _ref2.getIsVisible;
      return !getIsVisible || getIsVisible(props);
    });
  }
}));