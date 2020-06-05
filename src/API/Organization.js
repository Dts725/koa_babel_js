
let Router = require('koa-router');
let router = new Router();

import { FindChild } from '../Service/Organization/Find/Find'
import { GetOrganization } from '../Service/Organization/GetOrganization/GetOrganization'

router.get('/find/organization/child/:id', FindChild)
router.get('/Organization', GetOrganization)

// formRouter.use(basicUrl, router.routes())

export let Organization = router.routes();