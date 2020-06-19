import { GetUserListSql, GetUserDetailDb, UpdateDb, addDb, DeleteDb } from "./UserDb"
import { GetPageFromTo } from '../../../Utils/GetPageFromTo'
import { ResForm } from "../../../Utils/ResponseForm";
export let GetUserList = async (ctx) => {
    let { method, query } = await ctx.GetParams(ctx);

    switch (method) {
        case 'get': {
            if (query.id) {
                // 查看详情
                await getUserDetail(ctx, { id: query.id })

            } else {
                await queryFn(ctx, query)

            }
            break;
        }
        case 'post': {
            // 插入新增本地数据
            await addUser(ctx, query)
            break;
        }
        case 'put': {
            // 更新数据
            await update(ctx, query)
            break;
        }
        case 'delete': {
            await deleteFn(ctx, query)
            break;
        }
        default: {
            ctx.body = new ctx.ResPage({ data: [], status: "服务为正常匹配", code: '303' });
            break;
        }
    }
}
/**
 *  条件查询
 * 
 * @param {*} ctx  koa ctx 对象
 * @param {object} query get 请求中携带的参数
 * @param {number} quer.page  页码 
 * @param {number} quer.page_size  每页数量 
 * @param {string} quer.name  发起人 
 * @param {number} quer.phone  手机号 
 * @param {number} quer.organization_id  组织id 
 * @param {number} quer.is_online   是否线上是否线上 1-线下 2-线上'
 * @param {Date} quer.examine_start_datetime   开始时间
 * @param {Date} quer.examine_end_datetime   结束时间
 * @param {number} quer.Date   状态（1正常 2禁止)
 * @param {} quer.examine_status   审核结果状态
 * @param {number} quer.identity_type   身份类型: 1-党员 2-群众 3-预备党员
 * @param {string} quer.organization_ids   要查询的组织ids 字符串
 */
async function queryFn(ctx, query) {
    let body = {}, db = [];
    let { pam, page, page_size } = await GetPageFromTo(query)
    db = await GetUserListSql(pam);
    db[0] = await setAdd(db)
    body = new ctx.ResPage({ data: db[0], page_size, page, total: db[1][0].total });
    ctx.body = body;

}


/**查看用户详情
 * 
 * @param {*} ctx 
 * @param {object} object.id  要查询的宪法请id
 */

async function getUserDetail(ctx, { id }) {
    let db = [], body = {};
    db = await GetUserDetailDb({ id });

    if (!db[1].pid) {
        db[0].organization_name = []
    } else {
        db[0].organization_name = [db[1].id]
    }
    body = new ctx.ResForm({ data: db[0] });
    ctx.body = body
}
function getAge(birt) {
    if (!birt) return 56
    let byear = birt.substr(0, 4);
    let bmonth = birt.substr(5, 2)
    let nyear = new Date().getFullYear();
    let nmonth = new Date().getMonth + 1;
    let age = nyear - byear;
    age = bmonth > nmonth ? age : age + 1
    return age;
}


// 更新用户信息
async function update(ctx, pam) {
    let result = await UpdateDb(pam);
    if (result.affectedRows) {
        ctx.body = new ResForm({ data: [] })
    } else {
        ctx.body = new ResForm({ data: result })

    }


}



// 插入 新增数据
async function addUser(ctx, pam) {
    let result = await addDb(pam);
    if (result.affectedRows) {
        ctx.body = new ctx.ResForm({ data: [] })
    } else {
        ctx.body = new ctx.ResForm({ data: result })
    }

}

// 删出用户信息 
async function deleteFn(ctx, pam) {
    let result = await DeleteDb(pam);
    if (result.affectedRows) {
        ctx.body = new ctx.ResForm({ data: [] })
    } else {
        ctx.body = result;
    }

}

// 添加基本数据


function setAdd(db) {
    return new Promise(async resolve => {
        let data = db[0].map(el => {

            el.age = getAge(el.birth)
            console.log("数据处理", el)
            if (el.identity_type === 1) {
                el.identity_type_zh = "党员"
            }
            if (el.identity_type === 2) {
                el.identity_type_zh = "群众"
            }
            if (el.identity_type === 3) {
                el.identity_type_zh = "预备党员"
            }

            if (el.examine === 1) {
                el.user_status_zh = "已认证"
            }
            if (el.examine === 2) {
                el.user_status_zh = "未通过"
            }
            if (el.examine === 3) {
                el.user_status_zh = "待审核"
            }
            el.sex_zh = el.sex === 1 ? '男' : '女'
            return el;

        })
        return resolve(data)

    });
}