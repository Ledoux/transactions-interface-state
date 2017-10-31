import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeModal,
  showModal
} from '../../reducers/modal'
import { getViewerComponent } from '../../reducers/viewer'
import { getLocationSearchString } from '../../utils/location'

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
  _Modal.PropTypes = {
    isActive: PropTypes.bool.isRequired,
    beforeCloseModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    content: PropTypes.node
  }
  const mapStateToProps = state => {
    const { modal: { beforeCloseModal,
        content,
        isActive,
        isCtaCloseButton,
        isCornerCloseButton,
        isOutCloseButton
      },
      search
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
  }
  return connect(mapStateToProps, { closeModal,
    showModal
  })(_Modal)
}
