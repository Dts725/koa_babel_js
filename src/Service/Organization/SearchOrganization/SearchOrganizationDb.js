import { db, escape } from '../../../DB/DB'
import { LikeField, EqualField } from '../../../Utils/TermsSql'
export function queryDb({ organization_name = "", pid = "" }) {
    return new Promise(async resolve => {
        let sql = `SELECT * FROM Organization`;
        sql += `${await LikeField({ obj: { organization_name }, str: sql })}`;
        sql += `${await EqualField({ obj: { pid }, str: sql })}`;

        let result = await db(sql);
        return resolve(result)
    })
}