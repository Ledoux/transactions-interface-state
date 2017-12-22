import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withComputedProps } from 'transactions-redux-react'

export const withoutSigninPaths = ['/signin', '/signup']

export const Header = compose(
  connect(({ authorization,
    navigation: { menuLinks },
    router: { location: { pathname }, params },
    user
  }) => {
    const newState = { isSigninPage: withoutSigninPaths.includes(pathname),
      menuLinks,
      pageName: params && params.pageName,
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
  }),
  withComputedProps({
    visibleLinks: props => props.menuLinks &&
      props.menuLinks.filter(({ getIsVisible }) =>
        !getIsVisible || getIsVisible(props))
  })
)
