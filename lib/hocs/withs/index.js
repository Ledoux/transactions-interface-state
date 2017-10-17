'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _withComputedProps = require('./withComputedProps');

Object.keys(_withComputedProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _withComputedProps[key];
    }
  });
});

var _withProps = require('./withProps');

Object.keys(_withProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _withProps[key];
    }
  });
});