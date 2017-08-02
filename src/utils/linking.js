// LINKS
export function isAuthorizedLink (link, authorizedModeNames) {
  const { label, modeNames } = link
  if (modeNames) {
    return modeNames.find(modeName =>
      authorizedModeNames.includes(modeName))
  }
  return label
}

export function getAuthorizedLinks (authorizedModes, menuLinks = []) {
  return menuLinks.filter(link => isAuthorizedLink(link, authorizedModeNames))
    .map(({label, path}) => { return {label, path} })
}
