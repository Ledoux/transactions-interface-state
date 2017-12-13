import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from 'transactions-redux-request'

import { showModal } from '../../reducers/modal'
import { getViewerComponent } from '../../reducers/viewer'

const mailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const Footer = WrappedComponent => {
  class _Footer extends Component {
    constructor () {
      super()
      this.onSubscribeClick = this._onSubscribeClick.bind(this)
    }
    _onSubscribeClick (email) {
      const { ConfirmationComponent,
        confirmationSubtext,
        confirmationText,
        request,
        showModal,
        WarningComponent,
        warningSubtext,
        warningText
      } = this.props
      if (mailTest.test(email)) {
        // request
        request('POST', [{
          collectionName: 'subscribers',
          documents: [{ email }]
        }], { tag: 'subscribers'})
        // modal
        ConfirmationComponent && showModal(
          <ConfirmationComponent subtext={confirmationSubtext}
            text={confirmationText} />,
          { isCtaCloseButton: true }
        )
      } else {
        // modal
        WarningComponent && showModal(
          <WarningComponent subtext={warningSubtext}
            text={warningText} />
        )
      }
    }
    render () {
      return <WrappedComponent {...this.props}
        onSubscribeClick={this.onSubscribeClick} />
    }
  }
  _Footer.defaultProps = { confirmationSubtext: 'We will keep you informed about the next updates!',
    confirmationText: 'Thanks a lot!',
    warningSubtext: 'You need to enter a valid email',
    warningText: 'Wrong shape!'
  }
  return connect((state, { newsletterModal }) => ({
    ConfirmationComponent: getViewerComponent(state, 'modal', 'confirmation'),
    siteEmail: state.setup.siteEmail,
    WarningComponent: getViewerComponent(state, 'modal', 'warning')
  }), { request,
    showModal
  })(_Footer)
}
