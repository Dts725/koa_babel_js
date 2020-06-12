/**
 *  获取分页数据  page page_size 的计算结果
 * @param {*} query  请求中携带的 参数
 * @returns {Promise} Promise<any>
 */
export function GetPageFromTo(query) {
    return new Promise(resolve => {
        let page, page_size;
        page = query?.page || 1;
        page_size = query?.page_size || 15;
        let pam = {
            from: (page - 1) * page_size,
            to: page * page_size,
        }
        pam = Object.assign({}, pam, query)
        return resolve({ pam, page, page_size })
    })

}