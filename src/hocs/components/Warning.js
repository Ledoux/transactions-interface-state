import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { closeModal } from '../../reducers/modal'

export const Warning = WrappedComponent => {
  class _Warning extends Component {
    constructor () {
      super()
      this.onYesClick = this._onYesClick.bind(this)
    }
    _onYesClick () {
      const { beforeCloseModal,
        closeModal,
        nextLocation,
        push
      } = this.props
      beforeCloseModal && beforeCloseModal()
      closeModal()
      nextLocation && push(nextLocation)
    }
    render () {
      return <WrappedComponent {...this.props}
        onYesClick={this.onYesClick} />
    }
  }
  function mapStateToProps({ modal: { beforeCloseModal,
      isActive
    }
  }) {
    return { beforeCloseModal,
      isModalActive: isActive
    }
  }
  return connect(mapStateToProps, { closeModal,
    push
  })(_Warning)
}
