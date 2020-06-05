
let Router = require('koa-router');
let router = new Router();

import { Meeting } from '../Service/Meeting/Meeting'

router.get('/Meeting', Meeting)

// formRouter.use(basicUrl, router.routes())

export let MeetingRouter = router.routes();