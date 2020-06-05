"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResPage = exports.ResForm = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResForm = function ResForm(_ref) {
  var _ref$status = _ref.status,
      status = _ref$status === void 0 ? "" : _ref$status,
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

var ResPage = function ResPage(_ref2) {
  var _ref2$status = _ref2.status,
      status = _ref2$status === void 0 ? "" : _ref2$status,
      _ref2$code = _ref2.code,
      code = _ref2$code === void 0 ? "0" : _ref2$code,
      _ref2$data = _ref2.data,
      data = _ref2$data === void 0 ? [] : _ref2$data,
      page = _ref2.page,
      page_size = _ref2.page_size,
      total = _ref2.total;

  _classCallCheck(this, ResPage);

  this.status = status;
  this.code = code;
  this.data = data;
  this.first_page_url = "https://testyzxfb.shyunhua.com/Meeting?page=" + page;
  this.from = (page - 1) * page_size;
  this.last_page = 1;
  this.last_page_url = "https://testyzxfb.shyunhua.com/Meeting?page=1";
  this.next_page_url = null;
  this.path = "https://testyzxfb.shyunhua.com/Meeting";
  this.per_page = page_size;
  this.prev_page_url = null;
  this.to = page * page_size > total ? total : page * page_size;
  this.total = total;
  this.current_page = page;
};

exports.ResPage = ResPage;