import React, { Component } from 'react'
import { connect } from 'react-redux'

export const withTrackingPageView = WrappedComponent => {
  class _withTrackingPage extends Component {
    componentWillReceiveProps ({ pathname, trackPageView }) {
      if (pathname !== this.props.pathname) {
        trackPageView()
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return connect(({ router: { location: { pathname } },
    tracking: { trackPageView } }) =>
    ({ pathname, trackPageView }))(_withTrackingPage)
}
