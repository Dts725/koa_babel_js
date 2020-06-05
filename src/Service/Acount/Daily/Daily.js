import { FindDaily, FindId } from './DailyDb'
export let Daily = async (ctx) => {
    let { query } = await ctx.GetParams(ctx);

    await findLimt(ctx, query);


}

async function findLimt(ctx, query) {
    let body = {}, db, page, page_size, account, functions, operate, start_time, end_time, admin_id;
    page = query.page ? query.page : 1;
    page_size = query.page_size ? query.page_size : 15;
    start_time = query.start_time ? query.start_time : ''
    end_time = query.end_time ? query.end_time : ''
    operate = query.operate ? query.operate : ''
    account = query.account ? query.account : ''
    console.log('接收参数', account)
    // 搜索用户日志
    if (account) {
        admin_id = await FindId(account);
        admin_id = admin_id[0]?.id
    }


    ctx.body = admin_id;
    return
    let pam = {
        from: (page - 1) * page_size,
        to: page * page_size,
        meeting_name: meeting_name,
        functions: functions,
        start_time: start_time,
        end_time: end_time
    }
    db = await FindDaily(query)
    ctx.body = db
}