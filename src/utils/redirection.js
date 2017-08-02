import { isActiveUserIn,
  isAdminUserIn,
  isUserIn
} from './modes'

const getNotUserInRedirectPathname = ({location, match}) => {
  if (!isUserIn()) {
    let queryString = location.search
    if (location.pathname !== '/') {
      queryString = (location.search ? (location.search + '&') : '?') +
        `returnTo=${encodeURIComponent(location.pathname + location.search)}
        &returnMessage=${encodeURIComponent('You need to have an account to go on this page ')}`
    }
    return `/signin${queryString}`
  }
}

const getNotActiveUserInRedirectPathname = (router) => {
  const { location } = router
  if (!isActiveUserIn()) {
    let queryString = location.search
    const returnMessage = `You need to have activated your account`
    if (location.pathname !== '/') {
      queryString = (location.search ? (location.search + '&') : '?') +
        `returnTo=${encodeURIComponent(location.pathname + location.search)}
        &returnMessage=${encodeURIComponent(returnMessage)}`
    }
    return '/account'
  } else {
    return getNotUserInRedirectPathname(router)
  }
}

const getNotAdminUserInRedirectPathname = (router) => {
  const { location } = router
  if (!isAdminUserIn()) {
    let queryString = location.search
    const returnMessage = 'You need to be admin to visit this page'
    if (location.pathname !== '/') {
      queryString = (location.search ? (location.search + '&') : '?') +
        `returnTo=${encodeURIComponent(location.pathname + location.search)}
        &returnMessage=${encodeURIComponent(returnMessage)}`
    }
    return `/account${queryString}`
  } else {
    return getNotActiveUserInRedirectPathname(router)
  }
}

const getNotSpecialUserInRedirectPathname = (modeName, router) => {
  const { location } = router
  if (!isSpecialUserIn()) {
    let queryString = location.search
    const returnMessage = `You need to be ${modeName} to visit this page`
    if (location.pathname !== '/') {
      queryString = (location.search ? (location.search + '&') : '?') +
        `returnTo=${encodeURIComponent(location.pathname + location.search)}
        &returnMessage=${encodeURIComponent(returnMessage)}`
    }
    return `/account${queryString}`
  } else {
    return getNotActiveUserInRedirectPathname(router)
  }
}

const getRedirectPathnameMethodsByName = {
  getNotUserInRedirectPathname,
  getNotActiveUserInRedirectPathname,
  getNotAdminUserInRedirectPathname,
  getNotSpecialUserInRedirectPathname
}
