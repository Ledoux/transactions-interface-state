export const SHOW_LOADING = 'SHOW_LOADING'
export const CLOSE_LOADING = 'CLOSE_LOADING'

const intialState = {}

export function loading (state = intialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return Object.assign({}, state, {
        isActive: true
      })
    case CLOSE_LOADING:
      return Object.assign({}, state, {
        isActive: false
      })
    default:
      return state
  }
}

// ACTIONS
export function showLoading () {
  return {
    type: SHOW_LOADING
  }
}

export function closeLoading () {
  return {
    type: CLOSE_LOADING
  }
}
