
import { escape } from '../DB/DB'
/**
 *   常规条件精准查询 obj 字段名 必须等于 表中的字段名 否则报错
 * @param {string} tableName  数据库 表名
 * @param {objec} obj 要查询的条件对象
 * @returns {Promise} Promise<any>
 */
export function TermsSql(tableName, obj) {
    return new Promise(async resolve => {
        let { str } = new GetLimtStr(tableName);
        let result = await EqualField({ str, obj })
        return resolve(str + result)
    })
}



/**
 *   常规模糊查询 obj 字段名 必须等于 表中的字段名 否则报错
 * @param {string} tableName  数据库 表名
 * @param {objec} obj 要查询的条件对象
 * @returns {Promise} Promise<any>
 */
export function TermsLikeSql(tableName, obj) {
    return new Promise(async resolve => {
        let { str } = new GetLimtStr(tableName)
        let sqls = await LikeField({ obj, str });
        return resolve(str + sqls);
    })
}



/**
 *   生成纯粹Like 模糊查询字段
 * @param {object} obj  要查询的字段对象  字段名必须对应数据库字段名
 * @param {object}   connect  like 语句和现有语句的组合关系  es:  and  or 默认 AND ,
 * @param {object}   str   判断是否需要 添加连接符
 */
export function LikeField({ obj, connect = 'AND', str, alias = false }) {
    return new Promise(resolve => {
        let sqls = "", sqlArr = [];
        Object.keys(obj).forEach(el => {
            if (obj[el]) {
                sqlArr.push(` ${alias ? alias + '.' : ""}${el} LIKE ${escape('%' + obj[el] + '%')}`)
            }
        })

        if (sqlArr.length) {
            if (str.search('WHERE') !== -1 || str.search('where') !== -1) {
                sqls += ` ${connect}  ${sqlArr.join('AND')}`;
            } else {
                sqls += ' WHERE' + sqlArr.join('AND');
            }
        }
        return resolve(sqls)
    })
}



/**
 *   生成纯粹 全等条件查询字段
 * @param {object} obj  要查询的字段对象  字段名必须对应数据库字段名
 * @param {object}   connect  and 语句和现有语句的组合关系  es:  and  or 默认 AND ,
 * @param {object}   str   判断是否需要 添加连接符
 */
export function EqualField({ obj, connect = 'AND', str, alias = false }) {
    return new Promise(resolve => {
        let sqls = "", sqlArr = [];
        Object.keys(obj).forEach(el => {
            if (obj[el]) {
                sqlArr.push(` ${alias ? alias + '.' : ""}${el} = ${escape(obj[el])}`)
            }
        })

        if (sqlArr.length) {
            if (str.search('WHERE') !== -1 || str.search('where') !== -1) {
                sqls += ` ${connect}  ${sqlArr.join('AND')}`;

            } else {
                sqls += ' WHERE' + sqlArr.join('AND');
            }
        }
        return resolve(sqls)
    })
}

/**
 *  生成时间区段 sql
 * @param {*} name 
 * @param {*} param1 
 * @param {Date} param1.start_time
 * @param {Date} param1.end_time
* @returns {Promise} Promise<any>
 */
export function TimeBetween(name, { start_time, end_time }) {
    return new Promise(resolve => {
        let sql = "";
        if (start_time && end_time) {
            sql = ` AND ${name} BETWEEN ${escape(start_time)} AND ${escape(end_time)}`;

        } else {
            sql = ""
        }
        return resolve(sql);
    })
}

/**
 * 生成 分页sql
 * @param { object}  obj
 * @param {umber} obj.from 开始位置
 * @param {number} obj.to  结束位置
 * @returns {Promise} Promise<any>
 * 
 */
export function LimitSql({ from, to }) {
    return new Promise(resolve => {
        let sql = ` LIMIT  ${escape(from)}, ${escape(to)}; SELECT FOUND_ROWS() as total;`

        return resolve(sql)
    })
}


/**
 *  生成插入  sql
 * @param {*} tabelName  表名
 * @param {*} param1 
* @returns {Promise} Promise<any>
*/
export function AddData(tabelName, obj) {
    return new Promise(resolve => {
        let fildes = [], values = [], sql = "";
        Object.keys(obj).forEach(el => {
            if (obj[el]) {
                fildes.push(el);
                values.push(escape(obj[el]))
            }
        })
        sql = `INSERT INTO ${tabelName} (${fildes.join()}) VALUES (${values.join()});`

        return resolve(sql);
    })
}

// export function LeftJoin(tableName1, tableName2, obj) {
//     let str = `SELECT SQL_CALC_FOUND_ROWS a.* , b.* FROM User AS a LEFT JOIN  Organization AS b ON a.organization_id = b.id`

// }

/**
 * 生成分页查询询字符串
 */

class GetLimtStr {
    constructor(tableName) {
        this.str = `SELECT SQL_CALC_FOUND_ROWS * FROM ${tableName}`
    }
}
