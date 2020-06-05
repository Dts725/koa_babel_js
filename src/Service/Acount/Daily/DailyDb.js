import { db, escape } from '../../../DB/DB'
export function FindDaily({ admin_id, functions, operate, from, to, start_time, end_time }) {
    return new Promise(async resolve => {
        try {
            let sql, sql2, sql3, result;
            sql = `SELECT SQL_CALC_FOUND_ROWS * FROM Daily  WHERE admin_id =  ${escape(admin_id)} AND function = ${escape(functions)} AND operate = ${operate} LIMIT   ${escape(from)},${escape(to)};`
            sql2 = `SELECT SQL_CALC_FOUND_ROWS * FROM Daily  WHERE admin_id =  ${escape(admin_id)} AND function = ${escape(functions)}  AND operate = ${operate}  AND date_time BETWEEN   ${escape(start_time)} AND ${escape(end_time)} LIMIT ${escape(from)},${escape(to)};`
            sql3 = `SELECT FOUND_ROWS() as total;`
            if (start_time && end_time) {
                result = await db(sql + sql3);
            } else {
                result = await db(sql2 + sql3);

            }
            return resolve(result)
        } catch (error) {
            return resolve(error)
        }

    })
}
export function FindId(account) {
    return new Promise(async resolve => {
        let sql, result;
        sql = `SELECT id FROM Admin WHERE account = ${escape(account)}`;
        result = await db(sql);
        return resolve(result);
    })
} 