
import { post } from './LoginDb'
export let Login = async (ctx) => {
    let { method } = await ctx.GetParams(ctx);
    let db = null;

    switch (method) {
        case 'get': {
            break;
        };
        case 'post': {

            db = await login(ctx);
            break;
        }
        case 'put': {
            break;
        }
        case 'delet': {
            break;
        }
        default: {
            db = 'default' + method
            break;
        }
    }



    ctx.body = db;
}
/**
 *  处理登陆功能
 * @param ctx 为 koa 对象
 */
async function login(ctx) {
    return new Promise(async resolve => {
        let body = {};
        let { query } = await ctx.GetParams(ctx);
        let db, sql = null;
        sql = post(query);
        db = await ctx.db(sql);
        // resolve(ctx.ResFomr)
        // return
        if (db.length) {
            if (db.password !== db.password) {
                body = new ctx.ResForm({ status: "请输入正确密码", code: '201' })
            } else {
                body = new ctx.ResForm({ status: "登陆成功!", data: db[0] })

            }
        } else {
            body = new ctx.ResForm({ status: "请输入正确的账号密码", code: '204' });
        }
        // console.log("注册时间", body);
        // console.log("注册时间", new ctx.ResForm({ status: "请输入正确密码", code: '201', data: db }));

        resolve(body)
    })

}