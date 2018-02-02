import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withComputedProps } from 'transactions-redux-react'

export const withoutSignPageNames = ['/signin', '/signup']

export const Header = compose(
  connect(({ authorization,
    navigation: { menuLinks },
    router: { params: { pageName } },
    user
  }) => {
    const newState = { isSigninPage: withoutSignPageNames.includes(pageName),
      menuLinks,
      pageName
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
