import pluralize from 'pluralize'

export function createCardViewer (CardComponentsByComponentName) {
  const CardComponentsByEntityName = {}
  Object.keys(CardComponentsByComponentName)
    .forEach(key => {
      const Component = CardComponentsByComponentName[key]
      const collectionName = key.slice(0, -4)
      CardComponentsByEntityName[
        `${collectionName[0].toLowerCase()}${collectionName.slice(1)}`] = Component
    })
  return (state=CardComponentsByEntityName) => state
}

export function createItemViewer (ItemComponentsByComponentName) {
  const ItemComponentsByCollectionName = {}
  Object.keys(ItemComponentsByComponentName)
    .forEach(key => {
      const Component = ItemComponentsByComponentName[key]
      const collectionName = pluralize(key.slice(0, -4), 2)
      ItemComponentsByCollectionName[
        `${collectionName[0].toLowerCase()}${collectionName.slice(1)}`
      ] = Component
    })
  return (state=ItemComponentsByCollectionName) => state
}
