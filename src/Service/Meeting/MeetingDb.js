import { db, escape } from "../../DB/DB"
import { LimitSql, TermsLikeSql, TimeBetween } from '../../Utils/TermsSql'
export function findLimit({ from, to, meeting_name, compere_name, start_time, end_time }) {
    return new Promise(async resolve => {
        // SELECT SQL_CALC_FOUND_ROWS * FROM Meeting LIMIT 0,4;
        // SELECT FOUND_ROWS() as total;
        let sql = "", result = {};

        sql = await TermsLikeSql('Meeting', { meeting_name, compere_name })
        sql += await TimeBetween('start_time', { start_time, end_time })
        sql += await LimitSql({ from, to })
        result = db(sql)
        return resolve(result)
    })
}
// sql += await TermsSql('Meeting', { meeting_name, compere_name })
// if (start_time && end_time) {
//     sql += `date_time BETWEEN ${escape(start_time)} AND ${end_time}`
// }
