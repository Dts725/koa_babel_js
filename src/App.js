const Koa = require('koa');
const bodyParser = require('koa-bodyParser');
const KoaOnerror = require('Koa-onerror');
const koaLogger = require('koa-logger');
var cors = require('koa2-cors');
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
app.use(
    cors({
        origin: function (ctx) { //设置允许来自指定域名请求
            const whiteList = ['localhost:8000', '127.0.0.1:3000']; //可跨域白名单

            let url = ctx.header.host;
            if (whiteList.includes(url)) {
                return 'http://' + url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
            }
            return 'http://192.168.1.22:8000'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
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