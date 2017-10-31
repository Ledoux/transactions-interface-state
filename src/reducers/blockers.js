const APPEND_BLOCKERS_METHOD = 'APPEND_BLOCKERS_METHOD'
const PUSH_BLOCKERS_METHOD = 'PUSH_BLOCKERS_METHOD'
const REMOVE_BLOCKERS_METHOD = 'REMOVE_BLOCKERS_METHOD'
const RESET_BLOCKERS = 'RESET_BLOCKERS'

export function shouldScroll (nextLocation, initialLocationPathname) {
  // weird that actually window.location is the nextLocation for the first
  // change of page
  // pop check
  if (nextLocation.pathname !== (initialLocationPathname || window.location.pathname)) {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (nextLocation.action === 'POP') {
      return
    }
    // In all other cases, scroll to top
    window.scrollTo(0, 0)
  }
}

const initialState = [shouldScroll]

export function createBlockers (history) {
  let historyBlockUnlistener = null
  let initialLocationPathname
  if (typeof window !== 'undefined') {
    initialLocationPathname = window.location.pathname
  }
  function blockers (state = initialState, action) {
    let newBlockers = state
    switch (action.type) {
      case APPEND_BLOCKERS_METHOD:
        newBlockers = [action.method].concat(state)
        break
      case PUSH_BLOCKERS_METHOD:
        newBlockers = state.concat([action.method])
        break
      case REMOVE_BLOCKERS_METHOD:
        newBlockers = state.filter(method => method != action.method)
        break
      case RESET_BLOCKERS:
        newBlockers = []
        break
    }
    if (newBlockers !== state) {
      if (historyBlockUnlistener) {
        historyBlockUnlistener()
      }
      if (newBlockers.length > 0) {
        const shouldContinue = nextLocation => {
          for (let blocker of newBlockers) {
            if (blocker(nextLocation, initialLocationPathname)) {
              initialLocationPathname = null
              return false
            }
          }
          initialLocationPathname = null
          return true
        }
        historyBlockUnlistener = history.block(shouldContinue)
      }
    }
    return newBlockers
  }
  return blockers
}

export function appendBlockersMethod (method) {
  return { method,
    type: APPEND_BLOCKERS_METHOD
  }
}

export function pushBlockersMethod (method) {
  return { method,
    type: PUSH_BLOCKERS_METHOD
  }
}

export function removeBlockersMethod (method) {
  return { method,
    type: REMOVE_BLOCKERS_METHOD
  }
}

export function resetBlockers (method) {
  return { type: RESET_BLOCKERS_METHOD }
}
