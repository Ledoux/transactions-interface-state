'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withReplacedProps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withReplacedProps = exports.withReplacedProps = function withReplacedProps(patch) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (WrappedComponent) {
    var isOnlyMount = config.isOnlyMount;

    var _withReplacedProps = function (_Component) {
      _inherits(_withReplacedProps, _Component);

      function _withReplacedProps(props) {
        _classCallCheck(this, _withReplacedProps);

        var _this = _possibleConstructorReturn(this, (_withReplacedProps.__proto__ || Object.getPrototypeOf(_withReplacedProps)).call(this, props));

        _this.replace = _this._replace.bind(_this);
        return _this;
      }

      _createClass(_withReplacedProps, [{
        key: '_replace',
        value: function _replace(props, prevProps) {
          // init
          var newState = {};
          // parse to see which props has changed compared to the previous ones
          // (given shallow equality rule)
          // if there is a change then feed the new state with the new computed values
          Object.keys(patch).forEach(function (key) {
            var value = props[key];
            if (!prevProps || value !== prevProps[key]) {
              var method = patch[key];
              newState[key] = method(props);
            }
          });
          // now check that there is one change at least
          if (Object.keys(newState).length > 0) {
            this.setState(newState);
          }
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.replace(this.props);
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (!isOnlyMount) {
            this.replace(nextProps, this.props);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state));
        }
      }]);

      return _withReplacedProps;
    }(_react.Component);

    return _withReplacedProps;
  };
};