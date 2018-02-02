import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { closeInformation } from 'transactions-interface-state'
import { mergeNormalizerEntities
} from 'transactions-redux-normalizer'
import { withRequestedEntities } from 'transactions-redux-react'
import { request } from 'transactions-redux-request'

export const Information = WrappedComponent => {
  class _Information extends Component {
    componentDidUpdate (prevProps) {
      const { closeInformation,
        currentTourUser,
        isActive,
        mergeNormalizerEntities,
        pageName,
        request,
        notSeenNotifications,
        userId
      } = this.props
      // when we close the information menu
      // we can set to seen the previous unseen notifications
      if (prevProps.isActive && !isActive) {
        if (!notSeenNotifications) {
          return
        }
        if (currentTourUser) {
          const entities = notSeenNotifications.map(notSeenNotification => {
            return { id: notSeenNotification.id,
              isSeen: true
            }
          })
          mergeNormalizerEntities('notifications', entities)
        } else if (notSeenNotifications.length > 0) {
          request('PUT', [{ collectionName: 'notifications',
            query: { isSeen: false,
              userId
            },
            update: { isSeen: true }
          }], { tag: 'notifications' })
        }
      } else if (isActive && prevProps.pageName !== pageName) {
        closeInformation()
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return compose(
    connect(({ user: { id } }) => ({ userId: id })),
    withRequestedEntities(({ userId }) =>
      userId && [{ collectionName: 'notifications', query: { userId } }]),
    connect(({ information: { isActive },
      router: { params: { pageName } },
      tour: { currentTourUser }
    }, { notifications }) => {
      const notSeenNotifications = notifications && notifications.filter(
        ({ isSeen }) => !isSeen)
      return { isActive,
        currentTourUser,
        notSeenNotifications,
        pageName
      }
    }, {
      closeInformation,
      mergeNormalizerEntities,
      request
    })
  )(_Information)
}
