import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from 'transactions-redux-request'

export const withRequest = (onKeys, getRequestArgs) => WrappedComponent => {
  class _withRequest extends Component {
    constructor (props) {
      super (props)
      this.handleRequest = this._handleRequest.bind(this)
      if (onKeys.some(onKey => props[onKey])) {
        this.handleRequest(props)
      }
    }
    componentWillReceiveProps (nextProps) {
      if (onKeys.some(onKey => {
        const nextValue = nextProps[onKey]
        return nextValue && nextValue !== this.props[onKey]
      })) {
        this.handleRequest(nextProps)
      }
    }
    _handleRequest (props) {
      const requestArgs = getRequestArgs(props)
      props.request(...requestArgs)
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return connect(null, { request })(_withRequest)
}
