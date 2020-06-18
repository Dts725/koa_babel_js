import { db, escape } from '../../../DB/DB'
export function UpdateDb({ id }) {
    return new Promise(async resolve => {
        let sql = `SELECT status FROM User WHERE id = ${escape(id)}`;
        let status = await db(sql);
        let sql1 = `UPDATE User SET  status = ${escape(status[0]?.status == 1 ? 2 : 1)} WHERE id = ${escape(id)}`;
        let result = await db(sql1);
        return resolve(result);
    })
}