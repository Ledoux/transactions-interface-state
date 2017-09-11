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

function createBlockers(history) {
  var historyBlockUnlistener = null;
  function blockers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    var newBlockers = state;
    switch (action.type) {
      case ADD_BLOCKERS_METHOD:
        newBlockers = state.concat(action.method);
        break;
      case REMOVE_BLOCKERS_METHOD:
        newBlockers = state.filter(function (method) {
          return method != action.method;
        });
        break;
      case RESET_BLOCKERS:
        newBlockers = [];
        break;
    }
    if (newBlockers !== state) {
      if (historyBlockUnlistener) {
        historyBlockUnlistener();
      }
      if (newBlockers.length > 0) {
        var shouldContinue = function shouldContinue(nextLocation) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = newBlockers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var blocker = _step.value;

              if (blocker(nextLocation)) {
                return false;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return true;
        };
        historyBlockUnlistener = history.block(shouldContinue);
      }
    }
    return newBlockers;
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