/** 获取请求接口返回值
 * @returns {Promise | Object}   { path, query: { ...query }, method, url }
 * 
 */
export const GetParams = (ctx) => {
    return new Promise((resolve, reject) => {
        try {
            let path = ctx.request.path;
            let query = ctx.query;
            let method = ctx.method.toLowerCase();
            let url = ctx.url;
            if (method !== "get") {
                query = ctx.request.body
            }
            // return resolve(ctx.params)
            // 处理 /:id 类型参数
            if (ctx.params) {
                query = Object.assign(query, ctx.params)
            }
            let pam = { path, query: { ...query }, method, url }
            return resolve(pam)
        } catch (error) {
            console.error(error)
            return resolve(error)
        }

    })
}