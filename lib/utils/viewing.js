'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCardViewer = createCardViewer;
exports.createItemViewer = createItemViewer;

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCardViewer(CardComponentsByComponentName) {
  var CardComponentsByEntityName = {};
  Object.keys(CardComponentsByComponentName).forEach(function (key) {
    var Component = CardComponentsByComponentName[key];
    var collectionName = key.slice(0, -4);
    CardComponentsByEntityName['' + collectionName[0].toLowerCase() + collectionName.slice(1)] = Component;
  });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CardComponentsByEntityName;
    return state;
  };
}

function createItemViewer(ItemComponentsByComponentName) {
  var ItemComponentsByCollectionName = {};
  Object.keys(ItemComponentsByComponentName).forEach(function (key) {
    var Component = ItemComponentsByComponentName[key];
    var collectionName = (0, _pluralize2.default)(key.slice(0, -4), 2);
    ItemComponentsByCollectionName['' + collectionName[0].toLowerCase() + collectionName.slice(1)] = Component;
  });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ItemComponentsByCollectionName;
    return state;
  };
}