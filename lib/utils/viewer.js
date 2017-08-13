'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createViewer = createViewer;

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createViewer(categoryName) {
  var componentsByComponentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var isPlural = config.isPlural;

  var componentsBySingularOrPluralName = {};
  Object.keys(componentsByComponentName).forEach(function (key) {
    var Component = componentsByComponentName[key];
    var name = key.slice(0, -categoryName.length);
    var prefixName = isPlural ? (0, _pluralize2.default)(name, 2) : name;
    componentsBySingularOrPluralName['' + prefixName[0].toLowerCase() + prefixName.slice(1)] = Component;
  });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : componentsBySingularOrPluralName;
    return state;
  };
}