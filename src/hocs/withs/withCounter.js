import React, { Component } from 'react'

export const withCounter = (arrayKey, config = {}) => WrappedComponent => {
  const isLoop = typeof config.isLoop !== 'undefined'
  ? config.isLoop
  : true
  class _withCounter extends Component {
    constructor () {
      super()
      this.state = { selectedIndex: null }
      this.handleSetInterval = this._handleSetInterval.bind(this)
    }
    componentWillMount () {
      this.handleSetInterval(this.props)
    }
    componentWillReceiveProps (nextProps) {
      (!this.countInterval || nextProps.intervalTime !== this.props.intervalTime) &&
        this.handleSetInterval(nextProps)
    }
    _handleSetInterval (props) {
      const { intervalTime, isBlocked } = props
      const array = props[arrayKey]
      if (!array || array.length === 0) {
        return
      }
      if (this.state.selectedIndex === null) {
        this.setState({ selectedIndex: 0 })
      }
      this.countInterval = !isBlocked && setInterval(() => {
        const { selectedIndex } = this.state
        if (selectedIndex ===  array.length - 1) {
          if (isLoop) {
            this.setState({ selectedIndex: 0 })
          } else {
            clearInterval(this.countInterval)
            this.setState({ selectedIndex: null })
          }
        } else {
          this.setState({ selectedIndex: selectedIndex + 1 })
        }
      }, intervalTime)
    }
    componentWillUnmount () {
      this.countInterval && clearInterval(this.countInterval)
    }
    render () {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
  return _withCounter
}
