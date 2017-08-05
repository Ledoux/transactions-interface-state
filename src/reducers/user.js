import assign from 'lodash.assign'

export const SET_ACTIVE_USER = 'SET_ACTIVE_USER'
export const SET_USER = 'SET_USER'

const intialState = {}

export function user (state = intialState, action) {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return assign({}, state, { active: true})
    case SET_USER:
      return action.user
    default:
      return state
  }
}

export function setActiveUser () {
  return {
    type: SET_ACTIVE_USER,
  }
}

export function setUser (user, config) {
  return {
    type: SET_USER,
    config,
    user
  }
}
