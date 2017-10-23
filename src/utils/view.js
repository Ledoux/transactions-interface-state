import pluralize from 'pluralize'

function createView (categoryName, componentsByComponentName = {}, config = {}) {
  const { isPlural } = config
  const componentsBySingularOrPluralName = {}
  Object.keys(componentsByComponentName)
    .forEach(key => {
      const Component = componentsByComponentName[key]
      const name = key.slice(0, -categoryName.length)
      const prefixName = isPlural ? pluralize(name, 2) : name
      componentsBySingularOrPluralName[
        `${prefixName[0].toLowerCase()}${prefixName.slice(1)}`
      ] = Component
    })
  return componentsBySingularOrPluralName
}

export default createView
