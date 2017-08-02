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

export function getIsEditOrNewNotBlock (search, nextSearch) {
  const isEdit = search.isEdit === 'true'
  const isNew = search.slug === 'new'
  // We here handle the fact that the user may want to change the page, but
  // a content is still been modified, so we have to know if the user wants
  // really to leave
  const isForcingLocationChange = search.isForcingLocationChange === 'true'
  const nextIsForcingLocationChange = nextSearch.isForcingLocationChange === 'true'
  const nextIsEdit = nextSearch.isEdit === 'true'
  if (!nextIsForcingLocationChange && (
    (isEdit && !nextIsEdit) || (isNew && !isForcingLocationChange)
  )) {
    // return false to block the change of location
    return false
  }
}
