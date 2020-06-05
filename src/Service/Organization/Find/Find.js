import { SqlChild } from './FindDb'
export let FindChild = async (ctx) => {
    //   查看用
    let body = {}
    let pam = ctx.params;
    let db = await SqlChild(pam)
    if (db.length) {
        db = db.map(el => el.id);
        body = new ctx.ResForm({ data: db })
    } else {
        body = new ctx.ResForm({ status: "组织信息不存在", code: '201' })
    }
    ctx.body = body
}