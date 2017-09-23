"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToggledArray = getToggledArray;
function getToggledArray(element, array) {
  var toggledArray = void 0;
  if (!array) {
    return [element];
  } else if (array.includes(element)) {
    return array.filter(function (arrayElement) {
      return arrayElement !== element;
    });
  } else {
    return array.concat([element]);
  }
}