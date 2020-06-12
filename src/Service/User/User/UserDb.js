import { db, escape } from "../../../DB/DB"
import { EqualField, TimeBetween, LimitSql, LikeField } from '../.././../Utils/TermsSql'
export async function GetUserListSql({ from, to, name, phone, organization_id, examine_start_datetime, examine_end_datetime, is_online, status, examine_status, identity_type, is_valid, create_start_datetime, create_end_datetime, organization_ids }) {
    return new Promise(async resolve => {
        let sql = "", result = [];
        sql += `SELECT SQL_CALC_FOUND_ROWS a.* , b.organization_name ,c.name AS  examine_user_name FROM User AS a ,Organization AS b, Admin AS c  WHERE  a.organization_id = b.id AND (a.examine_user_id = c.id or a.examine_user_id = 0) `
        sql += await EqualField({ obj: { organization_id, is_online, status, examine: examine_status, identity_type, is_valid }, str: sql })
        sql += await LikeField({ str: sql, obj: { name, phone }, alias: 'a' })

        sql += await TimeBetween('examine_time', { examine_start_datetime, examine_end_datetime, alias: 'a' });
        sql += `group by id ORDER BY create_time DESC`
        sql += await LimitSql({ from, to })
        result = await db(sql);
        return resolve(result);
    })
}