const joi = require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

const data = joi.array().items(
    joi.object().keys({
        discipline_eval_turn: joi.number().integer().less(5).greater(3).error(new Error('学科评估轮次格式错误')),
        discipline_eval_result: joi.string().pattern(/A\+|A|A\-|B\+|B|B\-|C\+|C|C\-|NULL/).error(new Error('学科评估结果格式错误'))
    })
)
// const discipline_eval_turn = joi.string().pattern(/[4]/)
// const discipline_eval_result = joi.string().pattern(/A\+|A|A\-|B\+|B|B\-|C\+|C|C\-|NULL/)


exports.table_1_1_2 = {
    body: {
        data
    }
}
