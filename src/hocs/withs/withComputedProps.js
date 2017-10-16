import React, { Component } from 'react'
import reselect from 'reselect'

export const withComputedProps = (patch, config = {}) => WrappedComponent => {
  const { isOnlyMount } = config
  class _withComputedProps extends Component {
    constructor (props) {
      super (props)
      this.compute = this._compute.bind(this)
    }
    _compute (props) {
      // init
      const newState = {}
      // compute each value for each key
      // (best practice here is to use reselect methods as value)
      Object.keys(patch)
        .forEach(key => {
          newState[key] = patch[key](props)
        })
      this.setState(newState)
    }
    componentWillMount () {
      this.compute(this.props)
    }
    componentWillReceiveProps (nextProps) {
      if (!isOnlyMount) {
        this.compute(nextProps)
      }
    }
    render () {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
  return _withComputedProps
}
