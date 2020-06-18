"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = void 0;

var _LoginDb = require("./LoginDb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var _yield$ctx$GetParams, method, db;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ctx.GetParams(ctx);

          case 2:
            _yield$ctx$GetParams = _context.sent;
            method = _yield$ctx$GetParams.method;
            console.log("走不进去");
            db = null;
            _context.t0 = method;
            _context.next = _context.t0 === 'get' ? 9 : _context.t0 === 'post' ? 11 : _context.t0 === 'put' ? 15 : _context.t0 === 'delet' ? 16 : 17;
            break;

          case 9:
            return _context.abrupt("break", 19);

          case 11:
            _context.next = 13;
            return login(ctx);

          case 13:
            db = _context.sent;
            return _context.abrupt("break", 19);

          case 15:
            return _context.abrupt("break", 19);

          case 16:
            return _context.abrupt("break", 19);

          case 17:
            db = 'default' + method;
            return _context.abrupt("break", 19);

          case 19:
            ctx.body = db;

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Login(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *  处理登陆功能
 * @param ctx 为 koa 对象
 */


exports.Login = Login;

function login(_x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
                var body, _yield$ctx$GetParams2, query, db, sql;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        body = {};
                        _context2.next = 3;
                        return ctx.GetParams(ctx);

                      case 3:
                        _yield$ctx$GetParams2 = _context2.sent;
                        query = _yield$ctx$GetParams2.query;
                        sql = null;
                        _context2.next = 8;
                        return (0, _LoginDb.SqlAdmin)(query);

                      case 8:
                        db = _context2.sent;

                        if (!db.length) {
                          _context2.next = 23;
                          break;
                        }

                        db = db[0];

                        if (!(db.password !== db.password)) {
                          _context2.next = 15;
                          break;
                        }

                        body = new ctx.ResForm({
                          status: "请输入正确密码",
                          code: '201'
                        });
                        _context2.next = 21;
                        break;

                      case 15:
                        db.role_info = null;

                        if (!(db.super_perm !== 1)) {
                          _context2.next = 20;
                          break;
                        }

                        _context2.next = 19;
                        return (0, _LoginDb.SqlRole)({
                          role_id: db.role_id
                        });

                      case 19:
                        db.role_info = _context2.sent;

                      case 20:
                        body = new ctx.ResForm({
                          status: "登陆成功!",
                          data: db
                        });

                      case 21:
                        _context2.next = 24;
                        break;

                      case 23:
                        body = new ctx.ResForm({
                          status: "请输入正确的账号密码",
                          code: '204'
                        });

                      case 24:
                        resolve(body);

                      case 25:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _login.apply(this, arguments);
}