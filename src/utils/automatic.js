import sample from 'lodash.sample'

// automatic navigation
export function getAutomaticCollectionName(collectionNames) {
  return sample(collectionNames, 1)
}
export function getAutomaticSlug(entities) {
  const automaticEntity = sample(entities, 1)
  return automaticEntity && automaticEntity.slug
}
