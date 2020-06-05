"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindChild = void 0;

var _FindDb = require("./FindDb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var FindChild = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var body, pam, db;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //   查看用
            body = {};
            pam = ctx.params;
            _context.next = 4;
            return (0, _FindDb.SqlChild)(pam);

          case 4:
            db = _context.sent;

            if (db.length) {
              db = db.map(function (el) {
                return el.id;
              });
              body = new ctx.ResForm({
                data: db
              });
            } else {
              body = new ctx.ResForm({
                status: "组织信息不存在",
                code: '201'
              });
            }

            ctx.body = body;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function FindChild(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.FindChild = FindChild;