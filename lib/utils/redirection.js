'use strict';

var _modes = require('./modes');

var getNotUserInRedirectPathname = function getNotUserInRedirectPathname(_ref) {
  var location = _ref.location,
      match = _ref.match;

  if (!(0, _modes.isUserIn)()) {
    var queryString = location.search;
    if (location.pathname !== '/') {
      queryString = (location.search ? location.search + '&' : '?') + ('returnTo=' + encodeURIComponent(location.pathname + location.search) + '\n        &returnMessage=' + encodeURIComponent('You need to have an account to go on this page '));
    }
    return '/signin' + queryString;
  }
};

var getNotActiveUserInRedirectPathname = function getNotActiveUserInRedirectPathname(router) {
  var location = router.location;

  if (!(0, _modes.isActiveUserIn)()) {
    var queryString = location.search;
    var returnMessage = 'You need to have activated your account';
    if (location.pathname !== '/') {
      queryString = (location.search ? location.search + '&' : '?') + ('returnTo=' + encodeURIComponent(location.pathname + location.search) + '\n        &returnMessage=' + encodeURIComponent(returnMessage));
    }
    return '/account';
  } else {
    return getNotUserInRedirectPathname(router);
  }
};

var getNotAdminUserInRedirectPathname = function getNotAdminUserInRedirectPathname(router) {
  var location = router.location;

  if (!(0, _modes.isAdminUserIn)()) {
    var queryString = location.search;
    var returnMessage = 'You need to be admin to visit this page';
    if (location.pathname !== '/') {
      queryString = (location.search ? location.search + '&' : '?') + ('returnTo=' + encodeURIComponent(location.pathname + location.search) + '\n        &returnMessage=' + encodeURIComponent(returnMessage));
    }
    return '/account' + queryString;
  } else {
    return getNotActiveUserInRedirectPathname(router);
  }
};

var getNotSpecialUserInRedirectPathname = function getNotSpecialUserInRedirectPathname(modeName, router) {
  var location = router.location;

  if (!isSpecialUserIn()) {
    var queryString = location.search;
    var returnMessage = 'You need to be ' + modeName + ' to visit this page';
    if (location.pathname !== '/') {
      queryString = (location.search ? location.search + '&' : '?') + ('returnTo=' + encodeURIComponent(location.pathname + location.search) + '\n        &returnMessage=' + encodeURIComponent(returnMessage));
    }
    return '/account' + queryString;
  } else {
    return getNotActiveUserInRedirectPathname(router);
  }
};

var getRedirectPathnameMethodsByName = {
  getNotUserInRedirectPathname: getNotUserInRedirectPathname,
  getNotActiveUserInRedirectPathname: getNotActiveUserInRedirectPathname,
  getNotAdminUserInRedirectPathname: getNotAdminUserInRedirectPathname,
  getNotSpecialUserInRedirectPathname: getNotSpecialUserInRedirectPathname
};