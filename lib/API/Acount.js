"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acount = void 0;

var _User = require("../Service/User/User.js");

var _Login = require("../Service/Acount/Login/Login.js");

var Router = require('koa-router');

var router = new Router();
var formRouter = new Router();
var basicUrl = '/acount';
router.all('/user', _User.User);
router.all('/login', _Login.Login);
formRouter.use(basicUrl, router.routes());
var acount = formRouter.routes();
exports.acount = acount;