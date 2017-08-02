import merge from 'lodash.merge'
import { call, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import { REQUEST_AUTHORIZED_API } from '../reducers/authorization'
import { apiFetch } from '../utils/apis'

const AUTH_RENEWAL_THRESHOLD = 1000 * 60 * 5 // 5 minutes before expiry

export function hasValidAuthToken (user) {
  const { authToken, authTokenExpiry } = user
  return authToken && authTokenExpiry &&
    (authTokenExpiry - Date.now() > AUTH_RENEWAL_THRESHOLD)
}

export function getNewAuthToken (user, url) {
  return window.fetch(`${url}/authenticate`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
     // send cookies, so we can use req.user on server
    credentials: 'same-origin',
    body: JSON.stringify({ email: user.email })
  }).then(req => req.json())
    .catch(e => {
      console.log('/authenticate gave error', e)
    })
}

// DATA

// use this function to automatically handle
// ensuring having valid api auth
// to be able to fulfill api request
export function * getAuthorizationData (action) {
  const user = yield select(({user}) => user)
  // if there is no user, it means we are not yet auth
  // so we can just look at the collectionNames
  // available for the guests
  if (typeof user.authToken === 'undefined') {
    if (action.method === 'GET') {
      const subscription = action.subscription
      const guestMode = subscription && subscription.guestMode
      const availableCollectionNames = guestMode && guestMode.availableCollectionNames
      return availableCollectionNames && availableCollectionNames.includes(action.collectionName)
    }
  }
  // else we need to check first the good set of the token
  if (!hasValidAuthToken(user)) {
    if (!action.extra || !action.extra.signPath) {
      console.warn('failed to get the extra.signPath in action')
      return
    }
    // get new auth token
    const response = yield call(getNewAuthToken, user, action.extra.signPath)
    if (response.error) {
      console.warn('failed to get new auth token', response.error)
      return
    }
    return response.authToken
  } else {
    return user.authToken
  }
}

function * fromWatchRequestAuthorizedApiActionData (action) {
  const authToken = yield call(getAuthorizationData)
  yield call(apiFetch, action.endpoint, merge({
    headers: { Authorization: `JWT ${authToken}` }
  }, action.config))
}

// WATCHES
export function * watchRequestAuthorizedApiAction () {
  yield * takeEvery(REQUEST_AUTHORIZED_API,
    fromWatchRequestAuthorizedApiActionData
  )
}
