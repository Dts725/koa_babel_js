import { MenuSql } from "./MenuDb"
import { GenerateOptions } from '../../../Utils/JsonTree'
export let Menu = async (ctx) => {
    let result, body;
    result = await MenuSql();
    result = await GenerateOptions(result, {}, 'children');
    result = {
        all_menu_ids: result
    }
    if (result.all_menu_ids.length) {

        body = new ctx.ResForm({ data: result })

    } else {
        body = new ctx.ResForm({ data: result, status: "暂无菜单", code: '201' })
    }
    ctx.body = body;
}
