'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fetcher = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsReduxRequest = require('transactions-redux-request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fetcher = exports.Fetcher = function Fetcher(WrappedComponent) {
  var _Fetcher = function (_Component) {
    _inherits(_Fetcher, _Component);

    function _Fetcher(props) {
      var _JSON$stringify;

      _classCallCheck(this, _Fetcher);

      var _this = _possibleConstructorReturn(this, (_Fetcher.__proto__ || Object.getPrototypeOf(_Fetcher)).call(this, props));

      _this.state = { selectedCollectionName: 'links',
        queryString: JSON.stringify((_JSON$stringify = {}, _defineProperty(_JSON$stringify, _transactionsReduxRequest.IS_ALL_DEEP_JOINS, true), _defineProperty(_JSON$stringify, _transactionsReduxRequest.IS_ALL_JOINS, true), _defineProperty(_JSON$stringify, _transactionsReduxRequest.LIMIT, 1), _JSON$stringify), null, 2)
      };
      _this.onCollectionNameChange = _this._onCollectionNameChange.bind(_this);
      _this.onQueryStringChange = _this._onQueryStringChange.bind(_this);
      return _this;
    }

    _createClass(_Fetcher, [{
      key: '_onCollectionNameChange',
      value: function _onCollectionNameChange() {
        this.setState({ selectedCollectionName: event.target.value });
      }
    }, {
      key: '_onQueryStringChange',
      value: function _onQueryStringChange() {
        this.setState({ queryString: event.target.value });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
          onCollectionNameChange: this.onCollectionNameChange,
          onQueryStringChange: this.onQueryStringChange }));
      }
    }]);

    return _Fetcher;
  }(_react.Component);

  return _Fetcher;
};