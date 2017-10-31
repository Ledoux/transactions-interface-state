'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSearch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _search = require('../../reducers/search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withSearch = exports.withSearch = function withSearch(WrappedComponent) {
  var _withSearch = function (_Component) {
    _inherits(_withSearch, _Component);

    function _withSearch() {
      _classCallCheck(this, _withSearch);

      return _possibleConstructorReturn(this, (_withSearch.__proto__ || Object.getPrototypeOf(_withSearch)).apply(this, arguments));
    }

    _createClass(_withSearch, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _props = this.props,
            search = _props.search,
            setSearch = _props.setSearch;

        setSearch(search);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _props2 = this.props,
            search = _props2.search,
            setSearch = _props2.setSearch;

        var nextSearchString = nextProps.search;
        if (nextSearchString !== search) {
          setSearch(nextSearchString);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return _withSearch;
  }(_react.Component);

  return (0, _reactRedux.connect)(function (_ref) {
    var search = _ref.router.location.search;
    return { search: search };
  }, { setSearch: _search.setSearch })(_withSearch);
};