import { takeEvery } from 'redux-saga'

function * logData (action) {
  console.log(action.type, action)
}

export function * watchAllActions () {
  yield * takeEvery(() => true, logData)
}
