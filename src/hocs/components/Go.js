import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goBack, goForward, push } from 'react-router-redux'

export const Go = WrappedComponent => {
  class _Go extends Component {
    constructor() {
      super()
      this.onBackClick = this._onBackClick.bind(this)
      this.onForwardClick = this._onForwardClick.bind(this)
    }
    _onBackClick () {
      this.props.goBack()
      // this.props.push('/home')
    }
    _onForwardClick () {
      this.props.goForward()
    }
    render () {
      return (
        <WrappedComponent {...this.props}
          onBackClick={this.onBackClick}
          onForwardClick={this.onForwardClick}
        />
      )
    }
  }
  return connect(({ router: { pathnames } }) => ({ isBack: true,
    isForward: true }),
    { goBack, goForward, push })(_Go)
}
