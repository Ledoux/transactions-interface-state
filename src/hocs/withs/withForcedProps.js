import React, { Component } from 'react'

export const withForcedProps = forcedProps => WrappedComponent => {
  class _withForcedProps extends Component {
    render () {
      return <WrappedComponent {...this.props} {...forcedProps} />
    }
  }
  return _withForcedProps
}
