'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiFetch = apiFetch;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkResponseStatus(response) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$extraAllow = _ref.extraAllow,
      extraAllow = _ref$extraAllow === undefined ? [] : _ref$extraAllow;

  if (response.status >= 200 && response.status < 300 || extraAllow && extraAllow.indexOf(response.status) !== -1) {
    return response;
  }
  throw new Error(response.status + ': ' + response.statusText);
}

function mandatory(param) {
  throw new Error('Missing parameter: ' + param);
}

function apiFetch() {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory('endpoint');
  var config = arguments[1];

  var fetchConfig = (0, _lodash2.default)({
    headers: {
      'Content-Type': 'application/json'
    },
    // IMPORTANT !!!
    // send cookies, so we can use req.user on server
    credentials: 'same-origin'
  }, config);
  return window.fetch(endpoint, fetchConfig).then(checkResponseStatus).then(function (req) {
    if (req.redirected) {
      window.location = req.url;
      return;
    }
    return req.json();
  });
}