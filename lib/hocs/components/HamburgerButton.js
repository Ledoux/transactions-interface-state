'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HamburgerButton = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _navigation = require('../../reducers/navigation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HamburgerButton = exports.HamburgerButton = function HamburgerButton(WrappedComponent) {
  WrappedComponent.propTypes = { closeNavigation: _propTypes2.default.func.isRequired,
    isNavigationActive: _propTypes2.default.bool.isRequired,
    onTopOfDarkSection: _propTypes2.default.bool,
    showNavigation: _propTypes2.default.func.isRequired
  };
  var mapStateToProps = function mapStateToProps(_ref) {
    var isActive = _ref.navigation.isActive;

    return { isNavigationActive: isActive };
  };
  return (0, _reactRedux.connect)(mapStateToProps, { closeNavigation: _navigation.closeNavigation,
    showNavigation: _navigation.showNavigation
  })(WrappedComponent);
};