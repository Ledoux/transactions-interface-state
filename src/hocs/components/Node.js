import React, { Component } from 'react'

export const Node = WrappedComponent => {
  class _Node extends Component {
    constructor () {
      super()
      this.state = { isExpanded: false }
      this.onExpandClick = this._onExpandClick.bind(this)
    }
    _onExpandClick (index) {
      this.setState({ isExpanded: !this.state.isExpanded })
    }
    render () {
      return <WrappedComponent {...this.props}
        {...this.state}
        onExpandClick={this.onExpandClick} />
    }
  }
  return _Node
}
