'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reselect = reselect;
var initialState = exports.initialState = {
  ALL: {},
  WITH_ENTITY_NAME_JOIN: {
    entityName: null
  },
  WITH_IDS: {
    ids: null
  },
  WITH_JOIN: {
    key: null,
    value: null
  },
  WITH_SIGN_JOIN: {
    sign: null,
    key: null,
    value: null
  }
};

function reselect(id, filterState, elements) {
  switch (id) {
    case 'ALL':
      return elements;
    case 'WITH_ENTITY_NAME_JOIN':
      return filterState.entityName && elements.filter(function (element) {
        return element.entityName === filterState.entityName;
      });
    case 'WITH_IDS':
      return filterState.ids && filterState.ids.map(function (id) {
        return elements.find(function (element) {
          return element.id === id;
        });
      }).filter(function (element) {
        return element;
      });
    case 'WITH_JOIN':
      return filterState.key && filterState.value && [elements.find(function (element) {
        return element[filterState.key] === filterState.value;
      })].filter(function (element) {
        return element;
      });
    case 'WITH_SIGN_JOIN':
      return filterState.key && filterState.value && [elements.find(function (element) {
        return element[filterState.key] === filterState.value;
      })].filter(function (element) {
        return element;
      });
    default:
      return 'next';
  }
}