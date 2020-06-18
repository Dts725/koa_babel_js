"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findLimit = findLimit;

var _DB = require("../../DB/DB");

var _TermsSql = require("../../Utils/TermsSql");

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
      var sql, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // SELECT SQL_CALC_FOUND_ROWS * FROM Meeting LIMIT 0,4;
              // SELECT FOUND_ROWS() as total;
              sql = "", result = {};
              _context.next = 3;
              return (0, _TermsSql.TermsLikeSql)('Meeting', {
                meeting_name: meeting_name,
                compere_name: compere_name
              });

            case 3:
              sql = _context.sent;
              _context.t0 = sql;
              _context.next = 7;
              return (0, _TermsSql.TimeBetween)('start_time', {
                start_time: start_time,
                end_time: end_time
              });

            case 7:
              sql = _context.t0 += _context.sent;
              _context.t1 = sql;
              _context.next = 11;
              return (0, _TermsSql.LimitSql)({
                from: from,
                to: to
              });

            case 11:
              sql = _context.t1 += _context.sent;
              result = (0, _DB.db)(sql);
              return _context.abrupt("return", resolve(result));

            case 14:
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
} // sql += await TermsSql('Meeting', { meeting_name, compere_name })
// if (start_time && end_time) {
//     sql += `date_time BETWEEN ${escape(start_time)} AND ${end_time}`
// }