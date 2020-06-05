import { db, escape } from "../../DB/DB"
export function findLimit({ from, to, meeting_name, compere_name, start_time, end_time }) {
    return new Promise(async resolve => {
        // SELECT SQL_CALC_FOUND_ROWS * FROM Meeting LIMIT 0,4;
        // SELECT FOUND_ROWS() as total;
        let sql, sql2, sql3, result;
        sql = `SELECT SQL_CALC_FOUND_ROWS * FROM Meeting  WHERE meeting_name LIKE  ${escape(meeting_name)} AND compere_name LIKE ${escape(compere_name)} LIMIT ${escape(from)},${escape(to)};`
        sql2 = `SELECT SQL_CALC_FOUND_ROWS * FROM Meeting  WHERE meeting_name LIKE  ${escape(meeting_name)} AND compere_name LIKE ${escape(compere_name)}  AND start_time BETWEEN   ${escape(start_time)} AND ${escape(end_time)} LIMIT ${escape(from)},${escape(to)};`

        sql3 = `SELECT FOUND_ROWS() as total;`
        if (start_time && end_time) {
            result = await db(sql + sql3);
        } else {
            result = await db(sql2 + sql3);

        }
        return resolve(result)
    })
}
