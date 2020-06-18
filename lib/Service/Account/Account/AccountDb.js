"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAccountDb = GetAccountDb;

var _DB = require("../../../DB/DB");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function GetAccountDb(_ref) {
  var id = _ref.id;
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var result, sql;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = [];
              sql = "SELECT a.* ,b.name AS create_user_name FROM Admin AS a LEFT JOIN Admin AS b ON a.create_user_id = b.id WHERE a.id = ".concat((0, _DB.escape)(id));
              _context.next = 4;
              return (0, _DB.db)(sql);

            case 4:
              result = _context.sent;
              return _context.abrupt("return", resolve(result));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}