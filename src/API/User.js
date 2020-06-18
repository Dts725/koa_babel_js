
let Router = require('koa-router');
let router = new Router();

import { Menu } from '../Service/User/Menu/Menu'
import { Daily } from "../Service/Account/Daily/Daily"
import { GetUserList } from '../Service/User/User/User'
import { Examine } from '../Service/Account/Examine/Examine'
import { UpdateAccountStatus } from '../Service/User/UpdateAccountStatus/UpdateAccountStatus'
router.post('/user/update/examine/status', Examine);
router.get('/menu/lists', Menu)
router.all('/Daily', Daily)
router.all('/user', GetUserList)
router.all('/user/:id', GetUserList)
router.get('/user/update/status/:id', UpdateAccountStatus)

// formRouter.use(basicUrl, router.routes())

export let User = router.routes();