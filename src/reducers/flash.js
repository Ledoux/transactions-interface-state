import assign from 'lodash.assign'

export const ASSIGN_IN_FLASH = 'ASSIGN_IN_FLASH'

const intialState = null

export function flash (state = intialState, action) {
  switch (action.type) {
    case ASSIGN_IN_FLASH:
      return assign({}, state, action.patch)
    default:
      return state
  }
}

export function assignInFlash (patch) {
  return {
    type: ASSIGN_IN_FLASH,
    patch
  }
}
