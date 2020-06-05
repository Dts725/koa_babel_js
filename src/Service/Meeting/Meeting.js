import { findLimit } from "./MeetingDb"
export let Meeting = async (ctx) => {
    let { query } = await ctx.GetParams(ctx);
    await pageSplit(ctx, query)

}

// 简单列表分页查询
async function pageSplit(ctx, query) {
    let body = {}, db, page, page_size, meeting_name, compere_name, start_time, end_time;
    page = query.page ? query.page : 1;
    page_size = query.page_size ? query.page_size : 15;

    let pam = {
        from: (page - 1) * page_size,
        to: page * page_size,

    }
    pam = Object.assign({}, pam, query)
    db = await findLimit(pam);

    body = new ctx.ResPage({ data: db[0], total: db[1][0].total, page: page, page_size: page_size })
    ctx.body = body
}