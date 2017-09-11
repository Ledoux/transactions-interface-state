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

  const mapStateToProps = ({ navigation: { isActive },
    router: { location: { pathname } },
    user: { email }
  }) => {
    return { email,
      isActive,
      pathname
    }
  }

  return connect(mapStateToProps, { closeNavigation })(_Navigation)
}
