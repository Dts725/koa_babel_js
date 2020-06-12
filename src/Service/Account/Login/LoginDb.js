import { escape, db } from "../../../DB/DB"
export let SqlAdmin = ({ account }) => {
    return new Promise(async resolve => {
        let sql = `SELECT * FROM Admin WHERE account = ${escape(account)}`
        let result = await db(sql);
        return resolve(result)
    })

}
export let SqlRole = ({ role_id }) => {
    return new Promise(async resolve => {
        let sql = `SELECT * FROM role WHERE id = ${escape(role_id)}`
        let result = await db(sql);
        return resolve(result[0]);
    })

}
