"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserListSql = GetUserListSql;
exports.GetUserDetailDb = GetUserDetailDb;

var _DB = require("../../../DB/DB");

var _TermsSql = require("../.././../Utils/TermsSql");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function GetUserListSql(_x) {
  return _GetUserListSql.apply(this, arguments);
}

function _GetUserListSql() {
  _GetUserListSql = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref) {
    var from, to, name, phone, organization_id, examine_start_datetime, examine_end_datetime, is_online, status, examine_status, identity_type, is_valid, create_start_datetime, create_end_datetime, organization_ids;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            from = _ref.from, to = _ref.to, name = _ref.name, phone = _ref.phone, organization_id = _ref.organization_id, examine_start_datetime = _ref.examine_start_datetime, examine_end_datetime = _ref.examine_end_datetime, is_online = _ref.is_online, status = _ref.status, examine_status = _ref.examine_status, identity_type = _ref.identity_type, is_valid = _ref.is_valid, create_start_datetime = _ref.create_start_datetime, create_end_datetime = _ref.create_end_datetime, organization_ids = _ref.organization_ids;
            return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
                var sql, result;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        sql = "", result = [];
                        sql += "SELECT SQL_CALC_FOUND_ROWS a.* , b.organization_name ,c.name AS  examine_user_name FROM User AS a ,Organization AS b, Admin AS c  WHERE  a.organization_id = b.id AND (a.examine_user_id = c.id or a.examine_user_id = 0) ";
                        _context2.t0 = sql;
                        _context2.next = 5;
                        return (0, _TermsSql.EqualField)({
                          obj: {
                            organization_id: organization_id,
                            is_online: is_online,
                            status: status,
                            examine: examine_status,
                            identity_type: identity_type,
                            is_valid: is_valid
                          },
                          str: sql
                        });

                      case 5:
                        sql = _context2.t0 += _context2.sent;
                        _context2.t1 = sql;
                        _context2.next = 9;
                        return (0, _TermsSql.LikeField)({
                          str: sql,
                          obj: {
                            name: name,
                            phone: phone
                          },
                          alias: 'a'
                        });

                      case 9:
                        sql = _context2.t1 += _context2.sent;
                        _context2.t2 = sql;
                        _context2.next = 13;
                        return (0, _TermsSql.TimeBetween)('examine_time', {
                          examine_start_datetime: examine_start_datetime,
                          examine_end_datetime: examine_end_datetime,
                          alias: 'a'
                        });

                      case 13:
                        sql = _context2.t2 += _context2.sent;
                        sql += "group by id ORDER BY create_time DESC";
                        _context2.t3 = sql;
                        _context2.next = 18;
                        return (0, _TermsSql.LimitSql)({
                          from: from,
                          to: to
                        });

                      case 18:
                        sql = _context2.t3 += _context2.sent;
                        _context2.next = 21;
                        return (0, _DB.db)(sql);

                      case 21:
                        result = _context2.sent;
                        return _context2.abrupt("return", resolve(result));

                      case 23:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _GetUserListSql.apply(this, arguments);
}

function GetUserDetailDb(_ref2) {
  var id = _ref2.id;
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var result, result2, sql, sql2;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = [], result2 = [];
              sql = "SELECT a.*, IF(b.id = a.examine_user_id ,b.name,NULL) AS examine_user_name ,c.organization_name  FROM User AS a , Admin AS b, Organization AS c WHERE a.id = ".concat((0, _DB.escape)(id), " AND a.organization_id = c.id GROUP BY a.examine_user_id AND a.id");
              _context.next = 4;
              return (0, _DB.db)(sql);

            case 4:
              result = _context.sent;
              sql2 = "SELECT a.* FROM Organization AS a WHERE id = ".concat((0, _DB.escape)(result[0].organization_id));
              _context.next = 8;
              return (0, _DB.db)(sql2);

            case 8:
              result2 = _context.sent;
              result.push(result2);
              return _context.abrupt("return", resolve(result));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
}