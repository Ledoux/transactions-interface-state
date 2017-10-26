import { connect } from 'react-redux'

export const EmblemLink = WrappedComponent =>
  connect(({ siteLabel }) => ({ siteLabel }))(WrappedComponent)
