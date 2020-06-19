import { queryDb } from './SearchOrganizationDb'
export async function SearchOrganization(ctx) {
    let { query } = await ctx.GetParams(ctx);
    let result = await queryDb(query);
    ctx.body = new ctx.ResForm({ data: { data: result } })
}