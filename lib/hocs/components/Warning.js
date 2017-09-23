'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warning = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _modal = require('../../reducers/modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Warning = exports.Warning = function Warning(WrappedComponent) {
  var _Warning = function (_Component) {
    _inherits(_Warning, _Component);

    function _Warning() {
      _classCallCheck(this, _Warning);

      var _this = _possibleConstructorReturn(this, (_Warning.__proto__ || Object.getPrototypeOf(_Warning)).call(this));

      _this.onYesClick = _this._onYesClick.bind(_this);
      return _this;
    }

    _createClass(_Warning, [{
      key: '_onYesClick',
      value: function _onYesClick() {
        var _props = this.props,
            beforeCloseModal = _props.beforeCloseModal,
            closeModal = _props.closeModal,
            nextLocation = _props.nextLocation,
            nextPathname = _props.nextPathname,
            nextSearch = _props.nextSearch,
            push = _props.push;

        beforeCloseModal && beforeCloseModal();
        closeModal();
        if (nextLocation) {
          push(nextLocation);
        } else {
          var possibleNextLocation = {};
          if (nextSearch) {
            possibleNextLocation.search = nextSearch;
          }
          if (nextPathname) {
            possibleNextLocation.pathname = nextPathname;
          }
          if (Object.keys(possibleNextLocation).length > 0) {
            push(possibleNextLocation);
          }
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          onYesClick: this.onYesClick }));
      }
    }]);

    return _Warning;
  }(_react.Component);

  function mapStateToProps(_ref) {
    var _ref$modal = _ref.modal,
        beforeCloseModal = _ref$modal.beforeCloseModal,
        isActive = _ref$modal.isActive;

    return { beforeCloseModal: beforeCloseModal,
      isModalActive: isActive
    };
  }
  return (0, _reactRedux.connect)(mapStateToProps, { closeModal: _modal.closeModal,
    push: _reactRouterRedux.push
  })(_Warning);
};