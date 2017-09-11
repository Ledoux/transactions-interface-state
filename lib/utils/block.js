'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBlock = handleBlock;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleBlock(_ref) {
  var _ref$props = _ref.props,
      BlockComponent = _ref$props.BlockComponent,
      requestFail = _ref$props.requestFail,
      showModal = _ref$props.showModal;

  if (requestFail) {
    showModal(_react2.default.createElement(BlockComponent, {
      icon: 'warning',
      subtext: requestFail.error,
      text: 'Error with a "' + requestFail.method + ' ' + (requestFail.tag || '') + '" request'
    }));
    return false;
  }
  return true;
}