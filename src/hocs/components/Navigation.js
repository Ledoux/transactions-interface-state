import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeNavigation } from '../../reducers/navigation'

export const Navigation = WrappedComponent => {
  class _Navigation extends Component {
    componentDidUpdate (prevProps) {
      const { closeNavigation,
        isActive,
        pathname
      } = this.props
      if (isActive && prevProps.pathname !== pathname) {
        closeNavigation()
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return connect(({ navigation: { isActive },
      router: { location: { pathname } },
      user: { email }
    }) => ({ email,
      isActive,
      pathname
    }), { closeNavigation })(_Navigation)
}
