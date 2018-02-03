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

var _reactRouter = require('react-router');

var _redux = require('redux');

var _transactionsInterfaceState = require('transactions-interface-state');

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

var _transactionsReduxReact = require('transactions-redux-react');

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

      return _possibleConstructorReturn(this, (_Information.__proto__ || Object.getPrototypeOf(_Information)).apply(this, arguments));
    }

    _createClass(_Information, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _props = this.props,
            closeInformation = _props.closeInformation,
            currentTourUser = _props.currentTourUser,
            isActive = _props.isActive,
            mergeNormalizerEntities = _props.mergeNormalizerEntities,
            pageName = _props.pageName,
            request = _props.request,
            notSeenNotifications = _props.notSeenNotifications,
            userId = _props.userId;
        // when we close the information menu
        // we can set to seen the previous unseen notifications

        if (prevProps.isActive && !isActive) {
          if (!notSeenNotifications) {
            return;
          }
          if (currentTourUser) {
            var entities = notSeenNotifications.map(function (notSeenNotification) {
              return { id: notSeenNotification.id,
                isSeen: true
              };
            });
            mergeNormalizerEntities('notifications', entities);
          } else if (notSeenNotifications.length > 0) {
            request('PUT', [{ collectionName: 'notifications',
              query: { isSeen: false,
                userId: userId
              },
              update: { isSeen: true }
            }], { tag: 'notifications' });
          }
        } else if (isActive && prevProps.pageName !== pageName) {
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

  return (0, _redux.compose)(_reactRouter.withRouter, (0, _reactRedux.connect)(function (_ref) {
    var id = _ref.user.id;
    return { userId: id };
  }), (0, _transactionsReduxReact.withRequestedEntities)(function (_ref2) {
    var userId = _ref2.userId;
    return userId && [{ collectionName: 'notifications', query: { userId: userId } }];
  }), (0, _transactionsReduxReact.withComputedProps)({
    notSeenNotifications: (0, _transactionsReduxReact.createComputer)(function (_ref3) {
      var notifications = _ref3.notifications;
      return notifications;
    }, function (notifications) {
      return notifications && notifications.filter(function (_ref4) {
        var isSeen = _ref4.isSeen;
        return !isSeen;
      });
    })
  }), (0, _reactRedux.connect)(function (_ref5, _ref6) {
    var isActive = _ref5.information.isActive,
        currentTourUser = _ref5.tour.currentTourUser;
    var pageName = _ref6.match.params.pageName;

    return { isActive: isActive,
      currentTourUser: currentTourUser,
      pageName: pageName
    };
  }, {
    closeInformation: _transactionsInterfaceState.closeInformation,
    mergeNormalizerEntities: _transactionsReduxNormalizer.mergeNormalizerEntities,
    request: _transactionsReduxRequest.request
  }))(_Information);
};