"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindDaily = FindDaily;
exports.FindId = FindId;
exports.AddSql = AddSql;

var _DB = require("../../../DB/DB");

var _TermsSql = require("../../../Utils/TermsSql");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function FindDaily(_ref) {
  var admin_id = _ref.admin_id,
      _ref$functions = _ref.functions,
      functions = _ref$functions === void 0 ? "" : _ref$functions,
      _ref$operate = _ref.operate,
      operate = _ref$operate === void 0 ? "" : _ref$operate,
      from = _ref.from,
      to = _ref.to,
      _ref$start_time = _ref.start_time,
      start_time = _ref$start_time === void 0 ? "" : _ref$start_time,
      _ref$end_time = _ref.end_time,
      end_time = _ref$end_time === void 0 ? "" : _ref$end_time;
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var sql, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              sql = "", result = [];
              _context.t0 = sql;
              _context.next = 5;
              return (0, _TermsSql.TermsSql)('Daily', {
                admin_id: admin_id,
                "function": functions,
                operate: operate
              });

            case 5:
              sql = _context.t0 += _context.sent;
              _context.t1 = sql;
              _context.next = 9;
              return (0, _TermsSql.TimeBetween)('date_time', {
                start_time: start_time,
                end_time: end_time
              });

            case 9:
              sql = _context.t1 += _context.sent;
              _context.t2 = sql;
              _context.next = 13;
              return (0, _TermsSql.LimitSql)({
                from: from,
                to: to
              });

            case 13:
              sql = _context.t2 += _context.sent;
              console.log("查询地址", from, to);
              _context.next = 17;
              return (0, _DB.db)(sql);

            case 17:
              result = _context.sent;
              return _context.abrupt("return", resolve(result));

            case 21:
              _context.prev = 21;
              _context.t3 = _context["catch"](0);
              return _context.abrupt("return", resolve(_context.t3));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 21]]);
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
              sql = "SELECT id FROM Admin WHERE account = ".concat((0, _DB.escape)(account), " ");
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

function AddSql(_ref4) {
  var functions = _ref4.functions,
      operate = _ref4.operate,
      admin_id = _ref4.admin_id;
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve) {
      var sql, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _TermsSql.AddData)('Daily', {
                "function": functions,
                operate: operate,
                admin_id: admin_id
              });

            case 2:
              sql = _context3.sent;
              result = (0, _DB.db)(sql);
              return _context3.abrupt("return", resolve(result));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref5.apply(this, arguments);
    };
  }());
}