"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _Menu = require("../Service/User/Menu/Menu");

var _Daily = require("../Service/Account/Daily/Daily");

var _User = require("../Service/User/User/User");

var Router = require('koa-router');

var router = new Router();
router.get('/menu/lists', _Menu.Menu);
router.all('/Daily', _Daily.Daily);
router.all('/user', _User.GetUserList);
router.all('/user/:id', _User.GetUserList); // formRouter.use(basicUrl, router.routes())

var User = router.routes();
exports.User = User;