import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { getLocationSearchString } from 'transactions-redux-react'

import { closeModal,
  showModal
} from '../../reducers/modal'
import { getViewerComponent } from '../../reducers/viewer'

export const Modal = WrappedComponent => {
  class _Modal extends Component {
    constructor () {
      super()
      this.handleNavigation = this._handleNavigation.bind(this)
      this.onCloseClick = this._onCloseClick.bind(this)
    }
    componentDidMount () {
      this.handleNavigation()
    }
    componentDidUpdate (prevProps) {
      if (this.props.SearchComponent !== prevProps.SearchComponent) {
        this.handleNavigation()
      }
    }
    _handleNavigation () {
      const { search,
        SearchComponent,
        showModal
      } = this.props
      if (SearchComponent) {
        showModal(<SearchComponent {...search} />)
      }
    }
    _onCloseClick () {
      const { closeModal } = this.props
      closeModal()
    }
    render () {
      return <WrappedComponent {...this.props}
        onCloseClick={this.onCloseClick} />
    }
  }
  _Modal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    beforeCloseModal: PropTypes.func,
    closeModal: PropTypes.func.isRequired
  }
  return compose(
    withRouter,
    connect((state, ownProps) => {
      const { modal: { beforeCloseModal,
          ContentComponent,
          isActive,
          isCtaCloseButton,
          isCornerCloseButton,
          isOutCloseButton
        },
      } = state
      const { location: { query } } = ownProps
      const SearchComponent = query.modal &&
        getViewerComponent(state, 'modal', query.modal)
      return { beforeCloseModal,
        ContentComponent,
        isActive,
        isCtaCloseButton,
        isCornerCloseButton,
        isOutCloseButton,
        search: SearchComponent && query,
        SearchComponent
      }
    }, { closeModal, showModal })
  )(_Modal)
}
