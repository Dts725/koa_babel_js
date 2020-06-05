"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Organization = void 0;

var _Find = require("../Service/Organization/Find/Find");

var _GetOrganization = require("../Service/Organization/GetOrganization/GetOrganization");

var Router = require('koa-router');

var router = new Router();
router.get('/find/organization/child/:id', _Find.FindChild);
router.get('/Organization', _GetOrganization.GetOrganization); // formRouter.use(basicUrl, router.routes())

var Organization = router.routes();
exports.Organization = Organization;