import { put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

const { getFormPutOptions,
  REQUEST_FORM_PUT,
  resetForm
} = require('../reducers/form').default

function * fromWatchRequestFormPutActionData () {
  const formPutOptions = yield select(getFormPutOptions)
}

// WATCHES
export function * watchRequestFormPutAction () {
  yield * takeEvery(REQUEST_FORM_PUT,
    fromWatchRequestFormPutActionData
  )
}
