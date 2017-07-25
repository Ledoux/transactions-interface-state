'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var IS_WEB = exports.IS_WEB = !IS_NODE && typeof document !== 'undefined';
var IS_NODE = exports.IS_NODE = process && !process.browser;
var IS_DEV = exports.IS_DEV = IS_NODE ? process.env.NODE_ENV === 'development' : /^(localhost|0\.0|192\.)/.test(window.location.hostname);
var IS_PROD = exports.IS_PROD = IS_NODE ? process.env.NODE_ENV === 'production' : !IS_DEV;
var IS_STG = exports.IS_STG = process.env.TYPE === 'staging';
var BASE_NAME = exports.BASE_NAME = IS_DEV ? '/' : '/';
var IS_UNDER_CONSTRUCTION = exports.IS_UNDER_CONSTRUCTION = false;
var IS_FIREFOX = exports.IS_FIREFOX = typeof InstallTrigger !== 'undefined';