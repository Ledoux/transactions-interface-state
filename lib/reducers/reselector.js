'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilteredElements = getFilteredElements;
var reselectorInitialState = exports.reselectorInitialState = {
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
  WITH_NOT_IS_SEEN: {
    isSeen: false
  },
  WITH_SIGN_JOIN: {
    sign: null,
    key: null,
    value: null
  },
  WITH_SIGN_SEARCH: {
    query: null,
    sign: null
  },
  WITH_SLUG: {
    slug: null
  },
  WITH_UNIQ_USER_JOIN: {
    userId: null
  },
  WITH_URL: {
    url: null
  }
};

function getFilteredElements(id, filter, elements) {
  switch (id) {
    case 'ALL':
      return elements;
    case 'WITH_ENTITY_NAME_JOIN':
      return filter.entityName && elements.filter(function (element) {
        return element.entityName === filter.entityName;
      });
    case 'WITH_IDS':
      return filter.ids && filter.ids.map(function (id) {
        return elements.find(function (element) {
          return element.id === id;
        });
      }).filter(function (element) {
        return element;
      });
    case 'WITH_JOIN':
      return filter.key && filter.value && [elements.find(function (element) {
        return element[filter.key] === filter.value;
      })].filter(function (element) {
        return element;
      });
    case 'WITH_NOT_IS_SEEN':
      return elements.filter(function (element) {
        return !element.isSeen;
      });
    case 'WITH_SIGN_JOIN':
      return filter.key && filter.value && [elements.find(function (element) {
        return element[filter.key] === filter.value;
      })].filter(function (element) {
        return element;
      });
    case 'WITH_SIGN_SEARCH':
      return getDirectFilteredElements(elements, { query: filter.query });
    case 'WITH_SLUG':
      return filter.slug && elements.filter(function (element) {
        return element.slug === filter.slug;
      });
    case 'WITH_UNIQ_USER_JOIN':
      return filter.userId && [elements.find(function (element) {
        return element.userId === filter.userId;
      })].filter(function (element) {
        return element;
      });
    case 'WITH_URL':
      return filter.url && [elements.find(function (element) {
        return element.url === filter.url;
      })].filter(function (element) {
        return element;
      });
    default:
      return 'next';
  }
}