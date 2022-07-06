const joi = require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

const data_1_1_2 = joi.array().items(
    joi.object().keys({
        discipline_eval_turn: joi.number().integer().less(7).greater(3).required().error(new Error('学科评估轮次格式错误')),
        discipline_eval_result: joi.string().valid("A+","A","A-","B+","B","B-","C+","C","C-","Unknown").error(new Error('学科评估结果格式错误')),
    })
)

const data_1_1_3 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().greater(2000).less(2023).required().error(new Error('年度填报错误！')),
        rank_type:joi.string().min(1).required().error(new Error('排名类别填报错误！')),
        rank:joi.number().integer().greater(1).less(10000).required().error(new Error('排名填报错误！')),
    })
)

const data_1_1_4 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('年度填报错误！')),
        total_fund:joi.number().min(0).allow('').error(new Error('建设总经费填报错误！')),
        ctr_budg_fund:joi.number().min(0).allow('').error(new Error('中央专项预算经费！')),
        ctr_receive_fund:joi.number().min(0).allow('').error(new Error('中央专项实际到账！')),
        ctr_expend_fund:joi.number().min(0).allow('').error(new Error('中央专项实际支出！')),
        lcl_budg_fund:joi.number().min(0).allow('').error(new Error('地方专项预算经费！')),
        lcl_receive_fund:joi.number().min(0).allow('').error(new Error('地方专项实际到账！')),
        lcl_expend_fund:joi.number().min(0).allow('').error(new Error('地方专项实际支出！')),
        self_budg_fund:joi.number().min(0).allow('').error(new Error('学科自筹预算经费！')),
        self_receive_fund:joi.number().min(0).allow('').error(new Error('学科自筹实际到账！')),
        self_expend_fund:joi.number().min(0).allow('').error(new Error('学科自筹实际支出！')),
        other_budg_fund:joi.number().min(0).allow('').error(new Error('其他预算经费！')),
        other_receive_fund:joi.number().min(0).allow('').error(new Error('其他实际到账！')),
        other_expend_fund:joi.number().min(0).allow('').error(new Error('其他实际支出！')),
    })
)


exports.table_1_1_2 = {
    body: {
        data_1_1_2
    },
}

exports.table_1_1_3 = {
    body: {
        data_1_1_3
    },
}

exports.table_1_1_4 = {
    body: {
        data_1_1_4
    },
}