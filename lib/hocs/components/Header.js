'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = exports.withoutSignPageNames = undefined;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _redux = require('redux');

var _transactionsReduxReact = require('transactions-redux-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withoutSignPageNames = exports.withoutSignPageNames = ['/signin', '/signup'];

var Header = exports.Header = (0, _redux.compose)(_reactRouter.withRouter, (0, _reactRedux.connect)(function (_ref, _ref2) {
  var authorization = _ref.authorization,
      menuLinks = _ref.navigation.menuLinks,
      user = _ref.user;
  var pageName = _ref2.match.params.pageName;

  var newState = { isSigninPage: withoutSignPageNames.includes(pageName),
    menuLinks: menuLinks,
    pageName: pageName
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
    return props.menuLinks && props.menuLinks.filter(function (_ref3) {
      var getIsVisible = _ref3.getIsVisible;
      return !getIsVisible || getIsVisible(props);
    });
  }
}));