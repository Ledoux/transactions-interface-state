import merge from 'lodash.merge'

function checkResponseStatus (response, { extraAllow = [] } = {}) {
  if (
    (response.status >= 200 && response.status < 300) ||
    extraAllow && extraAllow.indexOf(response.status) !== -1
  ) {
    return response
  }
  throw new Error(response.status + ': ' + response.statusText)
}

function mandatory (param) {
  throw new Error('Missing parameter: ' + param)
}

export function apiFetch (endpoint = mandatory('endpoint'), config) {
  const fetchConfig = merge(
    {
      headers: {
        'Content-Type': 'application/json'
      },
      // IMPORTANT !!!
      // send cookies, so we can use req.user on server
      credentials: 'same-origin'
    },
    config
  )
  return window.fetch(endpoint, fetchConfig)
    .then(checkResponseStatus)
    .then(req => {
      if (req.redirected) {
        window.location = req.url
        return
      }
      return req.json()
    })
}
