

/**
 *  递归 生成 级联数据  接送tree
 * @param {*} params  json 远数据
 * @param {*} obj   要添加的 额外参数
 * @param {*} key  要添加的字段名
 */
export function GenerateOptions(params, obj, key) {//生成Cascader级联数据
    return new Promise(resolve => {
        var result = [];

        params.map(el => {
            if (getTop(el, params)) {
                // if (el.pid === 0) {
                let tmp = getchilds(el.id, params, obj);

                el = Object.assign({}, el, obj)
                if (tmp.length) {
                    el[key] = tmp
                }
                result.push(el);
            }
        })
        return resolve(result);
    })

}
function getchilds(id, array, obj, key) {
    let childs = new Array();
    for (let arr of array) {//循环获取子节点
        if (arr.pid == id) {
            arr = Object.assign({}, arr, obj)
            childs.push(arr);

        }
    }
    for (let child of childs) {//获取子节点的子节点
        let childscopy = getchilds(child.id, array, obj, key);//递归获取子节点
        if (childscopy.length > 0) {
            child[key] = childscopy;

        }
    }
    return childs;
}
// 获取顶层元素
function getTop(el, data) {
    if (data.filter(d => d.id === el.pid).length) {
        return false
    } else {
        return true
    }
}