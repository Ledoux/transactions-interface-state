'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BellButton = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _transactionsReduxReact = require('transactions-redux-react');

var _information = require('../../reducers/information');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BellButton = exports.BellButton = function BellButton(WrappedComponent) {
  WrappedComponent.propTypes = { closeInformation: _propTypes2.default.func.isRequired,
    isInformationActive: _propTypes2.default.bool.isRequired,
    onTopOfDarkSection: _propTypes2.default.bool,
    showInformation: _propTypes2.default.func.isRequired
  };
  var mapStateToProps = function mapStateToProps(state) {
    var isActive = state.information.isActive;

    var notifications = (0, _transactionsReduxReact.getNormalizerEntities)(state, 'notifications');
    var isEmpty = notifications.length === 0;
    var isNewNotification = notifications.find(function (_ref) {
      var isSeen = _ref.isSeen;
      return !isSeen;
    });
    return { isEmpty: isEmpty,
      isInformationActive: isActive,
      isNewNotification: isNewNotification
    };
  };
  return (0, _reactRedux.connect)(mapStateToProps, { closeInformation: _information.closeInformation,
    showInformation: _information.showInformation
  })(WrappedComponent);
};