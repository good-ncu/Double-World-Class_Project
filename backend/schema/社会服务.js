const joi = require('joi')
//achv_to_univfund 
const data_5_1_1 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2023).greater(2020).required().error(new Error('年度填报错误！')),
        quarter:joi.string().valid('第一季度','第二季度','第三季度','第四季度').required().error(new Error('季度填报错误！')),
        achv_to_univfund:joi.number().min(0).required().error(new Error('成果转换到校资金总额填报错误！')),
    }
    )
)


//prodedu_plat 
const data_5_2_1_1 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2023).greater(2020).required().error(new Error('填报年度填报错误！')),
        plat_name:joi.string().min(1).max(100).required().error(new Error('平台名称填报错误！')),
        plat_level:joi.string().valid('国家级').required().error(new Error('平台级别填报错误！')),
        appro_date:joi.string().pattern(/^(2[0][2][1-2])-(0[1-9]|1[0-2])$/).required().error(new Error('批准时间填写错误！')),
    }
    )
)
//plat_name:joi.string().valid('国家级协同创新研究院','产业技术研究院','高端智库').required().error(new Error('平台名称填报错误！')),
//prodedu_plat 
const data_5_2_1_2 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2023).greater(2020).required().error(new Error('填报年度填报错误！')),
        plat_name:joi.string().min(1).max(100).required().error(new Error('平台名称填报错误！')),
        plat_level:joi.string().valid('省部级').required().error(new Error('平台等级填报错误！')),
        appro_date:joi.string().pattern(/^(2[0][2][1-2])-(0[1-9]|1[0-2])$/).required().error(new Error('批准时间填写错误！')),
        
    }
    )
)

//consult_policy
const data_5_2_2_1 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2023).greater(2020).required().error(new Error('年度填报错误！')),
        topic:joi.string().min(1).max(100).required().error(new Error('研究报告/政策咨询主题填报错误！')),
        adopt_leader:joi.string().min(1).max(13).required().error(new Error('批示领导填报错误！')),
        adopt_sit:joi.string().valid('已采纳','未采纳').required().error(new Error('采纳情况错误！')),
        adopt_date:joi.string().when('adopt_sit',{is:'未采纳',then:joi.string().valid('')})
        .when('adopt_sit',{is:'已采纳',then:joi.string().pattern(/^(2[0][2][1-2])-(0[1-9]|1[0-2])$/)})
        .error(new Error('层次填报错误！')),
        
        level:joi.string().valid('国家级','省部级').error(new Error('层次填报错误！')),
        
    }
    )
)
 
//consult_policy               
const data_5_2_2_2 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2023).greater(2020).required().error(new Error('填报年度填报错误！')),
        topic:joi.string().min(1).max(100).required().error(new Error('主题填报错误！')),
        adopt_leader:joi.string().min(1).max(50).required().error(new Error('批示领导填报错误！')),
        adopt_sit:joi.string().valid('已采纳','未采纳').required().error(new Error('采纳情况错误！')),
        adopt_date:joi.string().when('adopt_sit',{is:'未采纳',then:joi.string().valid('')})
        .when('adopt_sit',{is:'已采纳',then:joi.string().pattern(/^(2[0][2][1-2])-(0[1-9]|1[0-2])$/)})
        .error(new Error('层次填报错误！')),
        
        level:joi.string().valid('国家级','省部级').error(new Error('层次填报错误！')),
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