import flatten from 'lodash.flatten'

export const REQUEST_AUTHORIZED_API = 'REQUEST_AUTHORIZED_API'
export const SET_AUTHORIZATION_IDS_BY_MODE_NAME = 'SET_AUTHORIZATION_IDS_BY_MODE_NAME'
export const SET_AUTHORIZATION_LINKS = 'SET_AUTHORIZATION_LINKS'
export const SET_AUTHORIZATION_SELECTED_MODE = 'SET_AUTHORIZATION_SELECTED_MODE'

const intialState = {
  collectionNames: null,
  modes:  null,
  links: null,
  selectedMode: null
}

export function authorization (state = intialState, action) {
  switch (action.type) {
    case SET_AUTHORIZATION_IDS_BY_MODE_NAME:
      return Object.assign({}, state, {
        idsByModeName: action.idsByModeName
      })
    case SET_AUTHORIZATION_SELECTED_MODE:
      return Object.assign({}, state, {
        selectedMode: action.mode
      })
    case SET_AUTHORIZATION_LINKS:
      const authorizedModes = action.modes.map((mode, index) => {
        return Object.assign({
          index
        }, mode)
      })
      const switchModes = authorizedModes.filter(isSwitchMode)
      return Object.assign({}, state, {
        collectionNames: flatten(
          authorizedModes.map(mode => mode.availableCollectionNames)),
        links: action.links,
        modes: authorizedModes,
        switchModes
      })
    default:
      return state
  }
}

// ACTION CREATORS
export function setAuthorizationIdsByModeName (idsByModeName) {
  return {
    type: SET_AUTHORIZATION_IDS_BY_MODE_NAME,
    idsByModeName
  }
}

export function setAuthorizationSelectedMode (mode) {
  return {
    type: SET_AUTHORIZATION_SELECTED_MODE,
    mode
  }
}

export function setAuthorizationLinks (links, modes) {
  return {
    type: SET_AUTHORIZATION_LINKS,
    links, modes
  }
}

export function requestAuthorizedApi (endpoint, config) {
  return {
    type: REQUEST_AUTHORIZED_API,
    endpoint, config
  }
}

// SELECTORS
export function getNewAuthorizedModes (state) {
  return modes.filter(mode => mode.hasModeAccess(state, mode.collectionName))
}
