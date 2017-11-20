import { IS_ALL_DEEP_JOINS,
  IS_ALL_JOINS,
  withJoinedEntities
} from 'transactions-redux-react'

import pluralize from 'pluralize'

function createView (categoryName, ComponentsByName = {}, config = {}) {
  // unpack
  const { collectionNames, isJoin, isPlural } = config
  const componentsBySingularOrPluralName = {}
  // map
  Object.keys(ComponentsByName)
    .forEach(key => {
      // unpack
      const Component = ComponentsByName[key]
      let contentName = key.slice(0, -categoryName.length)
      contentName = `${contentName[0].toLowerCase()}${contentName.slice(1)}`
      const collectionName = pluralize(contentName, 2)
      contentName = isPlural ? collectionName : contentName
      // set
      componentsBySingularOrPluralName[contentName] = Component
    })
  return componentsBySingularOrPluralName
}

export default createView
