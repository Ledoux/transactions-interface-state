import React, { Component } from 'react'

export const withReplacedProps = (patch, config = {}) => WrappedComponent => {
  const { isOnlyMount } = config
  class _withReplacedProps extends Component {
    constructor (props) {
      super (props)
      this.replace = this._replace.bind(this)
    }
    _replace (props, prevProps) {
      // init
      const newState = {}
      // parse to see which props has changed compared to the previous ones
      // (given shallow equality rule)
      // if there is a change then feed the new state with the new computed values
      Object.keys(patch)
        .forEach(key => {
          const value = props[key]
          if (!prevProps || value !== prevProps[key]) {
            const method = patch[key]
            newState[key] = method(props)
          }
        })
      // now check that there is one change at least
      if (Object.keys(newState).length > 0) {
        this.setState(newState)
      }
    }
    componentWillMount () {
      this.replace(this.props)
    }
    componentWillReceiveProps (nextProps) {
      if (!isOnlyMount) {
        this.replace(nextProps, this.props)
      }
    }
    render () {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
  return _withReplacedProps
}
