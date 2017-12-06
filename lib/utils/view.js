'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transactionsReduxReact = require('transactions-redux-react');

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createView(categoryName) {
  var ComponentsByName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // unpack
  var isPlural = config.isPlural;

  var componentsBySingularOrPluralName = {};
  // map
  Object.keys(ComponentsByName).forEach(function (key) {
    // unpack
    var Component = ComponentsByName[key];
    var contentName = key.slice(0, -categoryName.length);
    contentName = '' + contentName[0].toLowerCase() + contentName.slice(1);
    var pluralName = (0, _pluralize2.default)(contentName, 2);
    contentName = isPlural ? pluralName : contentName;
    // set
    componentsBySingularOrPluralName[contentName] = Component;
  });
  return componentsBySingularOrPluralName;
}

exports.default = createView;