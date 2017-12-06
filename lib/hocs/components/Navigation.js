'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Navigation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _navigation = require('../../reducers/navigation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = exports.Navigation = function Navigation(WrappedComponent) {
  var _Navigation = function (_Component) {
    _inherits(_Navigation, _Component);

    function _Navigation() {
      _classCallCheck(this, _Navigation);

      return _possibleConstructorReturn(this, (_Navigation.__proto__ || Object.getPrototypeOf(_Navigation)).apply(this, arguments));
    }

    _createClass(_Navigation, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _props = this.props,
            closeNavigation = _props.closeNavigation,
            isActive = _props.isActive,
            pathname = _props.pathname;

        if (isActive && prevProps.pathname !== pathname) {
          closeNavigation();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return _Navigation;
  }(_react.Component);

  return (0, _reactRedux.connect)(function (_ref) {
    var isActive = _ref.navigation.isActive,
        pathname = _ref.router.location.pathname,
        email = _ref.user.email;
    return { email: email,
      isActive: isActive,
      pathname: pathname
    };
  }, { closeNavigation: _navigation.closeNavigation })(_Navigation);
};