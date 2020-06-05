
let Router = require('koa-router');
let router = new Router();

import { Menu } from '../Service/User/Menu/Menu'
import { Daily } from "../Service/Acount/Daily/Daily"

router.get('/menu/lists', Menu)
router.get('/Daily', Daily)

// formRouter.use(basicUrl, router.routes())

export let User = router.routes();