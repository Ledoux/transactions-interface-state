import { connect } from 'react-redux'
import { getNormalizerEntity } from 'transactions-redux-react'

export const Avatar = WrappedComponent => {
  function mapStateToProps(state, { id, imageUrl }) {
    if (!imageUrl) {
      const user = getNormalizerEntity(state, 'users', id)
      return {
        imageUrl: user && user.imageUrl
      }
    }
    return {}
  }
  return connect(mapStateToProps)(WrappedComponent)
}
