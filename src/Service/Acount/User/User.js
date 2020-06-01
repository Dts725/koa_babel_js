
export let User = async (ctx) => {
    // let { query } = await ctx.GetParams(ctx)
    let db, sql;

    sql = `SELECT * FROM  User`;

    db = await ctx.db(sql);
    ctx.body = db;
}