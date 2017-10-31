'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxRequest = require('transactions-redux-request');

var _modal = require('../../reducers/modal');

var _viewer = require('../../reducers/viewer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var Footer = exports.Footer = function Footer(WrappedComponent) {
  var _Footer = function (_Component) {
    _inherits(_Footer, _Component);

    function _Footer() {
      _classCallCheck(this, _Footer);

      var _this = _possibleConstructorReturn(this, (_Footer.__proto__ || Object.getPrototypeOf(_Footer)).call(this));

      _this.onSubscribeClick = _this._onSubscribeClick.bind(_this);
      return _this;
    }

    _createClass(_Footer, [{
      key: '_onSubscribeClick',
      value: function _onSubscribeClick(email) {
        var _props = this.props,
            ConfirmationComponent = _props.ConfirmationComponent,
            confirmationSubtext = _props.confirmationSubtext,
            confirmationText = _props.confirmationText,
            request = _props.request,
            showModal = _props.showModal,
            WarningComponent = _props.WarningComponent,
            warningSubtext = _props.warningSubtext,
            warningText = _props.warningText;

        if (mailTest.test(email)) {
          // request
          request('POST', [{
            collectionName: 'subscribers',
            documents: [{ email: email }]
          }], { tag: 'subscribers' });
          // modal
          ConfirmationComponent && showModal(_react2.default.createElement(ConfirmationComponent, { subtext: confirmationSubtext,
            text: confirmationText }), { isCtaCloseButton: true });
        } else {
          // modal
          WarningComponent && showModal(_react2.default.createElement(WarningComponent, { subtext: warningSubtext,
            text: warningText }));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          onSubscribeClick: this.onSubscribeClick }));
      }
    }]);

    return _Footer;
  }(_react.Component);

  _Footer.defaultProps = { confirmationSubtext: 'We will keep you informed about the next updates!',
    confirmationText: 'Thanks a lot!',
    warningSubtext: 'You need to enter a valid email',
    warningText: 'Wrong shape!'
  };
  return (0, _reactRedux.connect)(function (state, _ref) {
    var newsletterModal = _ref.newsletterModal;
    return {
      ConfirmationComponent: (0, _viewer.getViewerComponent)(state, 'modal', 'confirmation'),
      WarningComponent: (0, _viewer.getViewerComponent)(state, 'modal', 'warning')
    };
  }, { request: _transactionsReduxRequest.request,
    showModal: _modal.showModal
  })(_Footer);
};