"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

var _MenuDb = require("./MenuDb");

var _JsonTree = require("../../../Utils/JsonTree");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Menu = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var result, body;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _MenuDb.MenuSql)();

          case 2:
            result = _context.sent;
            _context.next = 5;
            return (0, _JsonTree.GenerateOptions)(result, {}, 'children');

          case 5:
            result = _context.sent;
            result = {
              all_menu_ids: result
            };

            if (result.all_menu_ids.length) {
              body = new ctx.ResForm({
                data: result
              });
            } else {
              body = new ctx.ResForm({
                data: result,
                status: "暂无菜单",
                code: '201'
              });
            }

            ctx.body = body;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Menu(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.Menu = Menu;