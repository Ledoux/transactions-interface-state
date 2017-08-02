'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSubscription = createSubscription;

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSubscription() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // unpack
  var modes = config.modes,
      hasJoinedModeAccess = config.hasJoinedModeAccess;

  var guestMode = void 0;
  // determine first which are automatic modes (ie guest, user, admin)
  // and the customized joined ones
  var automaticModes = [];
  var joinedModes = [];
  modes.forEach(function (mode) {
    if (mode.isJoin) {
      mode.hasModeAccess = hasJoinedModeAccess;
      joinedModes.push(mode);
    } else {
      automaticModes.push(mode);
    }
  });
  // build some attached variables
  var joinedModeNames = joinedModes.map(function (mode) {
    return mode.name;
  });
  var joinedModeCollectionNames = joinedModeNames.map(function (modeName) {
    return (0, _pluralize2.default)(modeName, 2);
  });
  var modeNames = modes.map(function (mode) {
    return mode.name;
  });

  // build the inverse hmap that for a certain content collection
  // I need to know what is the matched authorized user mode collection
  var modeNamesBySingularOrPluralName = {};
  var modesBySingularOrPluralName = {};
  // set the joins given the ones defined in the modes
  var modeJoinsByCollectionName = {};
  modes.forEach(function (mode) {
    var availableCollections = mode.availableCollections,
        collectionName = mode.collectionName,
        name = mode.name;
    // guestMode

    if (name === 'guest') {
      guestMode = mode;
    }
    // pluralize
    mode.collectionName = (0, _pluralize2.default)(name, 2);
    mode.availableCollectionNames = Array(availableCollections.length);
    mode.availableEntityNames = Array(availableCollections.length);
    availableCollections.forEach(function (collection, index) {
      var entityName = (0, _pluralize2.default)(collection.name, 1);
      modesBySingularOrPluralName[entityName] = mode;
      modesBySingularOrPluralName[collection.name] = mode;
      modeNamesBySingularOrPluralName[entityName] = name;
      modeNamesBySingularOrPluralName[collection.name] = name;
      mode.availableEntityNames[index] = entityName;
      mode.availableCollectionNames[index] = collection.name;
      mode.availableSingularOrPluralNames = mode.availableEntityNames.concat(mode.availableCollectionNames);
      modeJoinsByCollectionName[collection.name] = collection.join;
    });
  });
  // return
  return { guestMode: guestMode,
    joinedModeCollectionNames: joinedModeCollectionNames,
    joinedModeNames: joinedModeNames,
    joinedModes: joinedModes,
    modeJoinsByCollectionName: modeJoinsByCollectionName,
    modeNamesBySingularOrPluralName: modeNamesBySingularOrPluralName,
    modeNames: modeNames,
    modes: modes,
    modesBySingularOrPluralName: modesBySingularOrPluralName
  };
}