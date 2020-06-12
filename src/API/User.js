
let Router = require('koa-router');
let router = new Router();

import { Menu } from '../Service/User/Menu/Menu'
import { Daily } from "../Service/Account/Daily/Daily"
import { GetUserList } from '../Service/User/User/User'

router.get('/menu/lists', Menu)
router.all('/Daily', Daily)
router.all('/user', GetUserList)

// formRouter.use(basicUrl, router.routes())

export let User = router.routes();