import { db, escape } from "../../../DB/DB"
export let GetOrganizationDb = () => {
    return new Promise(async resolve => {
        let sql, result;
        sql = `SELECT * FROM Organization `;
        result = await db(sql);
        return resolve(result);
    })
}
export let GetOrganizationDbPam = (pam) => {
    return new Promise(async resolve => {
        let sql, result;
        sql = `SELECT * FROM Organization WHERE Organization.id in (${pam})`;
        result = await db(sql);
        return resolve(result);
    })
}