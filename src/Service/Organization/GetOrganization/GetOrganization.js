import { GetOrganizationDb, GetOrganizationDbPam } from './GetOrganizationDb'
import { GenerateOptions } from '../../../Utils/JsonTree'
export let GetOrganization = async (ctx) => {
    let { query } = await ctx.GetParams(ctx);
    if (query.organization_ids) {
        //条件找寻
        await queryPam(ctx, query.organization_ids)

    } else {
        await queryAll(ctx)
    }
};

// 找寻所有
async function queryAll(ctx) {
    let body = {}, db;

    db = await GetOrganizationDb();
    // pids = db.filter(d => d.pid === 0)
    let o = {
        "is_edit": 0,
        "is_del": 0,
        "is_insert": 0
    }
    body = await GenerateOptions(db, o, 'sub')
    body = new ctx.ResForm({ data: body })
    ctx.body = body;
}


// 条件找寻

async function queryPam(ctx, organization_ids) {
    let body = {}, db;
    let o = {
        "is_edit": 0,
        "is_del": 0,
        "is_insert": 0
    }
    db = await GetOrganizationDbPam(organization_ids);
    body = await GenerateOptions(db, o, 'sub');
    body = new ctx.ResForm({ data: body });
    ctx.body = body;
}

