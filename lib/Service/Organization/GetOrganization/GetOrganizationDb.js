"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetOrganizationDbPam = exports.GetOrganizationDb = void 0;

var _DB = require("../../../DB/DB");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var GetOrganizationDb = function GetOrganizationDb() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var sql, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              sql = "SELECT * FROM Organization ";
              _context.next = 3;
              return (0, _DB.db)(sql);

            case 3:
              result = _context.sent;
              return _context.abrupt("return", resolve(result));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.GetOrganizationDb = GetOrganizationDb;

var GetOrganizationDbPam = function GetOrganizationDbPam(pam) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
      var sql, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sql = "SELECT * FROM Organization WHERE Organization.id in (".concat(pam, ")");
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
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.GetOrganizationDbPam = GetOrganizationDbPam;