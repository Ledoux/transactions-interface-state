'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBlockers = createBlockers;
exports.addBlockersMethod = addBlockersMethod;
exports.removeBlockersMethod = removeBlockersMethod;
exports.resetBlockers = resetBlockers;
var ADD_BLOCKERS_METHOD = 'ADD_BLOCKERS_METHOD';
var REMOVE_BLOCKERS_METHOD = 'REMOVE_BLOCKERS_METHOD';
var RESET_BLOCKERS = 'RESET_BLOCKERS';

var defaultInitialState = [];

function createBlockers(initialState, config) {
  var history = config.history;
  var historyBlockUnlistener = null;
  function blockers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState || defaultInitialState;
    var action = arguments[1];

    var newBlockers = state;
    switch (action.type) {
      case ADD_BLOCKERS_METHOD:
        newBlockers = state.concat(action.method);
        break;
      case REMOVE_BLOCKERS_METHOD:
        newBlockers = state.filter(function (methods) {
          return method != action.method;
        });
        break;
      case RESET_BLOCKERS:
        newBlockers = initialState;
        break;
    }
    if (newBlockers !== state) {
      historyBlockUnlistene = history.block(function (nextLocation) {
        newBlockers.forEach(function (blocker) {
          return blocker(nextLocation);
        });
      });
    }
  }
  return blockers;
}

function addBlockersMethod(method) {
  return { method: method,
    type: ADD_BLOCKERS_METHOD
  };
}

function removeBlockersMethod(method) {
  return { method: method,
    type: REMOVE_BLOCKERS_METHOD
  };
}

function resetBlockers(method) {
  return { type: RESET_BLOCKERS_METHOD };
}