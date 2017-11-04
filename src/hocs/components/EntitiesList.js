import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNormalizerEntities,
  request
} from 'transactions-redux-react'

export const EntitiesList = WrappedComponent => {
  class _EntitiesList extends Component {
    constructor () {
      super()
      this.state = { warning: null }
      this.handleRequest = this._handleRequest.bind(this)
    }
    _handleRequest (props, prevProps = {}) {
      const { collectionName, queryString, request } = props
      if (collectionName) {
        if (collectionName !== prevProps.collectionName || (
          queryString !== prevProps.queryString)) {
          try {
            const query = queryString && JSON.parse(queryString)
            this.setState({ warning: null })
            request('GET', [{
              collectionName,
              query
            }])
          } catch (error) {
            console.warn(error)
            this.setState({ warning: error.toString() })
          }
        }
      }
    }
    componentWillMount () {
      this.handleRequest(this.props)
    }
    componentWillReceiveProps (nextProps) {
      this.handleRequest(nextProps, this.props)
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  function mapStateToProps (state, ownProps) {
    return {
      collection: state.normalizer[`${ownProps.collectionName}ById`],
      entities: getNormalizerEntities(state, ownProps.collectionName)
    }
  }
  return connect(mapStateToProps, { request })(_EntitiesList)
}
