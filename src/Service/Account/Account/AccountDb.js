import { db, escape } from '../../../DB/DB'
export function GetAccountDb({ id }) {
    return new Promise(async resolve => {
        let result = [];
        let sql = `SELECT a.* ,b.name AS create_user_name FROM Admin AS a LEFT JOIN Admin AS b ON a.create_user_id = b.id WHERE a.id = ${escape(id)}`
        result = await db(sql)
        return resolve(result)
    })
}