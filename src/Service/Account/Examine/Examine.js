import { UpdateExamineDb } from './ExamineDb'
import { db } from '../../../DB/DB';
export async function Examine(ctx) {
    let { query } = await ctx.GetParams(ctx);
    let body = []
    let result = await UpdateExamineDb(query);
    if (result.affectedRows) {
        body = new ctx.ResForm({ data: [] });
    }

    ctx.body = body;
}