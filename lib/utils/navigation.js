"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBeforeNavigation = handleBeforeNavigation;
function handleBeforeNavigation(config) {
  var closeInformation = config.closeInformation,
      closeNavigation = config.closeNavigation,
      isInformationActive = config.isInformationActive,
      isNavigationActive = config.isNavigationActive;

  isNavigationActive && closeNavigation();
  isInformationActive && closeInformation();
  return true;
}