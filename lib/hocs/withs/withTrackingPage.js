'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTrackingPage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withTrackingPage = exports.withTrackingPage = function withTrackingPage(WrappedComponent) {
  var _withTrackingPage = function (_Component) {
    _inherits(_withTrackingPage, _Component);

    function _withTrackingPage() {
      _classCallCheck(this, _withTrackingPage);

      return _possibleConstructorReturn(this, (_withTrackingPage.__proto__ || Object.getPrototypeOf(_withTrackingPage)).apply(this, arguments));
    }

    _createClass(_withTrackingPage, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(_ref) {
        var trackPage = _ref.trackPage,
            pathname = _ref.pathname;

        if (pathname !== this.props.pathname) {
          trackPage();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return _withTrackingPage;
  }(_react.Component);

  return (0, _reactRedux.connect)(function (_ref2) {
    var pathname = _ref2.router.location.pathname,
        trackPage = _ref2.tracking.trackPage;
    return { pathname: pathname, trackPage: trackPage };
  })(_withTrackingPage);
};