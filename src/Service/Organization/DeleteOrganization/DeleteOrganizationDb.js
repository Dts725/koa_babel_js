import { db, escape } from '../../../DB/DB'
export function IshaveDb({ id }) {
    return new Promise(async resolve => {
        let sql = `SELECT  count(id) FROM  User WHERE organization_id = ${escape(id)}`
        let result = await db(sql)
        return resolve(result)
    })
}
export function DeleteDb({ id }) {
    return new Promise(async resolve => {
        let sql = `DELETE   FROM  Organization WHERE id = ${escape(id)}`
        let result = await db(sql)
        return resolve(result)
    })
}