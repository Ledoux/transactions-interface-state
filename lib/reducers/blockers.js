'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldScroll = shouldScroll;
exports.createBlockers = createBlockers;
exports.appendBlockersMethod = appendBlockersMethod;
exports.pushBlockersMethod = pushBlockersMethod;
exports.removeBlockersMethod = removeBlockersMethod;
exports.resetBlockers = resetBlockers;
var APPEND_BLOCKERS_METHOD = 'APPEND_BLOCKERS_METHOD';
var PUSH_BLOCKERS_METHOD = 'PUSH_BLOCKERS_METHOD';
var REMOVE_BLOCKERS_METHOD = 'REMOVE_BLOCKERS_METHOD';
var RESET_BLOCKERS = 'RESET_BLOCKERS';

function shouldScroll(nextLocation) {
  // pop check
  if (nextLocation.pathname !== window.location.pathname) {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (nextLocation.action === 'POP') {
      return;
    }
    // In all other cases, scroll to top
    window.scrollTo(0, 0);
  }
}

var initialState = [shouldScroll];

function createBlockers(history) {
  var historyBlockUnlistener = null;
  function blockers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var newBlockers = state;
    switch (action.type) {
      case APPEND_BLOCKERS_METHOD:
        newBlockers = [action.method].concat(state);
        break;
      case PUSH_BLOCKERS_METHOD:
        newBlockers = state.concat([action.method]);
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

function appendBlockersMethod(method) {
  return { method: method,
    type: APPEND_BLOCKERS_METHOD
  };
}

function pushBlockersMethod(method) {
  return { method: method,
    type: PUSH_BLOCKERS_METHOD
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