'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apis = require('./apis');

Object.keys(_apis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _apis[key];
    }
  });
});

var _automatic = require('./automatic');

Object.keys(_automatic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _automatic[key];
    }
  });
});

var _diff = require('./diff');

Object.keys(_diff).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _diff[key];
    }
  });
});

var _toggle = require('./toggle');

Object.keys(_toggle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toggle[key];
    }
  });
});

var _view = require('./view');

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _view[key];
    }
  });
});