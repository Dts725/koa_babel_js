"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingRouter = void 0;

var _Meeting = require("../Service/Meeting/Meeting");

var Router = require('koa-router');

var router = new Router();
router.get('/Meeting', _Meeting.Meeting); // formRouter.use(basicUrl, router.routes())

var MeetingRouter = router.routes();
exports.MeetingRouter = MeetingRouter;