// REALLY NEEDED TO NOT BE IN AUTH !!
// Determine all the conditions
// hacky.
// TODO: smt like: !getStore().getState().user
export function isUserIn () {
  return window.__INITIAL_STATE__.user && window.__INITIAL_STATE__.user.email
}

export function isActiveUserIn () {
  return isUserIn() && window.__INITIAL_STATE__.user.active
}

export function isAdminUserIn () {
  return isActiveUserIn() && window.__INITIAL_STATE__.user.admin
}
