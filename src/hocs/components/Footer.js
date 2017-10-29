import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from 'transactions-redux-request'

import { showModal } from '../../reducers/modal'
import { getViewerComponent } from '../../reducers/viewer'

export const Footer = WrappedComponent => {
  class _Footer extends Component {
    constructor () {
      super()
      this.onSubscribeClick = this._onSubscribeClick.bind(this)
    }
    _onSubscribeClick (email) {
      const { ModalComponent,
        newsletterSubtitle,
        newsletterTitle,
        request,
        showModal
      } = this.props
      //request('POST', [{ email }])
      ModalComponent && showModal(
        <ModalComponent
          subtitle={newsletterSubtitle}
          title={newsletterTitle} />,
        { isCtaCloseButton: true }
      )
    }
    render () {
      return <WrappedComponent {...this.props}
        onSubscribeClick={this.onSubscribeClick} />
    }
  }
  _Footer.defaultProps = { newsletterSubtitle: 'We will keep you informed about the next updates!',
    newsletterTitle: 'Thanks a lot!'
  }
  return connect((state, { newsletterModal }) => ({
    ModalComponent: getViewerComponent(state, 'modal', newsletterModal || 'confirmation')
  }), { request,
    showModal
  })(_Footer)
}
