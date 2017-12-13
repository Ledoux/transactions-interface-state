import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
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
  _Modal.defaultProps = {
    search: {}
  }
  _Modal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    beforeCloseModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    content: PropTypes.node
  }
  return connect(state => {
    const { modal: { beforeCloseModal,
        content,
        isActive,
        isCtaCloseButton,
        isCornerCloseButton,
        isOutCloseButton
      },
      router: { search }
    } = state
    const SearchComponent = search.modal &&
      getViewerComponent(state, 'modal', search.modal)
    return { beforeCloseModal,
      content,
      isActive,
      isCtaCloseButton,
      isCornerCloseButton,
      isOutCloseButton,
      search: SearchComponent && search,
      SearchComponent
    }
  }, { closeModal, showModal })(_Modal)
}
