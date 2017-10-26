import React, { Component } from 'react'

export const withDefaultProps = defaultProps => WrappedComponent => {
  class _withDefaultProps extends Component {
    render () {
      return <WrappedComponent {...defaultProps} {...this.props} />
    }
  }
  return _withDefaultProps
}
