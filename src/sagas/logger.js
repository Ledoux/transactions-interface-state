import { takeEvery } from 'redux-saga'

// DATA
function * logData (action) {
  console.log(action.type, action)
}

// WATCHER
export function * watchAllActions () {
  yield * takeEvery(() => true, logData)
}
