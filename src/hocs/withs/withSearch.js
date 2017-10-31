import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setSearch } from '../../reducers/search'

export const withSearch = WrappedComponent => {
  class _withSearch extends Component {
    componentWillMount () {
      const { search,
        setSearch,
      } = this.props
      setSearch(search)
    }
    componentWillReceiveProps (nextProps) {
      const { search,
        setSearch
      } = this.props
      const nextSearchString = nextProps.search
      if (nextSearchString !== search) {
        setSearch(nextSearchString)
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return connect(({ router: { location: { search } } }) =>
    ({ search }),
    { setSearch }
  )(_withSearch)
}
