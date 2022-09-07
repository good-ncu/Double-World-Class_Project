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
        discipline_eval_turn: joi.number().integer().less(7).greater(3).required().error(new Error('学科评估轮次填报错误！')),
        discipline_eval_result: joi.string()
       .when('discipline_eval_turn',{is:4,then:joi.string().valid("A+","A","A-","B+","B","B-","C+","C","C-","无")})
       .when('discipline_eval_turn',{is:5,then:joi.string().valid("A+","A","A-","B+","B","B-","C+","C","C-","无")})
       .when('discipline_eval_turn',{is:6,then:joi.string().valid("A+","A","A-","B+","B","B-","C+","C","C-","无")})
       .error(new Error('学科评估填写错误！'))
    })
)

const data_1_1_3 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().greater(2000).less(2029).required().error(new Error('年度填报错误！')),
        rank_type:joi.string().min(1).required().error(new Error('排名类别填报错误！')),
        rank:joi.string().pattern(/^(\d+\.?\d{0,3}%)|([1-9]\d*)-([1-9]\d*)|([1-9]\d*)$/).required().error(new Error('排名填报错误！')),
        // 至多两位小数百分比：\d+\.?\d{0,2}%
        // 数字-数字：([1-9]\d*)-([1-9]\d*)
    })
)

const data_1_1_4 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('年度填报错误！')),
        total_fund:joi.number().min(0).required().error(new Error('建设总经费填报错误！')),
        ctr_budg_fund:joi.number().min(0).required().error(new Error('中央专项预算经费填报错误！')),
        ctr_receive_fund:joi.number().min(0).required().error(new Error('中央专项实际到账填报错误！')),  
        ctr_expend_fund:joi.number().min(0).required().error(new Error('中央专项实际支出填报错误！')),
        lcl_budg_fund:joi.number().min(0).required().error(new Error('地方专项预算经费填报错误！')),
        lcl_receive_fund:joi.number().min(0).required().error(new Error('地方专项实际到账填报错误！')),
        lcl_expend_fund:joi.number().min(0).required().error(new Error('地方专项实际支出填报错误！')),
        self_budg_fund:joi.number().min(0).required().error(new Error('学科自筹预算经费填报错误！')),
        self_receive_fund:joi.number().min(0).required().error(new Error('学科自筹实际到账填报错误！')),
        self_expend_fund:joi.number().min(0).required().error(new Error('学科自筹实际支出填报错误！')),
        other_budg_fund:joi.number().min(0).required().error(new Error('其他预算经费填报错误！')),
        other_receive_fund:joi.number().min(0).required().error(new Error('其他实际到账填报错误！')),
        other_expend_fund:joi.number().min(0).required().error(new Error('其他实际支出填报错误！')),
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