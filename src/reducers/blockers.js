const ADD_BLOCKERS_METHOD = 'ADD_BLOCKERS_METHOD'
const REMOVE_BLOCKERS_METHOD = 'REMOVE_BLOCKERS_METHOD'
const RESET_BLOCKERS = 'RESET_BLOCKERS'

export function createBlockers (history) {
  let historyBlockUnlistener = null
  function blockers (state = [], action) {
    let newBlockers = state
    switch (action.type) {
      case ADD_BLOCKERS_METHOD:
        newBlockers = state.concat(action.method)
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
            if (blocker(nextLocation)) {
              return false
            }
          }
          return true
        }
        historyBlockUnlistener = history.block(shouldContinue)
      }
    }
    return newBlockers
  }
  return blockers
}

export function addBlockersMethod (method) {
  return { method,
    type: ADD_BLOCKERS_METHOD
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
