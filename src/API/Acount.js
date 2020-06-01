
let Router = require('koa-router');
let router = new Router();
let formRouter = new Router();
import { User } from '../Service/Acount/User/User.js'
import { Login } from '../Service/Acount/Login/Login.js'
let basicUrl = '/acount';
router.all('/user', User)
router.all('/login', Login);


formRouter.use(basicUrl, router.routes())
export let acount = formRouter.routes();