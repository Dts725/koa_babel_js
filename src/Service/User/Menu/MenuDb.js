import { db } from "../../../DB/DB"
export let MenuSql = () => {
    return new Promise(async resolve => {
        let sql = `SELECT * FROM menu`
        let result = await db(sql);
        return resolve(result)
    })
}