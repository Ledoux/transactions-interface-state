'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _apis = require('./utils/apis');

var apis = _interopRequireWildcard(_apis);

var _automatic = require('./utils/automatic');

var automatic = _interopRequireWildcard(_automatic);

var _location = require('./utils/location');

var location = _interopRequireWildcard(_location);

var _props = require('./utils/props');

var props = _interopRequireWildcard(_props);

var _viewer = require('./utils/viewer');

var viewer = _interopRequireWildcard(_viewer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var pipeline = require('./reducers/pipeline').default;


var transactionsInterfaceState = Object.assign({}, apis, automatic, flash, information, location, modal, navigation, pipeline, props, reselector, viewer);

exports.default = transactionsInterfaceState;