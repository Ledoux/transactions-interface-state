"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var diff = exports.diff = function diff() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var nextObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var diffObject = {};
  var checkedKeys = Object.keys(nextObject);
  checkedKeys.forEach(function (key) {
    var nextObjectValue = nextObject[key];
    var objectValue = object[key];
    if (nextObjectValue !== objectValue) {
      diffObject[key] = [nextObjectValue, objectValue];
    }
  });
  Object.keys(object).forEach(function (key) {
    if (checkedKeys.includes(key)) {
      return;
    }
    diffObject[key] = [undefined, object[key]];
  });
  return diffObject;
};