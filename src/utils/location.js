export function getLocationSearch (searchString = '') {
  const search = {}
  const items = searchString.match(/[^&?]*?=[^&?]*/g)
  if (items) {
    items.map(item => item.split('='))
    .forEach(couples => {
      let value = decodeURIComponent(couples[1])
      /*
      const parseMatch = value.match(/_PARSE_(.*)/)
      if (parseMatch && parseMatch[1]) {
        value = JSON.parse(parseMatch[1])
      }
      */
      search[couples[0]] = value
    })
  }
  return search
}

export function getLocationSearchString (search) {
  return search && Object.keys(search)
    .map(key => {
      const value = String(search[key])
      return value && `${key}=${value}`
    }).filter(arg => arg)
      .join('&')
}

export function getUpdatedSearchString (...searchs) {
  const nextSearch = Object.assign({}, ...searchs)
  return getLocationSearchString(nextSearch)
}
