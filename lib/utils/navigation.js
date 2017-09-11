"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var handleBeforeNavigation = exports.handleBeforeNavigation = function handleBeforeNavigation(_ref) {
  var closeInformation = _ref.closeInformation,
      closeNavigation = _ref.closeNavigation,
      isInformationActive = _ref.isInformationActive,
      isNavigationActive = _ref.isNavigationActive;

  isNavigationActive && closeNavigation();
  isInformationActive && closeInformation();
  return true;
};