import { db, escape } from '../../../DB/DB'
import { EqualField, LimitSql, TimeBetween, AddData } from "../../../Utils/TermsSql"
export function FindDaily({ admin_id, functions = "", operate = "", from, to, start_time = "", end_time = "" }) {
    return new Promise(async resolve => {
        try {
            let sql = "", result = [];
            sql += `SELECT SQL_CALC_FOUND_ROWS a.*,b.name FROM Daily AS a LEFT JOIN Admin AS b ON  a.admin_id = b.id `
            sql += await EqualField({ obj: { admin_id, function: functions, operate }, str: sql });
            sql += await TimeBetween('date_time', { start_time, end_time })
            sql += await LimitSql({ from, to });
            console.log("查询地址", sql)
            result = await db(sql);
            return resolve(result)
        } catch (error) {
            return resolve(error)
        }

    })
}
export function FindId(account) {
    return new Promise(async resolve => {
        let sql, result;
        sql = `SELECT id FROM Admin WHERE account = ${escape(account)} `;
        result = await db(sql);
        return resolve(result);
    })
}



export function AddSql({ functions, operate, admin_id }) {
    return new Promise(async resolve => {
        let sql = await AddData('Daily', { function: functions, operate, admin_id });
        let result = db(sql);
        return resolve(result)
    })
}