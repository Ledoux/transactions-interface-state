'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createItemizer = createItemizer;

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createItemizer(ItemComponentsByComponentName) {
  ItemComponentsByCollectionName = {};
  Object.keys(ItemComponentsByComponentName).forEach(function (key) {
    var Component = ItemComponentsByComponentName[key];
    var CollectionName = (0, _pluralize2.default)(key.slice(0, -4), 2);
    ItemComponentsByCollectionName['' + CollectionName[0].toLowerCase() + CollectionName.slice(1)] = Component;
  });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ItemComponentsByCollectionName;
  };
}