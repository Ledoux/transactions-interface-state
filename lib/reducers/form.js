'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.flatten');

var _lodash2 = _interopRequireDefault(_lodash);

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

var _location = require('../utils/location');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// automatic packager
var reducerPackage = (0, _transactionsReduxNormalizer.getReducerPackage)('form');
var deleteFormEntity = reducerPackage.deleteFormEntity,
    getFormEntity = reducerPackage.getFormEntity,
    mergeFormEntity = reducerPackage.mergeFormEntity;

// special action

var REQUEST_FORM_PUT = reducerPackage.REQUEST_FORM_PUT = 'REQUEST_FORM_PUT';
reducerPackage.requestFormPut = function () {
  return {
    type: REQUEST_FORM_PUT
  };
};
reducerPackage.updateFormJoinEntity = function (collectionName, join, entity) {
  var previousId = join.previousId,
      nextId = join.nextId;

  return !nextId ? previousId ? deleteFormEntity(collectionName, previousId) : entity.id ? mergeFormEntity(collectionName, '_NEW_', entity) : mergeFormEntity(collectionName, '_NEW_', Object.assign({ id: '_NEW_' }, entity)) : mergeFormEntity(collectionName, nextId, '_DELETE_');
};

// special selectors
reducerPackage.getFormPutOptions = function (_ref) {
  var form = _ref.form;

  var formPutOptions = (0, _lodash2.default)(Object.keys(form).map(function (key) {
    var collection = form[key];
    var collectionName = key.slice(0, -4);
    return Object.keys(collection).map(function (id) {
      var entity = collection[id];
      return {
        collectionName: collectionName,
        query: { id: id },
        update: entity
      };
    });
  }));
  return formPutOptions.length > 0 && formPutOptions;
};

var getFormJoinEntity = reducerPackage.getFormJoinEntity = function (state, collectionName, joinedEntities) {
  // look first in the store state if we have the joined entity already
  var joinEntity = joinedEntities && joinedEntities[0];
  if (!joinEntity) {
    return;
  }
  // now we need to know also in the form state what it is about,
  // if the joinEntity exists, then we need to check that in the form
  // store there is first a delete version of it
  // it the joinEntity does not exists, maybe the user already performed
  // in the form store a _NEW_ action before
  var formEntity = getFormEntity(state, collectionName, joinEntity && joinEntity.id || '_NEW_');
  // maybe the entity is then at the DELETE state so we don't have to return it
  // also in that case
  if (formEntity) {
    return formEntity !== '_DELETE_' ? formEntity : {
      id: joinEntity && joinEntity.id,
      _DELETE_: true
    };
  } else {
    // else return the existing or not joinEntity
    return joinEntity;
  }
};
reducerPackage.getFormJoinEntities = function (state, collectionNames) {
  return collectionNames.map(function (collectionName) {
    return getFormJoinEntity(state, collectionName);
  });
};
var getFormJoin = reducerPackage.getFormJoin = function (state, collectionName) {
  var formJoinEntity = reducerPackage.getFormJoinEntity(state, collectionName);
  return {
    nextId: formJoinEntity && !formJoinEntity._DELETE_ && formJoinEntity.id,
    previousId: formJoinEntity && formJoinEntity._DELETE_ && formJoinEntity.id
  };
};
reducerPackage.getFormJoins = function (state, collectionNames) {
  return collectionNames && collectionNames.map(function (collectionName) {
    return getFormJoin(state, collectionName);
  }) || [];
};
reducerPackage.getNewForm = function () {
  var search = (0, _location.getLocationSearch)(window.location.search);
  return search.form && JSON.parse(decodeURI(search.form));
};

exports.default = reducerPackage;