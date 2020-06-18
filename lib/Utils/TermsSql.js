"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TermsSql = TermsSql;
exports.TermsLikeSql = TermsLikeSql;
exports.LikeField = LikeField;
exports.EqualField = EqualField;
exports.TimeBetween = TimeBetween;
exports.LimitSql = LimitSql;
exports.AddData = AddData;

var _DB = require("../DB/DB");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 *   常规条件精准查询 obj 字段名 必须等于 表中的字段名 否则报错
 * @param {string} tableName  数据库 表名
 * @param {objec} obj 要查询的条件对象
 * @returns {Promise} Promise<any>
 */
function TermsSql(tableName, obj) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var _GetLimtStr, str, result;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _GetLimtStr = new GetLimtStr(tableName), str = _GetLimtStr.str;
              _context.next = 3;
              return EqualField({
                str: str,
                obj: obj
              });

            case 3:
              result = _context.sent;
              return _context.abrupt("return", resolve(str + result));

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
}
/**
 *   常规模糊查询 obj 字段名 必须等于 表中的字段名 否则报错
 * @param {string} tableName  数据库 表名
 * @param {objec} obj 要查询的条件对象
 * @returns {Promise} Promise<any>
 */


function TermsLikeSql(tableName, obj) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
      var _GetLimtStr2, str, sqls;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _GetLimtStr2 = new GetLimtStr(tableName), str = _GetLimtStr2.str;
              _context2.next = 3;
              return LikeField({
                obj: obj,
                str: str
              });

            case 3:
              sqls = _context2.sent;
              return _context2.abrupt("return", resolve(str + sqls));

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
}
/**
 *   生成纯粹Like 模糊查询字段
 * @param {object} obj  要查询的字段对象  字段名必须对应数据库字段名
 * @param {object}   connect  like 语句和现有语句的组合关系  es:  and  or 默认 AND ,
 * @param {object}   str   判断是否需要 添加连接符
 */


function LikeField(_ref3) {
  var obj = _ref3.obj,
      _ref3$connect = _ref3.connect,
      connect = _ref3$connect === void 0 ? 'AND' : _ref3$connect,
      str = _ref3.str,
      _ref3$alias = _ref3.alias,
      alias = _ref3$alias === void 0 ? false : _ref3$alias;
  return new Promise(function (resolve) {
    var sqls = "",
        sqlArr = [];
    Object.keys(obj).forEach(function (el) {
      if (obj[el]) {
        sqlArr.push(" ".concat(alias ? alias + '.' : "").concat(el, " LIKE ").concat((0, _DB.escape)('%' + obj[el] + '%')));
      }
    });

    if (sqlArr.length) {
      if (str.search('WHERE') !== -1 || str.search('where') !== -1) {
        sqls += " ".concat(connect, "  ").concat(sqlArr.join('AND'));
      } else {
        sqls += ' WHERE' + sqlArr.join('AND');
      }
    }

    return resolve(sqls);
  });
}
/**
 *   生成纯粹 全等条件查询字段
 * @param {object} obj  要查询的字段对象  字段名必须对应数据库字段名
 * @param {object}   connect  and 语句和现有语句的组合关系  es:  and  or 默认 AND ,
 * @param {object}   str   判断是否需要 添加连接符
 */


function EqualField(_ref4) {
  var obj = _ref4.obj,
      _ref4$connect = _ref4.connect,
      connect = _ref4$connect === void 0 ? 'AND' : _ref4$connect,
      str = _ref4.str,
      _ref4$alias = _ref4.alias,
      alias = _ref4$alias === void 0 ? false : _ref4$alias;
  return new Promise(function (resolve) {
    var sqls = "",
        sqlArr = [];
    Object.keys(obj).forEach(function (el) {
      if (obj[el]) {
        sqlArr.push(" ".concat(alias ? alias + '.' : "").concat(el, " = ").concat((0, _DB.escape)(obj[el])));
      }
    });

    if (sqlArr.length) {
      if (str.search('WHERE') !== -1 || str.search('where') !== -1) {
        sqls += " ".concat(connect, "  ").concat(sqlArr.join('AND'));
      } else {
        sqls += ' WHERE' + sqlArr.join('AND');
      }
    }

    return resolve(sqls);
  });
}
/**
 *  生成时间区段 sql
 * @param {*} name 
 * @param {*} param1 
 * @param {Date} param1.start_time
 * @param {Date} param1.end_time
* @returns {Promise} Promise<any>
 */


function TimeBetween(name, _ref5) {
  var start_time = _ref5.start_time,
      end_time = _ref5.end_time;
  return new Promise(function (resolve) {
    var sql = "";

    if (start_time && end_time) {
      sql = " AND ".concat(name, " BETWEEN ").concat((0, _DB.escape)(start_time), " AND ").concat((0, _DB.escape)(end_time));
    } else {
      sql = "";
    }

    return resolve(sql);
  });
}
/**
 * 生成 分页sql
 * @param { object}  obj
 * @param {umber} obj.from 开始位置
 * @param {number} obj.to  结束位置
 * @returns {Promise} Promise<any>
 * 
 */


function LimitSql(_ref6) {
  var from = _ref6.from,
      to = _ref6.to;
  return new Promise(function (resolve) {
    var sql = " LIMIT  ".concat((0, _DB.escape)(from), ", ").concat((0, _DB.escape)(to), "; SELECT FOUND_ROWS() as total;");
    return resolve(sql);
  });
}
/**
 *  生成插入  sql
 * @param {*} tabelName  表名
 * @param {*} param1 
* @returns {Promise} Promise<any>
*/


function AddData(tabelName, obj) {
  return new Promise(function (resolve) {
    var fildes = [],
        values = [],
        sql = "";
    Object.keys(obj).forEach(function (el) {
      if (obj[el]) {
        fildes.push(el);
        values.push((0, _DB.escape)(obj[el]));
      }
    });
    sql = "INSERT INTO ".concat(tabelName, " (").concat(fildes.join(), ") VALUES (").concat(values.join(), ");");
    return resolve(sql);
  });
} // export function LeftJoin(tableName1, tableName2, obj) {
//     let str = `SELECT SQL_CALC_FOUND_ROWS a.* , b.* FROM User AS a LEFT JOIN  Organization AS b ON a.organization_id = b.id`
// }

/**
 * 生成分页查询询字符串
 */


var GetLimtStr = function GetLimtStr(tableName) {
  _classCallCheck(this, GetLimtStr);

  this.str = "SELECT SQL_CALC_FOUND_ROWS * FROM ".concat(tableName);
};