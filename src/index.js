import * as flash from './reducers/flash'
import * as information from './reducers/information'
import * as modal from './reducers/modal'
import * as navigation from './reducers/navigation'
const pipeline = require('./reducers/pipeline').default
import * as reselector from './reducers/reselector'
import * as apis from './utils/apis'
import * as automatic from './utils/automatic'
import * as location from './utils/location'
import * as props from './utils/props'
import * as viewer from './utils/viewer'

const transactionsInterfaceState = Object.assign({}, apis,
  automatic,
  flash,
  information,
  location,
  modal,
  navigation,
  pipeline,
  props,
  reselector,
  viewer
)

export default transactionsInterfaceState
