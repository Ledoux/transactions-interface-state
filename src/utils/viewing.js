import pluralize from 'pluralize'

export function createCardViewer (CardComponentsByComponentName) {
  const CardComponentsByCollectionName = {}
  Object.keys(CardComponentsByComponentName)
    .forEach(key => {
      const Component = CardComponentsByComponentName[key]
      const CollectionName = key.slice(0, -4)
      CardComponentsByEntityName[
        `${CollectionName[0].toLowerCase()}${CollectionName.slice(1)}`] = Component
    })
  return (state=CardComponentsByCollectionName) => state
}

export function createItemViewer (ItemComponentsByComponentName) {
  const ItemComponentsByCollectionName = {}
  Object.keys(ItemComponentsByComponentName)
    .forEach(key => {
      const Component = ItemComponentsByComponentName[key]
      const CollectionName = pluralize(key.slice(0, -4), 2)
      ItemComponentsByCollectionName[
        `${CollectionName[0].toLowerCase()}${CollectionName.slice(1)}`
      ] = Component
    })
  return (state=ItemComponentsByCollectionName) => state
}
