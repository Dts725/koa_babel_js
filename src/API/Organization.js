
let Router = require('koa-router');
let router = new Router();

import { FindChild } from '../Service/Organization/Find/Find'
import { GetOrganization } from '../Service/Organization/GetOrganization/GetOrganization'
import { SearchOrganization } from '../Service/Organization/SearchOrganization/SearchOrganization'
import { DeleteOrganization } from '../Service/Organization/DeleteOrganization/DeleteOrganization'

router.get('/find/organization/child/:id', FindChild)
router.all('/Organization', GetOrganization)
router.get('/Organization/lists', SearchOrganization)
router.get('/have/use/:id', DeleteOrganization)

// formRouter.use(basicUrl, router.routes())

export let Organization = router.routes();