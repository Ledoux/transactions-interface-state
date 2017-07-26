import assign from 'lodash.assign'

import { trackEvent } from '../utils/tracking'

export const SHOW_NAVIGATION = 'SHOW_NAVIGATION'
export const CLOSE_NAVIGATION = 'CLOSE_NAVIGATION'

const intialState = {
  isActive: false
}

export function navigation (state = intialState, action) {
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

export function closeNavigation () {
  trackEvent('closeNavigation')
  return { type: CLOSE_NAVIGATION }
}

export function showNavigation () {
  trackEvent('showNavigation')
  return { type: SHOW_NAVIGATION }
}
