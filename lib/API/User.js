"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _Menu = require("../Service/User/Menu/Menu");

var _Daily = require("../Service/Acount/Daily/Daily");

var Router = require('koa-router');

var router = new Router();
router.get('/menu/lists', _Menu.Menu);
router.get('/Daily', _Daily.Daily); // formRouter.use(basicUrl, router.routes())

var User = router.routes();
exports.User = User;