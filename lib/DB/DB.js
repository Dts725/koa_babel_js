"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.escape = void 0;

var _Config = require("./Config");

var mysql = require('mysql');

// var pool = mysql.createPool(conf);
var pool = mysql.createPool(_Config.YZX);

var escape = function escape(str) {
  return pool.escape(str);
};

exports.escape = escape;

var db = function db(sql) {
  // 使用连接
  return new Promise(function (resolve) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // let en = pool.escape(sql)

      connection.query(sql, function (err, result, rows) {
        // 使用连接执行查询
        if (err) throw err; // 返回数据格式化 暂未发现影响

        var r = JSON.stringify(result);
        r = JSON.parse(r);
        resolve(r); // resolve(result);

        connection.release(); //连接不再使用，返回到连接池
      });
    });
  });
};
/**
  * 连接池里面创建了一个新连接时，会触发一个连接事件。如需要在使用此连接之前设置会话变量，将要对此事件进行监听。
  */


exports.db = db;
pool.on('connection', function (connection) {// connection.query('SET SESSION auto_increment_increment=1')
});

function end() {
  pool.end(function (err) {// all connections in the pool have ended
  });
}