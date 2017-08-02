import pluralize from 'pluralize'

export function createSubscription (config = {}) {
  // unpack
  const { modes,
    hasJoinedModeAccess
  } = config
  let guestMode
  // determine first which are automatic modes (ie guest, user, admin)
  // and the customized joined ones
  const automaticModes = []
  const joinedModes = []
  modes.forEach(mode => {
    if (mode.isJoin) {
      mode.hasModeAccess = hasJoinedModeAccess
      joinedModes.push(mode)
    } else {
      automaticModes.push(mode)
    }
  })
  // build some attached variables
  const joinedModeNames = joinedModes.map(mode => mode.name)
  const joinedModeCollectionNames = joinedModeNames.map(modeName =>
    pluralize(modeName, 2))
  const modeNames = modes.map(mode => mode.name)

  // build the inverse hmap that for a certain content collection
  // I need to know what is the matched authorized user mode collection
  const modeNamesBySingularOrPluralName = {}
  const modesBySingularOrPluralName = {}
  // set the joins given the ones defined in the modes
  const modeJoinsByCollectionName = {}
  modes.forEach(mode => {
    const {
      availableCollections,
      collectionName,
      name
    } = mode
    // guestMode
    if (name === 'guest') {
      guestMode = mode
    }
    // pluralize
    mode.collectionName = pluralize(name, 2)
    mode.availableCollectionNames = Array(availableCollections.length)
    mode.availableEntityNames = Array(availableCollections.length)
    availableCollections.forEach((collection, index) => {
      const entityName = pluralize(collection.name, 1)
      modesBySingularOrPluralName[entityName] = mode
      modesBySingularOrPluralName[collection.name] = mode
      modeNamesBySingularOrPluralName[entityName] = name
      modeNamesBySingularOrPluralName[collection.name] = name
      mode.availableEntityNames[index] = entityName
      mode.availableCollectionNames[index] = collection.name
      mode.availableSingularOrPluralNames = mode.availableEntityNames.concat(
        mode.availableCollectionNames
      )
      modeJoinsByCollectionName[collection.name] = collection.join
    })
  })
  // return
  return { guestMode,
    modeJoinsByCollectionName,
    modeNames,
    modes
  }
}
