import shallowCompare from 'react-addons-shallow-compare'

import { diff } from './diff'

export function getIsEntitiesEqual (entities, prevEntities) {
  return entities.length === prevEntities.length &&
    entities.every((entity, index) => entity.id === prevEntities[index].id)
}

export function entitiesShallowCompare (ReactElement, nextProps, nextState) {
  const { _entitiesKeys,
    props,
    state
  } = ReactElement
  const propsWithoutKeys = Object.assign({}, props)
  const nextPropsWithoutKeys = Object.assign({}, nextProps)
  if (_entitiesKeys) {
    for (let _entitiesKey of _entitiesKeys) {
      const isEqual = getIsEntitiesEqual(nextProps[_entitiesKey], props[_entitiesKey])
      if (!isEqual) {
        return true
      }
      delete propsWithoutKeys[_entitiesKey]
      delete nextPropsWithoutKeys[_entitiesKey]
    }
  } else {
    console.warn('You called for entitiesShallowCompare but you there is no this._entitiesKeys')
  }
  const isShallowCompare = shallowCompare({ props: propsWithoutKeys,
    state
  }, nextPropsWithoutKeys, nextState)
  return isShallowCompare
}
