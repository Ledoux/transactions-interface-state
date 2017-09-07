export function handleBeforeNavigation (config) {
  const { closeInformation,
    closeNavigation,
    isInformationActive,
    isNavigationActive
  } = config
  isNavigationActive && closeNavigation()
  isInformationActive && closeInformation()
  return true
}
