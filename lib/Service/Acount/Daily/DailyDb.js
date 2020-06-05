"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindDaily = FindDaily;
exports.FindId = FindId;

var _DB = require("../../../DB/DB");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function FindDaily(_ref) {
  var admin_id = _ref.admin_id,
      functions = _ref.functions,
      operate = _ref.operate,
      from = _ref.from,
      to = _ref.to,
      start_time = _ref.start_time,
      end_time = _ref.end_time;
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var sql, sql2, sql3, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              sql = "SELECT SQL_CALC_FOUND_ROWS * FROM Daily  WHERE admin_id =  ".concat((0, _DB.escape)(admin_id), " AND function = ").concat((0, _DB.escape)(functions), " AND operate = ").concat(operate, " LIMIT   ").concat((0, _DB.escape)(from), ",").concat((0, _DB.escape)(to), ";");
              sql2 = "SELECT SQL_CALC_FOUND_ROWS * FROM Daily  WHERE admin_id =  ".concat((0, _DB.escape)(admin_id), " AND function = ").concat((0, _DB.escape)(functions), "  AND operate = ").concat(operate, "  AND date_time BETWEEN   ").concat((0, _DB.escape)(start_time), " AND ").concat((0, _DB.escape)(end_time), " LIMIT ").concat((0, _DB.escape)(from), ",").concat((0, _DB.escape)(to), ";");
              sql3 = "SELECT FOUND_ROWS() as total;";

              if (!(start_time && end_time)) {
                _context.next = 10;
                break;
              }

              _context.next = 7;
              return (0, _DB.db)(sql + sql3);

            case 7:
              result = _context.sent;
              _context.next = 13;
              break;

            case 10:
              _context.next = 12;
              return (0, _DB.db)(sql2 + sql3);

            case 12:
              result = _context.sent;

            case 13:
              return _context.abrupt("return", resolve(result));

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", resolve(_context.t0));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 16]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}

function FindId(account) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
      var sql, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sql = "SELECT id FROM Admin WHERE account = ".concat((0, _DB.escape)(account));
              _context2.next = 3;
              return (0, _DB.db)(sql);

            case 3:
              result = _context2.sent;
              return _context2.abrupt("return", resolve(result));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
}