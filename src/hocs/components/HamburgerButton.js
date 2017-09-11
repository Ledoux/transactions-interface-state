import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { closeNavigation,
  showNavigation
} from '../../reducers/navigation'

export const HamburgerButton = WrappedComponent => {
  WrappedComponent.propTypes = { closeNavigation: PropTypes.func.isRequired,
    isNavigationActive: PropTypes.bool.isRequired,
    onTopOfDarkSection: PropTypes.bool,
    showNavigation: PropTypes.func.isRequired
  }
  const mapStateToProps = ({ navigation: { isActive } }) => {
    return { isNavigationActive: isActive }
  }
  return connect(mapStateToProps, { closeNavigation,
    showNavigation
  })(WrappedComponent)
}
