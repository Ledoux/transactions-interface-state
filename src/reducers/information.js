import assign from 'lodash.assign'

import { trackEvent } from '../utils/tracking'

export const CLOSE_INFORMATION = 'CLOSE_INFORMATION'
export const SHOW_INFORMATION = 'SHOW_INFORMATION'

const initialState = {
  isActive: false
}

export function information (state = initialState, action) {
  switch (action.type) {
    case SHOW_INFORMATION:
      return assign({}, state, {
        isActive: true
      })
    case CLOSE_INFORMATION:
      return assign({}, state, {
        isActive: false
      })
    default:
      return state
  }
}

export function closeInformation (action = {}) {
  action.trackEvent && action.trackEvent('closeInformation')
  return { type: CLOSE_INFORMATION }
}

export function showInformation (action = {}) {
  action.trackEvent && action.trackEvent('showInformation')
  return { type: SHOW_INFORMATION }
}
