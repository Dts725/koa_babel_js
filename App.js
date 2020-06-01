const Koa = require('koa');
const bodyParser = require('koa-bodyParser');
const KoaOnerror = require('Koa-onerror');
const koaLogger = require('koa-logger');
import { acount } from './src/API/Acount.js';
import { GetParams } from './Utils/GetParams.js'
import { ResForm } from './Utils/ResponseForm.js'
import { db, escape } from "./src/DB/DB"
const app = new Koa();
KoaOnerror(app);
app.use(koaLogger());
app.use(bodyParser());

app.context.GetParams = GetParams;
app.context.ResForm = ResForm;
app.context.db = db;
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
app.use(acount)

app.use((ctx, next) => {
    ctx.body = "404" + ctx.parth
})


app.listen(3000);