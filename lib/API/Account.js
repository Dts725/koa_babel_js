"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acount = void 0;

var _User = require("../Service/User/User.js");

var _Login = require("../Service/Account/Login/Login.js");

var _Account = require("../Service/Account/Account/Account.js");

var Router = require('koa-router');

var router = new Router();
var formRouter = new Router();
var basicUrl = '/account';
router.all('/user', _User.User);
router.post('/login', _Login.Login);

router.get('/:id', _Account.Account);
formRouter.use(basicUrl, router.routes());
var acount = formRouter.routes();
exports.acount = acount;