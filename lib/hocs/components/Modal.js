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

var _modal = require('../../reducers/modal');

var _location = require('../../utils/location');

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
        var _props2 = this.props,
            closeModal = _props2.closeModal,
            nextLocation = _props2.nextLocation;

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

  _Modal.defaultProps = {
    search: {}
  };
  _Modal.PropTypes = {
    isActive: _propTypes2.default.bool.isRequired,
    beforeCloseModal: _propTypes2.default.func.isRequired,
    closeModal: _propTypes2.default.func.isRequired,
    content: _propTypes2.default.node
  };
  var mapStateToProps = function mapStateToProps(_ref) {
    var _ref$modal = _ref.modal,
        beforeCloseModal = _ref$modal.beforeCloseModal,
        content = _ref$modal.content,
        isActive = _ref$modal.isActive,
        isCtaCloseButton = _ref$modal.isCtaCloseButton,
        isCornerCloseButton = _ref$modal.isCornerCloseButton,
        isOutCloseButton = _ref$modal.isOutCloseButton,
        modalViewer = _ref.modalViewer,
        search = _ref.search;

    var SearchComponent = search.modal && modalViewer[search.modal];
    return { beforeCloseModal: beforeCloseModal,
      content: content,
      isActive: isActive,
      isCtaCloseButton: isCtaCloseButton,
      isCornerCloseButton: isCornerCloseButton,
      isOutCloseButton: isOutCloseButton,
      modalViewer: modalViewer,
      search: SearchComponent && search,
      SearchComponent: SearchComponent
    };
  };
  return (0, _reactRedux.connect)(mapStateToProps, { closeModal: _modal.closeModal,
    showModal: _modal.showModal
  })(_Modal);
};