'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntitiesList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxRequest = require('transactions-redux-request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntitiesList = exports.EntitiesList = function EntitiesList(WrappedComponent) {
  var _EntitiesList = function (_Component) {
    _inherits(_EntitiesList, _Component);

    function _EntitiesList() {
      _classCallCheck(this, _EntitiesList);

      var _this = _possibleConstructorReturn(this, (_EntitiesList.__proto__ || Object.getPrototypeOf(_EntitiesList)).call(this));

      _this.state = { warning: null };
      _this.handleRequest = _this._handleRequest.bind(_this);
      return _this;
    }

    _createClass(_EntitiesList, [{
      key: '_handleRequest',
      value: function _handleRequest(props) {
        var prevProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var collectionName = props.collectionName,
            queryString = props.queryString,
            request = props.request;

        if (collectionName) {
          if (collectionName !== prevProps.collectionName || queryString !== prevProps.queryString) {
            try {
              var query = queryString && JSON.parse(queryString);
              this.setState({ warning: null });
              request('GET', [{
                collectionName: collectionName,
                query: query
              }]);
            } catch (error) {
              console.warn(error);
              this.setState({ warning: error.toString() });
            }
          }
        }
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.handleRequest(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.handleRequest(nextProps, this.props);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      }
    }]);

    return _EntitiesList;
  }(_react.Component);

  function mapStateToProps(state, ownProps) {
    return {
      collection: state.normalizer[ownProps.collectionName + 'ById'],
      entities: (0, _transactionsReduxRequest.getNormalizerEntities)(state, ownProps.collectionName)
    };
  }
  return (0, _reactRedux.connect)(mapStateToProps, { request: _transactionsReduxRequest.request })(_EntitiesList);
};