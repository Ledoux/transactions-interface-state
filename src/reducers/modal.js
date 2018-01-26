import assign from 'lodash.assign'

const SET_MODAL_QUERY = 'SET_MODAL_QUERY'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const SHOW_MODAL = 'SHOW_MODAL'

const initialState = { ContentComponent: null,
  isActive: false,
  query: null
}

export function modal (state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_QUERY:
      return assign({}, state, {
        query: action.query
      })
    case SHOW_MODAL:
      return assign({}, state, Object.assign({
        isActive: true,
        ContentComponent: action.ContentComponent || state.ContentComponent,
      }, action.config))
    case CLOSE_MODAL:
      return assign({}, state, {
        beforeCloseModal: null,
        query: null,
        isActive: false,
        isCtaCloseButton: false,
        isCornerCloseButton: false,
        isOutCloseButton: false,
      })
    default:
      return state
  }
}

export function closeModal () {
  return { type: CLOSE_MODAL }
}

export function showModal (modalElement, config) {
  return {
    config,
    ContentComponent: () => modalElement,
    type: SHOW_MODAL
  }
}
