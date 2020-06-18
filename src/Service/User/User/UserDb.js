import { db, escape } from "../../../DB/DB"
import { EqualField, TimeBetween, LimitSql, LikeField, UpdateData, AddData } from '../.././../Utils/TermsSql'

// 获取列表分页查询
export async function GetUserListSql({ from, to, name, phone, organization_id, examine_start_datetime, examine_end_datetime, is_online, status, examine_status, identity_type, is_valid, create_start_datetime, create_end_datetime, organization_ids }) {
    return new Promise(async resolve => {
        let sql = "", result = [];
        sql += `SELECT SQL_CALC_FOUND_ROWS a.* , b.organization_name  FROM User AS a ,Organization AS b   WHERE  (a.organization_id = b.id OR a.organization_id = b.pid )  `
        sql += await EqualField({ obj: { organization_id, is_online, status, examine: examine_status, identity_type, is_valid }, str: sql })
        sql += await LikeField({ str: sql, obj: { name, phone }, alias: 'a' })

        sql += await TimeBetween('examine_time', { examine_start_datetime, examine_end_datetime, alias: 'a' });
        sql += ` group by id ORDER BY create_time DESC`
        sql += await LimitSql({ from, to })
        result = await db(sql);
        return resolve(result);
    })
}

//查看详情
export function GetUserDetailDb({ id }) {
    return new Promise(async resolve => {
        let result = [], result2 = []
        let sql = `SELECT a.*, IF(b.id = a.examine_user_id ,b.name,NULL) AS examine_user_name ,c.organization_name  FROM User AS a , Admin AS b, Organization AS c WHERE a.id = ${escape(id)} AND a.organization_id = c.id GROUP BY a.examine_user_id AND a.id`;
        result = await db(sql);

        let sql2 = `SELECT a.* FROM Organization AS a WHERE id = ${escape(result[0].organization_id)}`
        result2 = await db(sql2)
        result.push(result2)
        return resolve(result)
    })
}
// 更新本地数据详情
export function UpdateDb(pam) {
    return new Promise(async resolve => {
        let sql = ` UPDATE User SET`
        let id = pam.id;
        let query = pam;
        query.id = undefined;
        sql += await UpdateData(query)
        sql += ` WHERE id= ${escape(id)};`
        console.log("接收参数", sql)
        let result = await db(sql);
        return resolve(result);
    })
}

// 新增本地数据
export function addDb(pam) {
    return new Promise(async resolve => {
        let slpam = {
            create_time: new Date().format('yyyy-MM-dd h:m:s'),
            status: 1,
            is_online: 1
        }
        slpam = Object.assign({}, slpam, pam)
        let sql = await AddData('User', slpam);
        let result = await db(sql);
        return resolve(result)
    })
}

// 删除本地数据
export function DeleteDb({ id }) {
    return new Promise(async resolve => {
        let sql = `DELETE FROM User WHERE id in (${id})`;

        let result = await db(sql);
        return resolve(result)
    })
}