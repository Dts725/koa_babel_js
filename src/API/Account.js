
let Router = require('koa-router');
let router = new Router();
let formRouter = new Router();
import { User } from '../Service/User/User.js'
import { Login } from '../Service/Account/Login/Login.js'
import { Account } from '../Service/Account/Account/Account.js'
let basicUrl = '/account';
router.all('/user', User)
router.post('/login', Login);
router.get('/:id', Account)

formRouter.use(basicUrl, router.routes())
export let acount = formRouter.routes();