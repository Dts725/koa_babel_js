"use strict";

var _Account = require("./API/Account.js");

var _GetParams = require("./Utils/GetParams.js");

var _ResponseForm = require("./Utils/ResponseForm.js");

var _DB = require("./DB/DB");

var _Organization = require("./API/Organization.js");

var _User = require("./API/User.js");

var _Meeting = require("./API/Meeting");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Koa = require('koa');

var bodyParser = require('koa-bodyParser');

var KoaOnerror = require('Koa-onerror');

var koaLogger = require('koa-logger');

var http2 = require('http2');

var fs = require('fs');

var cors = require('koa2-cors');

var app = new Koa();
KoaOnerror(app);
app.use(koaLogger());
app.use(cors({
  origin: function origin(ctx) {
    //设置允许来自指定域名请求
    var whiteList = ['localhost:8080', '192.168.1.22:8080']; //可跨域白名单

    var url = ctx.header.host;

    if (whiteList.includes(url)) {
      return 'http://' + url; //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
    }

    return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
  },
  maxAge: 5,
  //指定本次预检请求的有效期，单位为秒。
  credentials: true,
  //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  //设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段

}));
app.use(bodyParser());
app.context.GetParams = _GetParams.GetParams;
app.context.ResForm = _ResponseForm.ResForm;
app.context.ResPage = _ResponseForm.ResPage;
app.context.escape = _DB.escape;
app.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return next();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.use( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return next();

          case 2:
            // console.log("第一次退出")
            ctx.body = JSON.stringify(ctx.body);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.use(_User.User);
app.use(_Meeting.MeetingRouter);
app.use(_Account.acount);
app.use(_Organization.Organization);
app.use(function (ctx, next) {
  ctx.body = {
    code: '404',
    status: '请求路径找不到 ' + ctx.url
  };
});
var options = {
  key: fs.readFileSync('./Conf/Key/private.pem'),
  cert: fs.readFileSync('./Conf/Key/csr.pem')
}; // app.listen(3000)

http2.createServer(options, app.callback()).listen(3000); // http.createServer(app.callback()).listen(3000);