"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Daily = void 0;

var _DailyDb = require("./DailyDb");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Daily = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var _yield$ctx$GetParams, query, method;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ctx.GetParams(ctx);

          case 2:
            _yield$ctx$GetParams = _context.sent;
            query = _yield$ctx$GetParams.query;
            method = _yield$ctx$GetParams.method;
            _context.t0 = method;
            _context.next = _context.t0 === 'get' ? 8 : _context.t0 === 'post' ? 11 : 14;
            break;

          case 8:
            _context.next = 10;
            return findLimt(ctx, query);

          case 10:
            return _context.abrupt("break", 15);

          case 11:
            _context.next = 13;
            return addInsert(ctx, query);

          case 13:
            return _context.abrupt("break", 15);

          case 14:
            return _context.abrupt("break", 15);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Daily(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *  分页 条件查询日志
 * @param {*} ctx koa 请求实例
 * @param {object} query  请求参数
 * @param {number} query.page  页码
 * @param {number}  query.page_size  每页包含数据
 * @param {string}  query.functions  功能
 * @param {string}  query.operate 操作
 * @param {Date}    query.start_time  开始时间
 * @param {Date}    query.end_time  结束时间
 * @param {string}  query.acount  账户
 *
 */


exports.Daily = Daily;

function findLimt(_x2, _x3) {
  return _findLimt.apply(this, arguments);
}

function _findLimt() {
  _findLimt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, query) {
    var body, db, page, page_size, account, admin_id, _admin_id$, pam;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = {};
            page = (query === null || query === void 0 ? void 0 : query.page) || 1;
            page_size = (query === null || query === void 0 ? void 0 : query.page_size) || 15;
            account = (query === null || query === void 0 ? void 0 : query.account) || ""; // 搜索用户日志

            if (!account) {
              _context2.next = 12;
              break;
            }

            _context2.next = 7;
            return (0, _DailyDb.FindId)(account);

          case 7:
            admin_id = _context2.sent;
            admin_id = ((_admin_id$ = admin_id[0]) === null || _admin_id$ === void 0 ? void 0 : _admin_id$.id) || '';

            if (admin_id) {
              _context2.next = 12;
              break;
            }

            ctx.body = new ctx.ResPage({
              status: "请输入正确的账号查询",
              code: '203'
            });
            return _context2.abrupt("return");

          case 12:
            pam = {
              from: (page - 1) * page_size,
              to: Number(page_size),
              admin_id: admin_id
            };
            pam = Object.assign({}, pam, query);
            _context2.next = 16;
            return (0, _DailyDb.FindDaily)(pam);

          case 16:
            db = _context2.sent;
            body = new ctx.ResPage({
              data: db[0],
              page: page,
              page_size: page_size,
              total: db[1][0].total
            });
            ctx.body = body;

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _findLimt.apply(this, arguments);
}

function addInsert(_x4, _x5) {
  return _addInsert.apply(this, arguments);
}

function _addInsert() {
  _addInsert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, query) {
    var pam, body;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            pam = {
              functions: query["function"]
            };
            _context3.next = 3;
            return (0, _DailyDb.AddSql)(_objectSpread(_objectSpread({}, query), pam));

          case 3:
            body = new ctx.ResForm({});
            ctx.body = body;

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _addInsert.apply(this, arguments);
}