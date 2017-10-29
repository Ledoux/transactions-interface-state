import React, { Component } from 'react'

export const InputButton = WrappedComponent => {
  class _InputButton extends Component {
    constructor () {
      super()
      this.state = { value: '' }
      this.onInputChange = this._onInputChange.bind(this)
      this.onButtonClick = this._onButtonClick.bind(this)
    }
    _onInputChange (event) {
      this.setState({ value: event.target.value })
    }
    _onButtonClick () {
      this.props.onClick(this.state.value)
    }
    render () {
      return <WrappedComponent {...this.props} {...this.state}
        onInputChange={this.onInputChange}
        onButtonClick={this.onButtonClick} />
    }
  }
  return _InputButton
}
