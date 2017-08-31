export const reselectorInitialState = {
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
  },
  WITH_UNIQ_USER_JOIN: {
    userId: null
  }
}

export function getFilteredElements (id, filter, elements) {
  switch (id) {
    case 'ALL':
      return elements
    case 'WITH_ENTITY_NAME_JOIN':
      return filter.entityName && elements.filter(element =>
        element.entityName === filter.entityName)
    case 'WITH_IDS':
      return filter.ids && filter.ids.map(id => elements.find(element =>
      element.id === id)).filter(element => element)
    case 'WITH_JOIN':
      return filter.key && filter.value && [elements.find(element =>
        element[filter.key] === filter.value)]
          .filter(element => element)
    case 'WITH_SIGN_JOIN':
      return filter.key && filter.value && [elements.find(element =>
        element[filter.key] === filter.value)]
          .filter(element => element)
    case 'WITH_UNIQ_USER_JOIN':
      return filter.userId && [elements.find(element =>
        element.userId === filter.userId)]
          .filter(element => element)
    default:
      return 'next'
  }
}
