const Koa = require('koa');
const bodyParser = require('koa-bodyParser');
const KoaOnerror = require('Koa-onerror');
const koaLogger = require('koa-logger');
import { acount } from './API/Acount.js';
import { GetParams } from './Utils/GetParams.js'
import { ResForm, ResPage } from './Utils/ResponseForm.js'
import { db, escape } from "./DB/DB"
import { Organization } from './API/Organization.js'
import { User } from './API/User.js'
import { MeetingRouter } from './API/Meeting'
const app = new Koa();
KoaOnerror(app);
app.use(koaLogger());
app.use(bodyParser());

app.context.GetParams = GetParams;
app.context.ResForm = ResForm;
app.context.ResPage = ResPage;
app.context.escape = escape;

app.use(async (ctx, next) => {
    // console.log("第一次进入")
    await next();
    // console.log("第二次退出");
});
app.use(async (ctx, next) => {

    // console.log("第二次进入")
    await next();
    // console.log("第一次退出")

    ctx.body = JSON.stringify(ctx.body)
});
app.use(User)
app.use(MeetingRouter)
app.use(acount)
app.use(Organization)

app.use((ctx, next) => {
    ctx.body = {
        code: '404',
        status: '请求路径找不到 ' + ctx.url,
    }
})


app.listen(3000);