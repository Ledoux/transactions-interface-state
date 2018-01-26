'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Go = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Go = exports.Go = function Go(WrappedComponent) {
  var _Go = function (_Component) {
    _inherits(_Go, _Component);

    function _Go() {
      _classCallCheck(this, _Go);

      var _this = _possibleConstructorReturn(this, (_Go.__proto__ || Object.getPrototypeOf(_Go)).call(this));

      _this.onBackClick = _this._onBackClick.bind(_this);
      _this.onForwardClick = _this._onForwardClick.bind(_this);
      return _this;
    }

    _createClass(_Go, [{
      key: '_onBackClick',
      value: function _onBackClick() {
        this.props.goBack();
        // this.props.push('/home')
      }
    }, {
      key: '_onForwardClick',
      value: function _onForwardClick() {
        this.props.goForward();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          onBackClick: this.onBackClick,
          onForwardClick: this.onForwardClick
        }));
      }
    }]);

    return _Go;
  }(_react.Component);

  return (0, _reactRedux.connect)(function (_ref) {
    var pathnames = _ref.router.pathnames;
    return { isBack: true,
      isForward: true };
  }, { goBack: _reactRouterRedux.goBack, goForward: _reactRouterRedux.goForward, push: _reactRouterRedux.push })(_Go);
};