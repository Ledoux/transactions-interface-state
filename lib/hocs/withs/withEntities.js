'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withEntities = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reselect = require('reselect');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _transactionsReduxReselector = require('transactions-redux-reselector');

var _transactionsQueryEncode = require('transactions-query-encode');

var _withComputedProps = require('./withComputedProps');

var _withRequest = require('./withRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withEntities = exports.withEntities = function withEntities(entitiesKey) {
  return function (WrappedComponent) {
    var _withEntities = function (_Component) {
      _inherits(_withEntities, _Component);

      function _withEntities() {
        _classCallCheck(this, _withEntities);

        var _this = _possibleConstructorReturn(this, (_withEntities.__proto__ || Object.getPrototypeOf(_withEntities)).call(this));

        _this.handleReselectorFilter = _this._handleReselectorFilter.bind(_this);
        return _this;
      }

      _createClass(_withEntities, [{
        key: '_handleReselectorFilter',
        value: function _handleReselectorFilter() {
          var _props = this.props,
              assignReselectorFilter = _props.assignReselectorFilter,
              isSearch = _props.isSearch,
              label = _props.label,
              query = _props.query;

          if (!query) {
            return;
          }
          var _query = Object.assign({}, query);
          var queryKeys = Object.keys(query);
          // look if there is not in the query some request configs
          // that are not taking part to the filter process
          _transactionsQueryEncode.requestConfigConstants.forEach(function (requestConfigConstant) {
            if (queryKeys.includes(requestConfigConstant)) {
              delete _query[requestConfigConstant];
            }
          });
          // assign
          assignReselectorFilter('WITH_' + label.toUpperCase() + '_AUTOMATIC_JOIN', _query);
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.handleReselectorFilter();
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return _withEntities;
    }(_react.Component);
    // we get the entities from the pipelined entities
    // stored in the location reducer


    function mapStateToProps(state, ownProps) {
      // unpack
      var collectionName = ownProps.collectionName,
          isSearch = ownProps.isSearch,
          label = ownProps.label;

      var listQuery = ownProps.query;
      var _state$reselector = state.reselector,
          reselect = _state$reselector.reselect,
          _state$reselector$WIT = _state$reselector.WITH_SIGN_SEARCH,
          query = _state$reselector$WIT.query,
          sign = _state$reselector$WIT.sign;
      // init

      var newState = {};
      // no need to go further if no collectionName
      if (!collectionName) {
        return newState;
      }
      // let s see if we need to restrict because of a search filter
      var parentFilterId = listQuery ? 'WITH_' + label.toUpperCase() + '_AUTOMATIC_JOIN' : 'ALL';
      var filterName = void 0;
      var reselectOption = { isRecursive: true };
      if (!isSearch || !query || sign !== label) {
        filterName = parentFilterId;
      } else {
        filterName = 'WITH_SIGN_SEARCH';
        // we want to cumulate the search filter with the all or automatic join one
        reselectOption.parent = { filterId: parentFilterId,
          option: Object.assign({}, reselectOption)
        };
      }
      // set
      newState[entitiesKey || collectionName] = reselect(state, filterName, collectionName, reselectOption);
      // return
      return newState;
    }
    return (0, _redux.compose)((0, _withComputedProps.withComputedProps)({
      label: (0, _reselect.createSelector)(function (_ref) {
        var label = _ref.label;
        return label;
      }, function (_ref2) {
        var collectionName = _ref2.collectionName;
        return collectionName;
      }, function (label, collectionName) {
        return label || collectionName + '-' + (0, _shortid2.default)();
      })
      /*
      filterName: ({ isSearch, label, query }) => {
        let filterName
        if (!isSearch || !query || sign !== label) {
          filterName = parentFilterId
        } else {
      }
      */
    }), (0, _withRequest.withRequest)(['collectionName', 'query'], function (_ref3) {
      var collectionName = _ref3.collectionName,
          config = _ref3.config,
          label = _ref3.label,
          query = _ref3.query;
      return ['GET', [{ collectionName: collectionName, query: query }], Object.assign({ tag: label }, config)];
    }), (0, _reactRedux.connect)(mapStateToProps, { assignReselectorFilter: _transactionsReduxReselector.assignReselectorFilter }))(_withEntities);
  };
};