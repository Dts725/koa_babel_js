import { FindDaily, FindId, AddSql } from './DailyDb'
export let Daily = async (ctx) => {
    let { query, method } = await ctx.GetParams(ctx);
    switch (method) {
        case 'get': {
            // 查询
            await findLimt(ctx, query);
            break;
        }

        case 'post': {
            // 新增
            await addInsert(ctx, query)
            break;
        }

        default: {
            break;
        }
    }



}
/**
 *  分页 条件查询日志
 * @param {*} ctx koa 请求实例
 * @param {object} query  请求参数
 * @param {number} query.page  页码
 * @param {number}  query.page_size  每页包含数据
 * @param {string}  query.functions  功能
 * @param {string}  query.operate 操作
 * @param {Date}    query.start_time  开始时间
 * @param {Date}    query.end_time  结束时间
 * @param {string}  query.acount  账户
 *
 */

async function findLimt(ctx, query) {
    let body = {}, db, page, page_size, account, admin_id;
    page = query?.page || 1
    page_size = query?.page_size || 15
    account = query?.account || ""
    // 搜索用户日志
    if (account) {
        /**获取用户id  */
        admin_id = await FindId(account);
        admin_id = admin_id[0]?.id || ''
        if (!admin_id) {
            ctx.body = new ctx.ResPage({ status: "请输入正确的账号查询", code: '203' })
            return
        }
    }
    let pam = {
        from: (page - 1) * page_size,
        to: Number(page_size),
        admin_id: admin_id
    }


    pam = Object.assign({}, pam, query)
    db = await FindDaily(pam)
    try {
        body = new ctx.ResPage({ data: db[0], page, page_size, total: db[1][0].total })
        ctx.body = body
    } catch (error) {
        console.log("结果报错", db)
        ctx.body = error
    }

}

async function addInsert(ctx, query) {
    let pam = {
        functions: query.function
    }
    await AddSql({ ...query, ...pam });
    let body = new ctx.ResForm({});
    ctx.body = body

}