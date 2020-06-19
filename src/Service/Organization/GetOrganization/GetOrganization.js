import { GetOrganizationDb, GetOrganizationDbPam, EditDb } from './GetOrganizationDb'
import { GenerateOptions, TreeFlat } from '../../../Utils/JsonTree'
export let GetOrganization = async (ctx) => {


    let { method, query } = await ctx.GetParams(ctx);

    switch (method) {
        case 'get': {
            if (query.organization_ids) {
                //条件找寻
                await queryPam(ctx, query.organization_ids)

            } else {
                await queryAll(ctx)
            }
            break;
        }
        case 'post': {

            await addOrganization(ctx, query)
            break;
        }
        default: {
            break;
        }
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


// 针对 post 请求修改 组织列表

async function addOrganization(ctx, query) {
    // 展开jsonTree
    let tmp = await TreeFlat(JSON.parse(query.data))
    let del = [], edit = [], insert = [];
    ctx.body = tmp;


    tmp.map(el => {
        if (el.is_del === '1') {
            del.push(el.id)
        }
        if (el.is_edit === '1') {
            edit.push(el)
        }
        if (el.is_insert === '1') {
            insert.push(el)
        }
    })

    let result = await EditDb({ del, edit, insert })
    ctx.body = new ctx.ResForm({ data: result })

}



