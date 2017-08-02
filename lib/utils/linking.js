"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthorizedLink = isAuthorizedLink;
exports.getAuthorizedLinks = getAuthorizedLinks;
// LINKS
function isAuthorizedLink(link, authorizedModeNames) {
  var label = link.label,
      modeNames = link.modeNames;

  if (modeNames) {
    return modeNames.find(function (modeName) {
      return authorizedModeNames.includes(modeName);
    });
  }
  return label;
}

function getAuthorizedLinks(authorizedModes) {
  var menuLinks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return menuLinks.filter(function (link) {
    return isAuthorizedLink(link, authorizedModeNames);
  }).map(function (_ref) {
    var label = _ref.label,
        path = _ref.path;
    return { label: label, path: path };
  });
}