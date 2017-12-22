'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxReact = require('transactions-redux-react');

var _modal = require('../../reducers/modal');

var _viewer = require('../../reducers/viewer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = exports.Modal = function Modal(WrappedComponent) {
  var _Modal = function (_Component) {
    _inherits(_Modal, _Component);

    function _Modal() {
      _classCallCheck(this, _Modal);

      var _this = _possibleConstructorReturn(this, (_Modal.__proto__ || Object.getPrototypeOf(_Modal)).call(this));

      _this.handleNavigation = _this._handleNavigation.bind(_this);
      _this.onCloseClick = _this._onCloseClick.bind(_this);
      return _this;
    }

    _createClass(_Modal, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.handleNavigation();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.SearchComponent !== prevProps.SearchComponent) {
          this.handleNavigation();
        }
      }
    }, {
      key: '_handleNavigation',
      value: function _handleNavigation() {
        var _props = this.props,
            search = _props.search,
            SearchComponent = _props.SearchComponent,
            showModal = _props.showModal;

        if (SearchComponent) {
          showModal(_react2.default.createElement(SearchComponent, search));
        }
      }
    }, {
      key: '_onCloseClick',
      value: function _onCloseClick() {
        var closeModal = this.props.closeModal;

        closeModal();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          onCloseClick: this.onCloseClick }));
      }
    }]);

    return _Modal;
  }(_react.Component);

  _Modal.propTypes = {
    isActive: _propTypes2.default.bool.isRequired,
    beforeCloseModal: _propTypes2.default.func,
    closeModal: _propTypes2.default.func.isRequired,
    content: _propTypes2.default.node
  };
  return (0, _reactRedux.connect)(function (state) {
    var _state$modal = state.modal,
        beforeCloseModal = _state$modal.beforeCloseModal,
        content = _state$modal.content,
        isActive = _state$modal.isActive,
        isCtaCloseButton = _state$modal.isCtaCloseButton,
        isCornerCloseButton = _state$modal.isCornerCloseButton,
        isOutCloseButton = _state$modal.isOutCloseButton,
        search = state.router.search;

    var SearchComponent = search.modal && (0, _viewer.getViewerComponent)(state, 'modal', search.modal);
    return { beforeCloseModal: beforeCloseModal,
      content: content,
      isActive: isActive,
      isCtaCloseButton: isCtaCloseButton,
      isCornerCloseButton: isCornerCloseButton,
      isOutCloseButton: isOutCloseButton,
      search: SearchComponent && search,
      SearchComponent: SearchComponent
    };
  }, { closeModal: _modal.closeModal, showModal: _modal.showModal })(_Modal);
};