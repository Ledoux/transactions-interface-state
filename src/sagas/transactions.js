import { createTransactionsSaga,
  isSuccessTransactionsAction
} from 'transactions-redux-request'

import { getAuthorizationData } from './authorization'
import { IS_PROD } from '../utils/config'

// create the watches
const config = {
  getAuthorizationData
}
if (IS_PROD) {
  config.logger = null
}
const transactionsSaga = createTransactionsSaga(config)
export default transactionsSaga
