"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var db, sql;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // let { query } = await ctx.GetParams(ctx)
            sql = "SELECT * FROM  User";
            _context.next = 3;
            return ctx.db(sql);

          case 3:
            db = _context.sent;
            ctx.body = db;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function User(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.User = User;