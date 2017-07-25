import flatten from 'lodash.flatten'
import { getReducerPackage } from 'transactions-redux-normalizer'

import { getLocationSearch } from '../utils/navigation'

// automatic packager
const reducerPackage = getReducerPackage('form')
const { deleteFormEntity,
  getFormEntity,
  mergeFormEntity
} = reducerPackage

// special action
const REQUEST_FORM_PUT = reducerPackage.REQUEST_FORM_PUT = 'REQUEST_FORM_PUT'
reducerPackage.requestFormPut = () => {
  return {
    type: REQUEST_FORM_PUT
  }
}
reducerPackage.updateFormJoinEntity = (collectionName, join, entity) => {
  const { previousId, nextId } = join
  return !nextId
   ? (previousId
    ? deleteFormEntity(collectionName, previousId)
    : (entity.id
        ? mergeFormEntity(collectionName, '_NEW_', entity)
        : mergeFormEntity(collectionName, '_NEW_',
          Object.assign({ id: '_NEW_'}, entity))
      )
    )
   : mergeFormEntity(collectionName, nextId, '_DELETE_')
}

// special selectors
reducerPackage.getFormPutOptions = ({ form }) => {
  const formPutOptions = flatten(Object.keys(form).map(key => {
    const collection = form[key]
    const collectionName = key.slice(0, -4)
    return Object.keys(collection).map(id => {
      const entity = collection[id]
      return {
        collectionName,
        query: { id },
        update: entity
      }
    })
  }))
  return formPutOptions.length > 0 && formPutOptions
}

const getFormJoinEntity = reducerPackage.getFormJoinEntity = (state, collectionName, joinedEntities) => {
  // look first in the store state if we have the joined entity already
  const joinEntity = joinedEntities && joinedEntities[0]
  if (!joinEntity) {
    return
  }
  // now we need to know also in the form state what it is about,
  // if the joinEntity exists, then we need to check that in the form
  // store there is first a delete version of it
  // it the joinEntity does not exists, maybe the user already performed
  // in the form store a _NEW_ action before
  const formEntity = getFormEntity(state, collectionName,
    (joinEntity && joinEntity.id) || '_NEW_')
  // maybe the entity is then at the DELETE state so we don't have to return it
  // also in that case
  if (formEntity) {
    return formEntity !== '_DELETE_'
      ? formEntity
      : {
        id: joinEntity && joinEntity.id,
        _DELETE_: true
      }
  } else {
    // else return the existing or not joinEntity
    return joinEntity
  }
}
reducerPackage.getFormJoinEntities = (state, collectionNames) => {
  return collectionNames.map(collectionName =>
    getFormJoinEntity(state, collectionName))
}
const getFormJoin = reducerPackage.getFormJoin = (state, collectionName) => {
  const formJoinEntity = reducerPackage.getFormJoinEntity(state, collectionName)
  return {
    nextId: formJoinEntity && !formJoinEntity._DELETE_ && formJoinEntity.id,
    previousId: formJoinEntity && formJoinEntity._DELETE_ && formJoinEntity.id
  }
}
reducerPackage.getFormJoins = (state, collectionNames) => {
  return collectionNames.map(collectionName =>
    getFormJoin(state, collectionName))
}
reducerPackage.getNewForm = () => {
  const search = getLocationSearch(window.location.search)
  return (search.form && JSON.parse(decodeURI(search.form)))
}

export default reducerPackage
