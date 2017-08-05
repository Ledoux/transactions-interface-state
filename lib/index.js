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

var _modal = require('./reducers/modal');

var modal = _interopRequireWildcard(_modal);

var _navigation = require('./reducers/navigation');

var navigation = _interopRequireWildcard(_navigation);

var _reselector = require('./reducers/reselector');

var reselector = _interopRequireWildcard(_reselector);

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

var _apis = require('./utils/apis');

var apis = _interopRequireWildcard(_apis);

var _automatic = require('./utils/automatic');

var automatic = _interopRequireWildcard(_automatic);

var _linking = require('./utils/linking');

var linking = _interopRequireWildcard(_linking);

var _location = require('./utils/location');

var location = _interopRequireWildcard(_location);

var _props = require('./utils/props');

var props = _interopRequireWildcard(_props);

var _redirection = require('./utils/redirection');

var redirection = _interopRequireWildcard(_redirection);

var _subscription = require('./utils/subscription');

var subscription = _interopRequireWildcard(_subscription);

var _viewing = require('./utils/viewing');

var viewing = _interopRequireWildcard(_viewing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var form = require('./reducers/form').default;

var pipeline = require('./reducers/pipeline').default;


var transactionsInterfaceState = Object.assign({
  authorizationSaga: authorizationSaga,
  formSaga: formSaga,
  transactionsSaga: _transactions2.default,
  userSaga: userSaga
}, apis, authorization, automatic, flash, form, information, linking, location, modal, navigation, pipeline, props, redirection, reselector, subscription, viewing, user);

exports.default = transactionsInterfaceState;