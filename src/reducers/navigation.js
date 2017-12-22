import assign from 'lodash.assign'

import { trackEvent } from '../utils/tracking'

export const SHOW_NAVIGATION = 'SHOW_NAVIGATION'
export const CLOSE_NAVIGATION = 'CLOSE_NAVIGATION'

const defaultInitialState = { isActive: false }

export function createNavigation (initialState) {
  function navigation (state = Object.assign({}, defaultInitialState, initialState), action) {
    switch (action.type) {
      case SHOW_NAVIGATION:
        return assign({}, state, {
          isActive: true
        })
      case CLOSE_NAVIGATION:
        return assign({}, state, {
          isActive: false
        })
      default:
        return state
    }
  }
  return navigation
}

export function closeNavigation (action = {}) {
  action.trackEvent && action.trackEvent('closeNavigation')
  return { type: CLOSE_NAVIGATION }
}

export function showNavigation (action = {}) {
  action.trackEvent && action.trackEvent('showNavigation')
  return { type: SHOW_NAVIGATION }
}
