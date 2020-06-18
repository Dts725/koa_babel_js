import { UpdateDb } from './UpdateStatusDb'
export async function UpdateAccountStatus(ctx) {
    let { query } = await ctx.GetParams(ctx);
    let result = await UpdateDb(query);
    if (result.affectedRows) {
        ctx.body = new ctx.ResForm({ data: [] });

    } else {
        ctx.body = result;
    }

}