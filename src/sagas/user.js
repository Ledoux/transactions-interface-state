import values from 'lodash.values'
import pluralize from 'pluralize'
import { call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { mergeReselector } from 'transactions-redux-reselector'
import { isSuccessTransactionsAction } from 'transactions-redux-request'

import { setAuthorizationIdsByModeName,
  setAuthorizationLinks,
  setAuthorizationSelectedMode,
  getNewAuthorizedModes
} from '../reducers/authorization'
import { SET_USER } from '../reducers/user'
import { IS_UNDER_CONSTRUCTION } from '../utils/config'
import { getAuthorizedLinks } from '../utils/linking'
import { getLocationSearch } from '../utils/location'
import { socketio } from '../utils/socketio'

// DATA
function * fromWatchSetUserData (action) {
  const { active,
    id
  } = action.user
  if (!action.config || !action.config.requestTransactions) {
    console.warn('transactions-interface-state fromWatchSetUserData, you need to pass a requestTransactions in your action')
    return
  }
  if (active) {
    // say to the socket server that we are connected as a user !
    socketio.emit('connect_user', action.user)
    // now we need to get all the joined collections
    // that say more about the user... Is she/he a reviewer, an editor...?
    yield put(action.config.requestTransactions('GET',
      [{
        collectionName: 'users',
        query: { id }
      }],
      {
        tag: 'sign'
      }
    ))
  }
}

function * fromWatchMergeNormalizerGetSignActionData (action) {
  // retrieving the authorized modes needs
  // to use the state that will look at several reducer states:
  // first the user one to look at admin
  // second if the normalizer to see all the joined collection
  // if they have at least one associated good userId
  // and this is only possible if we have set also the filter
  const patch = action.normalizer && action.normalizer.patch
  if (patch) {
    const users = values(patch.usersById)
    if (users.length === 1) {
      // we need to set the filter only when we have fetched the users array
      // of the only one user logged!
      const userId = users[0].id
      yield put(mergeReselector({
        WITH_UNIQ_USER_JOIN: {
          userId
        }
      }))
      // set in the state the joins
      const idsByModeName = {}
      Object.keys(patch).forEach(collectionKey => {
        const collection = patch[collectionKey]
        const ids = Object.keys(collection)
        if (ids.length === 1) {
          const collectionName = collectionKey.slice(0, -4)
          // don't set for the user mode, just to the other modes
          if (collectionName !== 'users') {
            const entityName = pluralize(collectionName, 1)
            idsByModeName[entityName] = ids[0]
          }
        }
      })
      yield put(setAuthorizationIdsByModeName(idsByModeName))
    } else {
      console.warn(`After MERGE_NORMALIZER_GET_SIGN we did not get again
      the logged active user`, action)
    }
  } else {
    console.warn(`there should be a patch here to determine if we have
      merged the logged user`, action)
  }
  const modes = yield select(getNewAuthorizedModes)
  const links = getAuthorizedLinks(modes)
  yield put(setAuthorizationLinks(links, modes))
}

// WATCHES
export function * watchSetUser () {
  if (!IS_UNDER_CONSTRUCTION) {
    yield * takeEvery(SET_USER, fromWatchSetUserData)
  }
}

export function * watchMergeNormalizerGetSignAction () {
  yield * takeEvery(action => action.type === 'MERGE_NORMALIZER_GET_SIGN',
    fromWatchMergeNormalizerGetSignActionData
  )
}
