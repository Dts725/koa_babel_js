
import { SqlAdmin, SqlRole } from './LoginDb'
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
        db = await SqlAdmin(query);
        if (db.length) {
            db = db[0]
            if (db.password !== db.password) {
                body = new ctx.ResForm({ status: "请输入正确密码", code: '201' })
            } else {
                db.role_info = null;
                if (db.super_perm !== 1) {
                    db.role_info = await SqlRole({ role_id: db.role_id })
                }
                body = new ctx.ResForm({ status: "登陆成功!", data: db })

            }
        } else {
            body = new ctx.ResForm({ status: "请输入正确的账号密码", code: '204' });
        }

        resolve(body)
    })

}