import { connect } from 'react-redux'

export const Loading = connect(
  (state, ownProps) => ({ 
    isActive: state.loading.isActive && ownProps.tag === state.loading.tag
  })
)
