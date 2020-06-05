"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findLimit = findLimit;

var _DB = require("../../DB/DB");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function findLimit(_ref) {
  var from = _ref.from,
      to = _ref.to,
      meeting_name = _ref.meeting_name,
      compere_name = _ref.compere_name,
      start_time = _ref.start_time,
      end_time = _ref.end_time;
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var sql, sql2, sql3, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // SELECT SQL_CALC_FOUND_ROWS * FROM Meeting LIMIT 0,4;
              // SELECT FOUND_ROWS() as total;
              sql = "SELECT SQL_CALC_FOUND_ROWS * FROM Meeting  WHERE meeting_name LIKE  ".concat((0, _DB.escape)(meeting_name), " AND compere_name LIKE ").concat((0, _DB.escape)(compere_name), " LIMIT ").concat((0, _DB.escape)(from), ",").concat((0, _DB.escape)(to), ";");
              sql2 = "SELECT SQL_CALC_FOUND_ROWS * FROM Meeting  WHERE meeting_name LIKE  ".concat((0, _DB.escape)(meeting_name), " AND compere_name LIKE ").concat((0, _DB.escape)(compere_name), "  AND start_time BETWEEN   ").concat((0, _DB.escape)(start_time), " AND ").concat((0, _DB.escape)(end_time), " LIMIT ").concat((0, _DB.escape)(from), ",").concat((0, _DB.escape)(to), ";");
              sql3 = "SELECT FOUND_ROWS() as total;";

              if (!(start_time && end_time)) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return (0, _DB.db)(sql + sql3);

            case 6:
              result = _context.sent;
              _context.next = 12;
              break;

            case 9:
              _context.next = 11;
              return (0, _DB.db)(sql2 + sql3);

            case 11:
              result = _context.sent;

            case 12:
              return _context.abrupt("return", resolve(result));

            case 13:
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