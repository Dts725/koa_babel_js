import { escape, db } from "../../../DB/DB"
export let SqlChild = ({ id }) => {
    return new Promise(async resolve => {
        // SELECT * FROM Organization WHERE pid = 9 OR id = 9
        let sql = `SELECT id FROM Organization WHERE pid = ${escape(id)} OR id = ${escape(id)} `
        let result = await db(sql)
        return resolve(result);
    })
}