import { db, escape } from "../../../DB/DB"
import { AddData } from '../../../Utils/TermsSql'
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
// 包含增删改
export function EditDb({ del, edit, insert }) {
    return new Promise(async resolve => {


        try {

            if (del.length) {
                let sql = `DELETE FROM Organization WHERE id IN ${escape('(' + del.join() + ')')}`;
                db(sql);
            }
            if (edit.length) {
                let sql = edit.map(el => {
                    return `UPDATE Organization SET organization_name = ${el.organization_name}  WHERE id = ${escape(el.id)}`
                });
                // 批量更新
                db(sql.join());
            }
            if (insert.length) {
                let sql = await Promise.all(insert.map(async el => {
                    return AddData('Organization', { pid: el.pid, organization_name: el.organization_name })
                }));
                console.log('批量插入', sql)
                // 批量插入
                db(sql.join());
            }

            return resolve([])
        } catch (error) {
            return resolve(error)
        }
    })

}