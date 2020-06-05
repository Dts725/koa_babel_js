"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetOrganization = void 0;

var _GetOrganizationDb = require("./GetOrganizationDb");

var _JsonTree = require("../../../Utils/JsonTree");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var GetOrganization = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var _yield$ctx$GetParams, query;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ctx.GetParams(ctx);

          case 2:
            _yield$ctx$GetParams = _context.sent;
            query = _yield$ctx$GetParams.query;

            if (!query.organization_ids) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return queryPam(ctx, query.organization_ids);

          case 7:
            _context.next = 11;
            break;

          case 9:
            _context.next = 11;
            return queryAll(ctx);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function GetOrganization(_x) {
    return _ref.apply(this, arguments);
  };
}(); // 找寻所有


exports.GetOrganization = GetOrganization;

function queryAll(_x2) {
  return _queryAll.apply(this, arguments);
} // 条件找寻


function _queryAll() {
  _queryAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
    var body, db, o;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = {};
            _context2.next = 3;
            return (0, _GetOrganizationDb.GetOrganizationDb)();

          case 3:
            db = _context2.sent;
            // pids = db.filter(d => d.pid === 0)
            o = {
              "is_edit": 0,
              "is_del": 0,
              "is_insert": 0
            };
            _context2.next = 7;
            return (0, _JsonTree.GenerateOptions)(db, o, 'sub');

          case 7:
            body = _context2.sent;
            body = new ctx.ResForm({
              data: body
            });
            ctx.body = body;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _queryAll.apply(this, arguments);
}

function queryPam(_x3, _x4) {
  return _queryPam.apply(this, arguments);
}

function _queryPam() {
  _queryPam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, organization_ids) {
    var body, db, o;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = {};
            o = {
              "is_edit": 0,
              "is_del": 0,
              "is_insert": 0
            };
            _context3.next = 4;
            return (0, _GetOrganizationDb.GetOrganizationDbPam)(organization_ids);

          case 4:
            db = _context3.sent;
            _context3.next = 7;
            return (0, _JsonTree.GenerateOptions)(db, o, 'sub');

          case 7:
            body = _context3.sent;
            body = new ctx.ResForm({
              data: body
            });
            ctx.body = body;

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _queryPam.apply(this, arguments);
}