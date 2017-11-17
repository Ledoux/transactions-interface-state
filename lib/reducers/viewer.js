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

function createViewer(views, config) {
  var viewer = {};
  views.forEach(function (view) {
    var categoryName = view.categoryName,
        ComponentsByName = view.ComponentsByName;

    viewer[categoryName + 'ComponentsByName'] = (0, _view2.default)(categoryName, ComponentsByName, Object.assign({}, config, view.config));
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

function getViewerComponent(state, categoryName, contentName) {
  var category = getViewerCategory(state, categoryName);
  return category && category[contentName];
}