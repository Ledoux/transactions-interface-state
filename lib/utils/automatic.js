'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAutomaticCollectionName = getAutomaticCollectionName;
exports.getAutomaticSlug = getAutomaticSlug;

var _lodash = require('lodash.sample');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// automatic navigation
function getAutomaticCollectionName(collectionNames) {
  return (0, _lodash2.default)(collectionNames, 1);
}
function getAutomaticSlug(entities) {
  var automaticEntity = (0, _lodash2.default)(entities, 1);
  return automaticEntity && automaticEntity.slug;
}