import React, { Component } from 'react'

export const withProps = extraProps => WrappedComponent => {
  class _withProps extends Component {
    render () {
      return <WrappedComponent {...this.props} {...extraProps} />
    }
  }
  return _withProps
}
