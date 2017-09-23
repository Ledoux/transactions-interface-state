import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

const withoutSigninPaths = ['/signin', '/signup']

export const Header = WrappedComponent => {
  class _Header extends Component {
    constructor () {
      super ()
      this.state = { visibleLinks: null }
      this.handleFilterVisibleLinks = this._handleSetVisibleLinks.bind(this)
    }
    componentWillMount() {
      this.handleFilterVisibleLinks(this.props)
    }
    componentWillReceiveProps (nextProps) {
      this.handleFilterVisibleLinks(nextProps)
    }
    _handleSetVisibleLinks (props) {
      const { menuLinks } = props
      menuLinks && this.setState({ visibleLinks: menuLinks.filter(({ getIsVisible }) =>
        !getIsVisible || getIsVisible(props)
      )})
    }
    render () {
      return <WrappedComponent {...this.props}
        state={this.state} />
    }
  }
  _Header.defaultProps = {
    menuLinks: [],
    siteName: 'Transactions'
  }
  function mapStateToProps ({ authorization,
    router: { location: { pathname } },
    user
  }) {
    const newState = { isSigninPage: withoutSigninPaths.includes(pathname),
      pathname
    }
    if (authorization) {
      const { visibleModes } = authorization
      Object.assign(newState, { visibleModes })
    }
    if (user) {
      const { active,
        firstName,
        id,
        imageUrl
      } = user
      Object.assign(newState, { active,
        firstName,
        id,
        imageUrl
      })
    }
    return newState
  }

  return connect(mapStateToProps)(_Header)
}
