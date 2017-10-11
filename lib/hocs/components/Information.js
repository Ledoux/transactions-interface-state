'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Information = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsInterfaceState = require('transactions-interface-state');

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

var _transactionsReduxRequest = require('transactions-redux-request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Information = exports.Information = function Information(WrappedComponent) {
  var _Information = function (_Component) {
    _inherits(_Information, _Component);

    function _Information() {
      _classCallCheck(this, _Information);

      var _this = _possibleConstructorReturn(this, (_Information.__proto__ || Object.getPrototypeOf(_Information)).call(this));

      _this.state = { hasRequestedOnce: false };
      return _this;
    }

    _createClass(_Information, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _props = this.props,
            request = _props.request,
            userId = _props.userId;
        var hasRequestedOnce = this.state.hasRequestedOnce;

        if (userId && !hasRequestedOnce) {
          this.setState({ hasRequestedOnce: true });
          /*
          request('GET', [{
            collectionName: 'notifications',
            query: { userId },
          }], { tag: 'notifications' })
          */
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _props2 = this.props,
            closeInformation = _props2.closeInformation,
            currentTourUser = _props2.currentTourUser,
            isActive = _props2.isActive,
            pathname = _props2.pathname,
            request = _props2.request,
            notSeenNotifications = _props2.notSeenNotifications,
            userId = _props2.userId;
        // when we close the information menu
        // we can set to seen the previous unseen notifications

        if (prevProps.isActive && !isActive) {
          if (currentTourUser) {
            var entities = notSeenNotifications.map(function (notSeenNotification) {
              return {
                id: notSeenNotification.id,
                isSeen: true
              };
            });
            (0, _transactionsReduxNormalizer.mergeNormalizerEntities)('notifications', entities);
          } else if (notSeenNotifications.length > 0) {
            request('PUT', [{ collectionName: 'notifications',
              query: {
                isSeen: false,
                userId: userId
              },
              update: { isSeen: true }
            }], { tag: 'notifications' });
          }
        } else if (isActive && prevProps.pathname !== pathname) {
          closeInformation();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return _Information;
  }(_react.Component);

  var mapStateToProps = function mapStateToProps(state) {
    var isActive = state.information.isActive,
        reselect = state.reselector.reselect,
        pathname = state.router.location.pathname,
        currentTourUser = state.tour.currentTourUser,
        id = state.user.id;

    var notifications = (0, _transactionsReduxNormalizer.getNormalizerEntities)(state, 'notifications');
    var notSeenNotifications = reselect(state, 'WITH_NOT_IS_SEEN', 'notifications');
    return { isActive: isActive,
      currentTourUser: currentTourUser,
      notifications: notifications,
      notSeenNotifications: notSeenNotifications,
      pathname: pathname,
      userId: id
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, { closeInformation: _transactionsInterfaceState.closeInformation,
    mergeNormalizerEntities: _transactionsReduxNormalizer.mergeNormalizerEntities,
    request: _transactionsReduxRequest.request
  })(_Information);
};