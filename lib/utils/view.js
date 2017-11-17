'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transactionsReduxReact = require('transactions-redux-react');

var _redux = require('redux');

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createView(categoryName) {
  var ComponentsByName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // unpack
  var collectionNames = config.collectionNames,
      isJoin = config.isJoin,
      isPlural = config.isPlural;

  var componentsBySingularOrPluralName = {};
  // map
  Object.keys(ComponentsByName).forEach(function (key) {
    // unpack
    var Component = ComponentsByName[key];
    var contentName = key.slice(0, -categoryName.length);
    contentName = '' + contentName[0].toLowerCase() + contentName.slice(1);
    var collectionName = (0, _pluralize2.default)(contentName, 2);
    contentName = isPlural ? collectionName : contentName;
    // hocs
    var hocs = [];
    if (isJoin) {
      var _query;

      if (!collectionNames.includes(collectionName)) {
        // console.warn(`${collectionName} is not in the description`)
      }
      hocs.push((0, _transactionsReduxReact.withJoinedEntities)([{ collectionName: collectionName,
        query: (_query = {}, _defineProperty(_query, _transactionsReduxReact.IS_ALL_DEEP_JOINS, true), _defineProperty(_query, _transactionsReduxReact.IS_ALL_JOINS, true), _query)
      }]));
    }
    // set and add join hoc
    componentsBySingularOrPluralName[contentName] = _redux.compose.apply(undefined, hocs)(Component);
  });
  return componentsBySingularOrPluralName;
}

exports.default = createView;