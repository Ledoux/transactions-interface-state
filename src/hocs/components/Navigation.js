import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeNavigation } from '../../reducers/navigation'

export const Navigation = WrappedComponent => {
  class _Navigation extends Component {
    componentDidUpdate (prevProps) {
      const { closeNavigation,
        isActive,
        pageName
      } = this.props
      if (isActive && prevProps.pageName !== pageName) {
        closeNavigation()
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return connect(
    state => ({
      email: user.email,
      isActive: state.navigation.isActive,
      pageName: state.router.params.pageName,
    }),
    { closeNavigation }
  )(_Navigation)
}
