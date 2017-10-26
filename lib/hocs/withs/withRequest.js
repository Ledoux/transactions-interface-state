'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRequest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxRequest = require('transactions-redux-request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withRequest = exports.withRequest = function withRequest(onKeys, getRequestArgs) {
  return function (WrappedComponent) {
    var _withRequest = function (_Component) {
      _inherits(_withRequest, _Component);

      function _withRequest(props) {
        _classCallCheck(this, _withRequest);

        var _this = _possibleConstructorReturn(this, (_withRequest.__proto__ || Object.getPrototypeOf(_withRequest)).call(this, props));

        _this.handleRequest = _this._handleRequest.bind(_this);
        if (onKeys.some(function (onKey) {
          return props[onKey];
        })) {
          _this.handleRequest(props);
        }
        return _this;
      }

      _createClass(_withRequest, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var _this2 = this;

          if (onKeys.some(function (onKey) {
            var nextValue = nextProps[onKey];
            return nextValue && nextValue !== _this2.props[onKey];
          })) {
            this.handleRequest(nextProps);
          }
        }
      }, {
        key: '_handleRequest',
        value: function _handleRequest(props) {
          var requestArgs = getRequestArgs(props);
          props.request.apply(props, _toConsumableArray(requestArgs));
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return _withRequest;
    }(_react.Component);

    return (0, _reactRedux.connect)(null, { request: _transactionsReduxRequest.request })(_withRequest);
  };
};