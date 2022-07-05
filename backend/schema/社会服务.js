
const data_5_1_1 = joi.array().items(
    joi.object().keys({
        year:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
        quarter:joi.number().integer().max(4).min(1).required().error(new Error('填报季度填报错误！')),
        achv_to_univfund:joi.number().min(0).allow('').error(new Error('成果转换到校资金总额填报错误！')),
    }
    )
)

const data_5_2_1_1 = joi.array().items(
    joi.object().keys({
        year:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
        plat_name:joi.string().min(1).max(100).required().error(new Error('平台名称填报错误！')),
        palt_level:joi.string().valid('国家级','省级').required().error(new Error(new Error('平台等级填报错误！'))),
        appro_time:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('批准时间填写错误！')),
        
    }
    )
)

const data_5_2_1_2 = joi.array().items(
    joi.object().keys({
        year:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
        plat_name:joi.string().min(1).max(100).required().error(new Error('平台名称填报错误！')),
        palt_level:joi.string().valid('国家级','省级').required().error(new Error(new Error('平台等级填报错误！'))),
        appro_time:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('批准时间填写错误！')),
        
    }
    )
)

const data_5_2_2_1 = joi.array().items(
    joi.object().keys({
        year:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
        level:joi.string().valid('国家级','省级').required().error(new Error(new Error('层次填报错误！'))),
        topic:joi.string().min(1).max(100).required().error(new Error('主题填报错误！')),
        adopt_leader:joi.string().min(1).max(13).required().error(new Error('批示领导填报错误！')),
        adopt_sit:joi.string().valid('已采纳','未采纳').required().error(new Error(new Error('采纳情况错误！'))),
        adopt_date:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('批示/采纳时间填写错误！')),
        
    }
    )
)

const data_5_2_2_2 = joi.array().items(
    joi.object().keys({
        year:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
        level:joi.string().valid('国家级','省级').required().error(new Error(new Error('层次填报错误！'))),
        topic:joi.string().min(1).max(100).required().error(new Error('主题填报错误！')),
        adopt_leader:joi.string().min(1).max(13).required().error(new Error('批示领导填报错误！')),
        adopt_sit:joi.string().valid('已采纳','未采纳').required().error(new Error(new Error('采纳情况错误！'))),
        adopt_date:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('批示/采纳时间填写错误！')),
        
    }
    )
)



exports.table_5_1_1 = {
    body: {
        data_5_1_1
        }
}
exports.table_5_2_1_1 = {
    body: {
        data_5_2_1_1
        }
}
exports.table_5_2_1_2 = {
    body: {
        data_5_2_1_2
        }
}
exports.table_5_2_2_1 = {
    body: {
        data_5_2_2_1
        }
}
exports.table_5_2_2_2 = {
    body: {
        data_5_2_2_2
        }
}