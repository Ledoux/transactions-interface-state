import React from 'react'
import { takeEvery } from 'redux-saga'
import { put,
  select
} from 'redux-saga/effects'

import { showModal } from '../reducers/modal'
import { getViewerComponent } from '../reducers/viewer'

// DATA
export function * fromWatchTransactionFails ({ method,
  error,
  tag
}) {
  if (error) {
    const isModalActive = yield select(({ modal: { isActive } }) => isActive)
    if (!isModalActive) {
      const ModalComponent = yield select(getViewerComponent, 'modal', 'warning')
      if (!ModalComponent) {
        return
      }
      yield put(showModal(<ModalComponent icon='warning'
        subtext={error}
        text={`Error with a \"${method} ${tag || ''}\" request`} />))
    }
  }
}

// WATCHER
export function * watchTransactionFails () {
  yield * takeEvery(({ type }) =>
    /FAIL_TRANSACTIONS_(.*)/.test(type), fromWatchTransactionFails)
}
