export function getLocationSearch (searchString = '') {
  const search = {}
  const items = searchString.match(/[^&?]*?=[^&?]*/g)
  if (items) {
    items.map(item => item.split('='))
    .forEach(couples => {
      search[couples[0]] = decodeURIComponent(couples[1])
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

export function getUpdatedSearchString (search) {
  const oldSearch = getLocationSearch(window.location.search)
  const newSearch = Object.assign(oldSearch, search)
  return getLocationSearchString(newSearch)
}
