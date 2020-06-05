"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Daily = void 0;

var _DailyDb = require("./DailyDb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Daily = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var _yield$ctx$GetParams, query;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ctx.GetParams(ctx);

          case 2:
            _yield$ctx$GetParams = _context.sent;
            query = _yield$ctx$GetParams.query;
            _context.next = 6;
            return findLimt(ctx, query);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Daily(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.Daily = Daily;

function findLimt(_x2, _x3) {
  return _findLimt.apply(this, arguments);
}

function _findLimt() {
  _findLimt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, query) {
    var body, db, page, page_size, account, functions, operate, start_time, end_time, admin_id, _admin_id$, pam;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = {};
            page = query.page ? query.page : 1;
            page_size = query.page_size ? query.page_size : 15;
            start_time = query.start_time ? query.start_time : '';
            end_time = query.end_time ? query.end_time : '';
            operate = query.operate ? query.operate : '';
            account = query.account ? query.account : '';
            console.log('接收参数', account); // 搜索用户日志

            if (!account) {
              _context2.next = 13;
              break;
            }

            _context2.next = 11;
            return (0, _DailyDb.FindId)(account);

          case 11:
            admin_id = _context2.sent;
            admin_id = (_admin_id$ = admin_id[0]) === null || _admin_id$ === void 0 ? void 0 : _admin_id$.id;

          case 13:
            ctx.body = admin_id;
            return _context2.abrupt("return");

          case 18:
            db = _context2.sent;
            ctx.body = db;

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _findLimt.apply(this, arguments);
}