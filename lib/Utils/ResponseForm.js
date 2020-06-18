"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResPage = exports.ResForm = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResForm = function ResForm(_ref) {
  var _ref$status = _ref.status,
      status = _ref$status === void 0 ? '' : _ref$status,
      _ref$code = _ref.code,
      code = _ref$code === void 0 ? "0" : _ref$code,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data;

  _classCallCheck(this, ResForm);

  this.status = status;
  this.code = code;
  this.data = data;
};

exports.ResForm = ResForm;

var ResPage = /*#__PURE__*/function () {
  function ResPage(_ref2) {
    var _ref2$status = _ref2.status,
        status = _ref2$status === void 0 ? "" : _ref2$status,
        _ref2$code = _ref2.code,
        code = _ref2$code === void 0 ? "0" : _ref2$code,
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        _ref2$page = _ref2.page,
        page = _ref2$page === void 0 ? 1 : _ref2$page,
        _ref2$page_size = _ref2.page_size,
        page_size = _ref2$page_size === void 0 ? 15 : _ref2$page_size,
        _ref2$total = _ref2.total,
        total = _ref2$total === void 0 ? 0 : _ref2$total;

    _classCallCheck(this, ResPage);

    this.start({
      status: status,
      code: code,
      data: data,
      page: page,
      page_size: page_size,
      total: total
    });
  }

  _createClass(ResPage, [{
    key: "start",
    value: function start(_ref3) {
      var status = _ref3.status,
          code = _ref3.code,
          data = _ref3.data,
          page = _ref3.page,
          page_size = _ref3.page_size,
          total = _ref3.total;
      this.data = {
        status: status,
        code: code,
        data: data,
        first_page_url: "https://testyzxfb.shyunhua.com?page=" + page,
        from: (page - 1) * page_size,
        last_page: 1,
        last_page_url: "https://testyzxfb.shyunhua.com?page=1",
        next_page_url: null,
        path: "https://testyzxfb.shyunhua.com",
        per_page: page_size,
        prev_page_url: null,
        to: page * page_size > total ? total : page * page_size,
        total: total,
        current_page: page
      };
    }
  }]);

  return ResPage;
}();

exports.ResPage = ResPage;