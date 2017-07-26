'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authorization = require('./reducers/authorization');

var authorization = _interopRequireWildcard(_authorization);

var _flash = require('./reducers/flash');

var flash = _interopRequireWildcard(_flash);

var _information = require('./reducers/information');

var information = _interopRequireWildcard(_information);

var _navigation = require('./reducers/navigation');

var navigation = _interopRequireWildcard(_navigation);

var _modal = require('./reducers/modal');

var modal = _interopRequireWildcard(_modal);

var _user = require('./reducers/user');

var user = _interopRequireWildcard(_user);

var _authorization2 = require('./sagas/authorization');

var authorizationSaga = _interopRequireWildcard(_authorization2);

var _form = require('./sagas/form');

var formSaga = _interopRequireWildcard(_form);

var _transactions = require('./sagas/transactions');

var _transactions2 = _interopRequireDefault(_transactions);

var _user2 = require('./sagas/user');

var userSaga = _interopRequireWildcard(_user2);

var _subscription = require('./utils/subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _views = require('./utils/views');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var form = require('./reducers/form').default;


var transactionsInterfaceState = Object.assign({
  authorizationSaga: authorizationSaga,
  createCardViewer: _views.createCardViewer,
  createItemViewer: _views.createItemViewer,
  createSubscription: _subscription2.default,
  formSaga: formSaga,
  transactionsSaga: _transactions2.default,
  userSaga: userSaga
}, authorization, flash, form, modal, navigation, information, user);

exports.default = transactionsInterfaceState;