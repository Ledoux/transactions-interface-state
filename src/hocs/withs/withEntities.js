import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import shortid from 'shortid'
import { assignReselectorFilter } from 'transactions-redux-reselector'
import { requestConfigConstants } from 'transactions-query-encode'

import { withComputedProps } from './withComputedProps'
import { withRequest } from './withRequest'

export const withEntities = entitiesKey => WrappedComponent => {
  class _withEntities extends Component {
    constructor () {
      super()
      this.handleReselectorFilter = this._handleReselectorFilter.bind(this)
    }
    _handleReselectorFilter () {
      const { assignReselectorFilter,
        isSearch,
        label,
        query
      } = this.props
      if (!query) {
        return
      }
      const _query = Object.assign({}, query)
      const queryKeys = Object.keys(query)
      // look if there is not in the query some request configs
      // that are not taking part to the filter process
      requestConfigConstants.forEach(requestConfigConstant => {
        if (queryKeys.includes(requestConfigConstant)) {
          delete _query[requestConfigConstant]
        }
      })
      // assign
      assignReselectorFilter(`WITH_${label.toUpperCase()}_AUTOMATIC_JOIN`, _query)
    }
    componentWillMount () {
      this.handleReselectorFilter()
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  // we get the entities from the pipelined entities
  // stored in the location reducer
  function mapStateToProps(state, ownProps) {
    // unpack
    const { collectionName,
      isSearch,
      label,
    } = ownProps
    const listQuery = ownProps.query
    const { reselector: { reselect,
        WITH_SIGN_SEARCH: { query,
          sign
        }
      }
    } = state
    // init
    const newState = {}
    // no need to go further if no collectionName
    if (!collectionName) {
      return newState
    }
    // let s see if we need to restrict because of a search filter
    const parentFilterId = listQuery
      ? `WITH_${label.toUpperCase()}_AUTOMATIC_JOIN`
      : 'ALL'
    let filterName
    const reselectOption = { isRecursive: true }
    if (!isSearch || !query || sign !== label) {
      filterName = parentFilterId
    } else {
      filterName = 'WITH_SIGN_SEARCH'
      // we want to cumulate the search filter with the all or automatic join one
      reselectOption.parent = { filterId: parentFilterId,
        option: Object.assign({}, reselectOption)
      }
    }
    // set
    newState[entitiesKey || collectionName] = reselect(state,
      filterName, collectionName, reselectOption)
    // return
    return newState
  }
  return compose(
    withComputedProps({
      label: createSelector(({ label }) => label,
        ({ collectionName }) => collectionName,
        (label, collectionName) => label || `${collectionName}-${shortid()}`)
      /*
      filterName: ({ isSearch, label, query }) => {
        let filterName
        if (!isSearch || !query || sign !== label) {
          filterName = parentFilterId
        } else {
      }
      */
    }),
    withRequest(['collectionName', 'query'],
      ({ collectionName, config, label, query }) => [
        'GET',
        [{ collectionName, query }],
        Object.assign({ tag: label }, config)
      ]),
    connect(mapStateToProps, { assignReselectorFilter })
  )(_withEntities)
}
