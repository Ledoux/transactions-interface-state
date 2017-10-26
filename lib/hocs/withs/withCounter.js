'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCounter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withCounter = exports.withCounter = function withCounter(arrayKey) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (WrappedComponent) {
    var isLoop = typeof config.isLoop !== 'undefined' ? config.isLoop : true;

    var _withCounter = function (_Component) {
      _inherits(_withCounter, _Component);

      function _withCounter() {
        _classCallCheck(this, _withCounter);

        var _this = _possibleConstructorReturn(this, (_withCounter.__proto__ || Object.getPrototypeOf(_withCounter)).call(this));

        _this.state = { selectedIndex: null };
        _this.handleSetInterval = _this._handleSetInterval.bind(_this);
        return _this;
      }

      _createClass(_withCounter, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.handleSetInterval(this.props);
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          (!this.countInterval || nextProps.intervalTime !== this.props.intervalTime) && this.handleSetInterval(nextProps);
        }
      }, {
        key: '_handleSetInterval',
        value: function _handleSetInterval(props) {
          var _this2 = this;

          var array = props[arrayKey];
          if (!array || array.length === 0) {
            return;
          }
          if (this.state.selectedIndex === null) {
            this.setState({ selectedIndex: 0 });
          }
          this.countInterval = setInterval(function () {
            var selectedIndex = _this2.state.selectedIndex;

            if (selectedIndex === array.length - 1) {
              if (isLoop) {
                _this2.setState({ selectedIndex: 0 });
              } else {
                clearInterval(_this2.countInterval);
                _this2.setState({ selectedIndex: null });
              }
            } else {
              _this2.setState({ selectedIndex: selectedIndex + 1 });
            }
          }, props.intervalTime);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.countInterval && clearInterval(this.countInterval);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state));
        }
      }]);

      return _withCounter;
    }(_react.Component);

    return _withCounter;
  };
};