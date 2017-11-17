'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Uploader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Uploader = exports.Uploader = function Uploader(WrappedComponent) {
  var _Uploader = function (_Component) {
    _inherits(_Uploader, _Component);

    function _Uploader() {
      _classCallCheck(this, _Uploader);

      var _this = _possibleConstructorReturn(this, (_Uploader.__proto__ || Object.getPrototypeOf(_Uploader)).call(this));

      _this.handleDropUpload = _this._handleDropUpload.bind(_this);
      return _this;
    }

    _createClass(_Uploader, [{
      key: '_handleDropUpload',
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(files) {
          var _props, fetch, fileName, IS_DEVELOPMENT, isOverride, isWithDate, onUpload, revokeObjectURL, uploadPath, uploadedFile, localFormData, urlFileName, url, date, result, json;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // unpack
                  _props = this.props, fetch = _props.fetch, fileName = _props.fileName, IS_DEVELOPMENT = _props.IS_DEVELOPMENT, isOverride = _props.isOverride, isWithDate = _props.isWithDate, onUpload = _props.onUpload, revokeObjectURL = _props.revokeObjectURL, uploadPath = _props.uploadPath;
                  uploadedFile = files[0];
                  // init

                  localFormData = new FormData();
                  // append

                  localFormData.append('uploader', uploadedFile);
                  // url
                  urlFileName = void 0;

                  if (IS_DEVELOPMENT) {
                    urlFileName = 'test';
                    console.warn('Uploader in DEVELOPMENT: it is normal that you sse MY picture uploaded...');
                  } else {
                    urlFileName = fileName || uploadedFile.name;
                  }
                  url = uploadPath + '/' + urlFileName;

                  if (isWithDate) {
                    date = Date.now();

                    url = url + '-' + date;
                  }
                  if (isOverride) {
                    url = url + '?isOverride=true';
                  }
                  // fetch
                  _context.next = 11;
                  return fetch(url, {
                    body: localFormData,
                    method: 'POST'
                  });

                case 11:
                  result = _context.sent;
                  _context.next = 14;
                  return result.json();

                case 14:
                  json = _context.sent;

                  // hook
                  if (onUpload) {
                    onUpload(json);
                  }
                  revokeObjectURL(uploadedFile.preview);

                case 17:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function _handleDropUpload(_x) {
          return _ref.apply(this, arguments);
        }

        return _handleDropUpload;
      }()
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          handleDropUpload: this.handleDropUpload }));
      }
    }]);

    return _Uploader;
  }(_react.Component);

  return (0, _reactRedux.connect)(function (_ref2) {
    var _ref2$setup = _ref2.setup,
        uploadPath = _ref2$setup.api.uploadPath,
        IS_DEVELOPMENT = _ref2$setup.context.IS_DEVELOPMENT;
    return { IS_DEVELOPMENT: IS_DEVELOPMENT, uploadPath: uploadPath };
  })(_Uploader);
};