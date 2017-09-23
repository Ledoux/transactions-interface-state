'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIsEntitiesEqual = getIsEntitiesEqual;
exports.entitiesShallowCompare = entitiesShallowCompare;

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _diff = require('./diff');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getIsEntitiesEqual(entities, prevEntities) {
  return entities.length === prevEntities.length && entities.every(function (entity, index) {
    return entity.id === prevEntities[index].id;
  });
}

function entitiesShallowCompare(ReactElement, nextProps, nextState) {
  var _entitiesKeys = ReactElement._entitiesKeys,
      props = ReactElement.props,
      state = ReactElement.state;

  var propsWithoutKeys = Object.assign({}, props);
  var nextPropsWithoutKeys = Object.assign({}, nextProps);
  if (_entitiesKeys) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _entitiesKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _entitiesKey = _step.value;

        var isEqual = getIsEntitiesEqual(nextProps[_entitiesKey], props[_entitiesKey]);
        if (!isEqual) {
          return true;
        }
        delete propsWithoutKeys[_entitiesKey];
        delete nextPropsWithoutKeys[_entitiesKey];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    console.warn('You called for entitiesShallowCompare but you there is no this._entitiesKeys');
  }
  var isShallowCompare = (0, _reactAddonsShallowCompare2.default)({ props: propsWithoutKeys,
    state: state
  }, nextPropsWithoutKeys, nextState);
  return isShallowCompare;
}