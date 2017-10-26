'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withDefaultProps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withDefaultProps = exports.withDefaultProps = function withDefaultProps(defaultProps) {
  return function (WrappedComponent) {
    var _withDefaultProps = function (_Component) {
      _inherits(_withDefaultProps, _Component);

      function _withDefaultProps() {
        _classCallCheck(this, _withDefaultProps);

        return _possibleConstructorReturn(this, (_withDefaultProps.__proto__ || Object.getPrototypeOf(_withDefaultProps)).apply(this, arguments));
      }

      _createClass(_withDefaultProps, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, defaultProps, this.props));
        }
      }]);

      return _withDefaultProps;
    }(_react.Component);

    return _withDefaultProps;
  };
};