"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Meeting = void 0;

var _MeetingDb = require("./MeetingDb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Meeting = /*#__PURE__*/function () {
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
            return pageSplit(ctx, query);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Meeting(_x) {
    return _ref.apply(this, arguments);
  };
}(); // 简单列表分页查询


exports.Meeting = Meeting;

function pageSplit(_x2, _x3) {
  return _pageSplit.apply(this, arguments);
}

function _pageSplit() {
  _pageSplit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, query) {
    var body, db, page, page_size, meeting_name, compere_name, start_time, end_time, pam;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = {};
            page = query.page ? query.page : 1, page_size = query.page_size ? query.page_size : 15, meeting_name = query.meeting_name ? query.meeting_name + '%' : '' + '%';
            compere_name = query.compere_name ? query.compere_name + '%' : '' + '%';
            start_time = query.start_time ? query.start_time : '';
            end_time = query.end_time ? query.end_time : '';
            pam = {
              from: (page - 1) * page_size,
              to: page * page_size,
              meeting_name: meeting_name,
              compere_name: compere_name,
              start_time: start_time,
              end_time: end_time
            };
            _context2.next = 8;
            return (0, _MeetingDb.findLimit)(pam);

          case 8:
            db = _context2.sent;
            body = new ctx.ResPage({
              data: db[0],
              total: db[1][0].total,
              page: page,
              page_size: page_size
            });
            ctx.body = body;

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _pageSplit.apply(this, arguments);
}