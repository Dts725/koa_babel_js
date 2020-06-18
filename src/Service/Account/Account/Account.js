import { GetAccountDb } from './AccountDb'
export let Account = async (ctx) => {
    let db = [], body = {}
    let { query } = await ctx.GetParams(ctx)
    db = await GetAccountDb(query);
    if (db.length) {
        body = new ctx.ResForm({ data: db[0] })
    } else {
        body = new ctx.ResForm({ status: '未查询到结果', code: '303' })
    }
    ctx.body = body


}
