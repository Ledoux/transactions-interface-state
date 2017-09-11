import { getLocationSearch } from '../utils/location'

export const SET_SEARCH = 'SET_SEARCH'

const initialState = {}

export function search (state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return getLocationSearch(action.searchString)
    default:
      return state
  }
}

export function setSearch (searchString) {
  return { searchString,
    type: SET_SEARCH
  }
}
