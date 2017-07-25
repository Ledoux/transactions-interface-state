import assign from 'lodash.assign'

const SET_MODAL_QUERY = 'SET_MODAL_QUERY'
const CLOSE_MODAL = 'CLOSE_MODAL'
const SHOW_MODAL = 'SHOW_MODAL'

const intialState = {
  isActive: false,
  content: null,
  query: null
}

export function modal (state = intialState, action) {
  switch (action.type) {
    case SET_MODAL_QUERY:
      return assign({}, state, {
        query: action.query
      })
    case SHOW_MODAL:
      return assign({}, state, Object.assign({
        isActive: true,
        content: action.newContent || state.content
      }, action.config))
    case CLOSE_MODAL:
      return assign({}, state, {
        beforeCloseModal: null,
        query: null,
        isActive: false,
        isCtaCloseButton: false,
        isCornerCloseButton: false,
        isOutCloseButton: false
      })
    default:
      return state
  }
}

export function closeModal () {
  return { type: CLOSE_MODAL }
}

export function showModal (newContent, config) {
  return {
    type: SHOW_MODAL,
    config,
    newContent
  }
}
