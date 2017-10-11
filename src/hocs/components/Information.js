import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeInformation } from 'transactions-interface-state'
import { getNormalizerEntities,
  mergeNormalizerEntities
} from 'transactions-redux-normalizer'
import { request } from 'transactions-redux-request'

export const Information = WrappedComponent => {
  class _Information extends Component {
    constructor () {
      super ()
      this.state = { hasRequestedOnce: false }
    }
    componentDidMount () {
      const { request,
        userId
      } = this.props
      const { hasRequestedOnce } = this.state
      if (userId && !hasRequestedOnce) {
        this.setState({ hasRequestedOnce: true })
        /*
        request('GET', [{
          collectionName: 'notifications',
          query: { userId },
        }], { tag: 'notifications' })
        */
      }
    }
    componentDidUpdate (prevProps) {
      const { closeInformation,
        currentTourUser,
        isActive,
        pathname,
        request,
        notSeenNotifications,
        userId
      } = this.props
      // when we close the information menu
      // we can set to seen the previous unseen notifications
      if (prevProps.isActive && !isActive) {
        if (currentTourUser) {
          const entities = notSeenNotifications.map(notSeenNotification => {
            return {
              id: notSeenNotification.id,
              isSeen: true
            }
          })
          mergeNormalizerEntities('notifications', entities)
        } else if (notSeenNotifications.length > 0) {
          request('PUT', [{ collectionName: 'notifications',
            query: {
              isSeen: false,
              userId
            },
            update: { isSeen: true }
          }], { tag: 'notifications' })
        }
      } else if (isActive && prevProps.pathname !== pathname) {
        closeInformation()
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    const { information: { isActive },
      reselector: { reselect },
      router: { location: { pathname } },
      tour: { currentTourUser },
      user: { id }
    } = state
    const notifications = getNormalizerEntities(state, 'notifications')
    const notSeenNotifications = reselect(state, 'WITH_NOT_IS_SEEN', 'notifications')
    return { isActive,
      currentTourUser,
      notifications,
      notSeenNotifications,
      pathname,
      userId: id
    }
  }

  return connect(mapStateToProps, { closeInformation,
    mergeNormalizerEntities,
    request
  })(_Information)
}
