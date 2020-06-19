import { UpdateExamineDb } from './ExamineDb'
import { db } from '../../../DB/DB';
export async function Examine(ctx) {
    let { query } = await ctx.GetParams(ctx);

    // return ctx.body = query
    let body = []
    let result = await UpdateExamineDb(query);
    if (result.affectedRows) {
        body = new ctx.ResForm({ data: [] });
    } else {
        body = result
    }

    ctx.body = body;
}