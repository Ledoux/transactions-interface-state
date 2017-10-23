'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createViewer = createViewer;
exports.getViewerCategory = getViewerCategory;
exports.getViewerComponent = getViewerComponent;

var _view = require('../utils/view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createViewer(views) {
  var viewer = {};
  views.forEach(function (_ref) {
    var ComponentsByName = _ref.ComponentsByName,
        name = _ref.name,
        options = _ref.options;

    viewer[name + 'ComponentsByName'] = (0, _view2.default)(name, ComponentsByName, options);
  });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : viewer;
    var action = arguments[1];
    return state;
  };
}

function getViewerCategory(state, categoryName) {
  return state.viewer[categoryName + 'ComponentsByName'];
}

function getViewerComponent(state, categoryName, name) {
  var category = getViewerCategory(state, categoryName);
  return category && category[name];
}