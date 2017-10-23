import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getNormalizerEntities } from 'transactions-redux-normalizer'

import { closeInformation,
  showInformation
} from '../../reducers/information'

export const BellButton = WrappedComponent => {
  WrappedComponent.propTypes = { closeInformation: PropTypes.func.isRequired,
    isInformationActive: PropTypes.bool.isRequired,
    onTopOfDarkSection: PropTypes.bool,
    showInformation: PropTypes.func.isRequired
  }
  const mapStateToProps = state => {
    const { information: {
        isActive
      }
    } = state
    const notifications = getNormalizerEntities(state, 'notifications')
    const isEmpty = notifications.length === 0
    const isNewNotification = notifications.find(({isSeen}) => !isSeen)
    return { isEmpty,
      isInformationActive: isActive,
      isNewNotification
    }
  }
  return connect(mapStateToProps, { closeInformation,
    showInformation
  })(WrappedComponent)
}
