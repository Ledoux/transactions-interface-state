export const initialState = {
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

export function reselect (id, filterState, elements) {
  switch (id) {
    case 'ALL':
      return elements
    case 'WITH_ENTITY_NAME_JOIN':
      return filterState.entityName && elements.filter(element =>
        element.entityName === filter.entityName)
    case 'WITH_IDS':
      return filterState.ids && filterState.ids.map(id => elements.find(element =>
      element.id === id)).filter(element => element)
    case 'WITH_JOIN':
      return filterState.key && filterState.value && [elements.find(element =>
        element[filterState.key] === filterState.value)]
          .filter(element => element)
    case 'WITH_SIGN_JOIN':
      return filterState.key && filterState.value && [elements.find(element =>
        element[filterState.key] === filterState.value)]
          .filter(element => element)
    case 'WITH_UNIQ_USER_JOIN':
      return filterState.userId && [elements.find(element =>
        element.userId === filterState.userId)]
          .filter(element => element)
    default:
      return 'next'
  }
}
