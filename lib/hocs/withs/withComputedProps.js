'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withComputedProps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reselect = require('reselect');

var _reselect2 = _interopRequireDefault(_reselect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withComputedProps = exports.withComputedProps = function withComputedProps(patch) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (WrappedComponent) {
    var isOnlyMount = config.isOnlyMount;

    var _withComputedProps = function (_Component) {
      _inherits(_withComputedProps, _Component);

      function _withComputedProps(props) {
        _classCallCheck(this, _withComputedProps);

        var _this = _possibleConstructorReturn(this, (_withComputedProps.__proto__ || Object.getPrototypeOf(_withComputedProps)).call(this, props));

        _this.compute = _this._compute.bind(_this);
        return _this;
      }

      _createClass(_withComputedProps, [{
        key: '_compute',
        value: function _compute(props) {
          // init
          var newState = {};
          // compute each value for each key
          // (best practice here is to use reselect methods as value)
          Object.keys(patch).forEach(function (key) {
            newState[key] = patch[key](props);
          });
          this.setState(newState);
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.compute(this.props);
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (!isOnlyMount) {
            this.compute(nextProps);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state));
        }
      }]);

      return _withComputedProps;
    }(_react.Component);

    return _withComputedProps;
  };
};