import * as authorization from './reducers/authorization'
import * as flash from './reducers/flash'
const form = require('./reducers/form').default
import * as information from './reducers/information'
import * as modal from './reducers/modal'
import * as navigation from './reducers/navigation'
const pipeline = require('./reducers/pipeline').default
import * as reselector from './reducers/reselector'
import * as user from './reducers/user'
import * as authorizationSaga from './sagas/authorization'
import * as formSaga from './sagas/form'
import transactionsSaga from './sagas/transactions'
import * as userSaga from './sagas/user'
import * as apis from './utils/apis'
import * as automatic from './utils/automatic'
import * as linking from './utils/linking'
import * as location from './utils/location'
import * as props from './utils/props'
import * as redirection from './utils/redirection'
import * as subscription from './utils/subscription'
import * as viewing from './utils/viewing'

const transactionsInterfaceState = Object.assign({
  authorizationSaga,
  formSaga,
  transactionsSaga,
  userSaga
},
  apis,
  authorization,
  automatic,
  flash,
  form,
  information,
  linking,
  location,
  modal,
  navigation,
  pipeline,
  props,
  redirection,
  reselector,
  subscription,
  viewing,
  user
)

export default transactionsInterfaceState
