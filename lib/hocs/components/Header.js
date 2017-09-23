'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withoutSigninPaths = ['/signin', '/signup'];

var Header = exports.Header = function Header(WrappedComponent) {
  var _Header = function (_Component) {
    _inherits(_Header, _Component);

    function _Header() {
      _classCallCheck(this, _Header);

      var _this = _possibleConstructorReturn(this, (_Header.__proto__ || Object.getPrototypeOf(_Header)).call(this));

      _this.state = { visibleLinks: null };
      _this.handleFilterVisibleLinks = _this._handleSetVisibleLinks.bind(_this);
      return _this;
    }

    _createClass(_Header, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.handleFilterVisibleLinks(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.handleFilterVisibleLinks(nextProps);
      }
    }, {
      key: '_handleSetVisibleLinks',
      value: function _handleSetVisibleLinks(props) {
        var menuLinks = props.menuLinks;

        menuLinks && this.setState({ visibleLinks: menuLinks.filter(function (_ref) {
            var getIsVisible = _ref.getIsVisible;
            return !getIsVisible || getIsVisible(props);
          }) });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          state: this.state }));
      }
    }]);

    return _Header;
  }(_react.Component);

  _Header.defaultProps = {
    menuLinks: [],
    siteName: 'Transactions'
  };
  function mapStateToProps(_ref2) {
    var authorization = _ref2.authorization,
        pathname = _ref2.router.location.pathname,
        user = _ref2.user;

    var newState = { isSigninPage: withoutSigninPaths.includes(pathname),
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
  }

  return (0, _reactRedux.connect)(mapStateToProps)(_Header);
};