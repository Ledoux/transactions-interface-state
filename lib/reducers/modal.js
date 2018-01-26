'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHOW_MODAL = exports.CLOSE_MODAL = undefined;
exports.modal = modal;
exports.closeModal = closeModal;
exports.showModal = showModal;

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SET_MODAL_QUERY = 'SET_MODAL_QUERY';
var CLOSE_MODAL = exports.CLOSE_MODAL = 'CLOSE_MODAL';
var SHOW_MODAL = exports.SHOW_MODAL = 'SHOW_MODAL';

var initialState = { ContentComponent: null,
  isActive: false,
  query: null
};

function modal() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case SET_MODAL_QUERY:
      return (0, _lodash2.default)({}, state, {
        query: action.query
      });
    case SHOW_MODAL:
      return (0, _lodash2.default)({}, state, Object.assign({
        isActive: true,
        ContentComponent: action.ContentComponent || state.ContentComponent
      }, action.config));
    case CLOSE_MODAL:
      return (0, _lodash2.default)({}, state, {
        beforeCloseModal: null,
        query: null,
        isActive: false,
        isCtaCloseButton: false,
        isCornerCloseButton: false,
        isOutCloseButton: false
      });
    default:
      return state;
  }
}

function closeModal() {
  return { type: CLOSE_MODAL };
}

function showModal(modalElement, config) {
  return {
    config: config,
    ContentComponent: function ContentComponent() {
      return modalElement;
    },
    type: SHOW_MODAL
  };
}