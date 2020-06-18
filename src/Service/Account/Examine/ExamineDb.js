import { db, escape } from '../../../DB/DB'
export function UpdateExamineDb({ examine_status, id, examine_user_id, examine_reason }) {
    return new Promise(async resolve => {
        // UPDATE `User` SET examine_reason = "测试是否通过", examine_user_id = 1 ,examine = 1 WHERE id = 132
        let sql = `UPDATE User SET examine_reason = ${escape(examine_reason)}, examine_user_id = ${examine_user_id} ,examine = ${escape(examine_status)} WHERE id = ${escape(id)}`
        let result = await db(sql);
        return resolve(result)
    })
}