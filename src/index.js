import * as authorization from './reducers/authorization'
import * as flash from './reducers/flash'
const form = require('./reducers/form').default
import * as information from './reducers/information'
import * as navigation from './reducers/navigation'
import * as modal from './reducers/modal'
import * as user from './reducers/user'
import * as authorizationSaga from './sagas/authorization'
import * as formSaga from './sagas/form'
import transactionsSaga from './sagas/transactions'
import * as userSaga from './sagas/user'

import createSubscription from './utils/subscription'
import { createCardViewer,
  createItemViewer
} from './utils/views'

const transactionsInterfaceState = Object.assign({
  authorizationSaga,
  createCardViewer,
  createItemViewer,
  createSubscription,
  formSaga,
  transactionsSaga,
  userSaga
},
  authorization,
  flash,
  form,
  modal,
  navigation,
  information,
  user
)

export default transactionsInterfaceState
