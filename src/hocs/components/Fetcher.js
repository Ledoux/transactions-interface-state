import React, { Component } from 'react'
import { IS_ALL_DEEP_JOINS,
  IS_ALL_JOINS,
  JOINS,
  LIMIT
} from 'transactions-redux-request'

export const Fetcher = WrappedComponent => {
  class _Fetcher extends Component {
    constructor (props) {
      super(props)
      this.state = { selectedCollectionName: 'links',
        queryString: JSON.stringify({
          [IS_ALL_DEEP_JOINS]: true,
          [IS_ALL_JOINS]: true,
          /*
          [JOINS]: [
            { key: 'authorId' }
          ],
          */
          [LIMIT]: 1
        }, null, 2)
      }
      this.onCollectionNameChange = this._onCollectionNameChange.bind(this)
      this.onQueryStringChange = this._onQueryStringChange.bind(this)
    }
    _onCollectionNameChange () {
      this.setState({ selectedCollectionName: event.target.value })
    }
    _onQueryStringChange () {
      this.setState({ queryString: event.target.value })
    }
    render () {
      return <WrappedComponent {...this.props}
        {...this.state}
        onCollectionNameChange={this.onCollectionNameChange}
        onQueryStringChange={this.onQueryStringChange} />
    }
  }
  return _Fetcher
}
