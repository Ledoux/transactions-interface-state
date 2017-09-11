import { connect } from 'react-redux'

export const Loading = WrappedComponent => {
  function mapStateToProps ({ loading: { isActive } }) {
    return { isActive }
  }
  return connect(mapStateToProps)(WrappedComponent)
}
