"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserList = void 0;

var _UserDb = require("./UserDb");

var _GetPageFromTo = require("../../../Utils/GetPageFromTo");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var GetUserList = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var _yield$ctx$GetParams, method, query;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ctx.GetParams(ctx);

          case 2:
            _yield$ctx$GetParams = _context.sent;
            method = _yield$ctx$GetParams.method;
            query = _yield$ctx$GetParams.query;
            _context.t0 = method;
            _context.next = _context.t0 === 'get' ? 8 : _context.t0 === 'post' ? 16 : _context.t0 === 'put' ? 17 : _context.t0 === 'delete' ? 18 : 19;
            break;

          case 8:
            if (!query.id) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return getUserDetail(ctx, {
              id: query.id
            });

          case 11:
            _context.next = 15;
            break;

          case 13:
            _context.next = 15;
            return queryFn(ctx, query);

          case 15:
            return _context.abrupt("break", 21);

          case 16:
            return _context.abrupt("break", 21);

          case 17:
            return _context.abrupt("break", 21);

          case 18:
            return _context.abrupt("break", 21);

          case 19:
            ctx.body = new ctx.ResPage({
              data: [],
              status: "服务为正常匹配",
              code: '303'
            });
            return _context.abrupt("break", 21);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function GetUserList(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *  条件查询
 * 
 * @param {*} ctx  koa ctx 对象
 * @param {object} query get 请求中携带的参数
 * @param {number} quer.page  页码 
 * @param {number} quer.page_size  每页数量 
 * @param {string} quer.name  发起人 
 * @param {number} quer.phone  手机号 
 * @param {number} quer.organization_id  组织id 
 * @param {number} quer.is_online   是否线上是否线上 1-线下 2-线上'
 * @param {Date} quer.examine_start_datetime   开始时间
 * @param {Date} quer.examine_end_datetime   结束时间
 * @param {number} quer.Date   状态（1正常 2禁止)
 * @param {} quer.examine_status   审核结果状态
 * @param {number} quer.identity_type   身份类型: 1-党员 2-群众 3-预备党员
 * @param {string} quer.organization_ids   要查询的组织ids 字符串
 */


exports.GetUserList = GetUserList;

function queryFn(_x2, _x3) {
  return _queryFn.apply(this, arguments);
}
/**查看用户详情
 * 
 * @param {*} ctx 
 * @param {object} object.id  要查询的宪法请id
 */


function _queryFn() {
  _queryFn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, query) {
    var body, db, _yield$GetPageFromTo, pam, page, page_size;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = {}, db = [];
            _context2.next = 3;
            return (0, _GetPageFromTo.GetPageFromTo)(query);

          case 3:
            _yield$GetPageFromTo = _context2.sent;
            pam = _yield$GetPageFromTo.pam;
            page = _yield$GetPageFromTo.page;
            page_size = _yield$GetPageFromTo.page_size;
            _context2.next = 9;
            return (0, _UserDb.GetUserListSql)(pam);

          case 9:
            db = _context2.sent;
            db[0] = db[0].map(function (el) {
              if (el.identity_type === 1) {
                el.identity_type_zh = "党员";
              }

              if (el.identity_type === 2) {
                el.identity_type_zh = "群众";
              }

              if (el.identity_type === 3) {
                el.identity_type_zh = "预备党员";
              }

              if (el.examine === 1) {
                el.user_status_zh = "已认证";
              }

              if (el.examine === 2) {
                el.user_status_zh = "未通过";
              }

              if (el.examine === 3) {
                el.user_status_zh = "待审核";
              }

              el.sex_zh = el.sex === 1 ? '男' : '女';
              return el;
            });
            body = new ctx.ResPage({
              data: db[0],
              page_size: page_size,
              page: page,
              total: db[1][0].total
            });
            ctx.body = body;

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _queryFn.apply(this, arguments);
}

function getUserDetail(_x4, _x5) {
  return _getUserDetail.apply(this, arguments);
}

function _getUserDetail() {
  _getUserDetail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, _ref2) {
    var id, db, body;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref2.id;
            db = [], body = {};
            _context3.next = 4;
            return (0, _UserDb.GetUserDetailDb)({
              id: id
            });

          case 4:
            db = _context3.sent;

            if (!db[1].pid) {
              db[0].organization_name = [];
            } else {
              db[0].organization_name = [db[1].id];
            }

            body = new ctx.ResForm({
              data: db[0]
            });
            ctx.body = body;

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getUserDetail.apply(this, arguments);
}