
import { IshaveDb, DeleteDb } from './DeleteOrganizationDb'
// 删除组织 需要判断当前id 是否在使用
export async function DeleteOrganization(ctx) {
    let { query } = await ctx.GetParams(ctx);
    // 是否有人属于该组织


    let isHave = await IshaveDb(query);
    if (isHave[0]['count(id)']) {
        ctx.body = new ctx.ResForm({ status: "该组织下有人不能删除" });
    } else {

        let tmp = await DeleteDb(query)
        if (tmp.affectedRows) {
            ctx.body = new ctx.ResForm({ data: [] });
        } else {
            ctx.body = tmp;
        }

    }

}