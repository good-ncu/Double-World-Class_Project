const joi = require('joi')
 const data_3_1_1 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        recogn_honor:joi.string().min(1).max(100).required().error(new Error('表彰荣誉/项目填报错误！')),
        yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！'))
    }
    )
)

const data_3_2_1 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        tch_type:joi.string().min(1).max(100).required().error(new Error('人员性质填报错误！')),
        birthday:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).error(new Error('出生日期填写错误！')),
        tch_title:joi.string().valid('助教','讲师','副教授','教授').required().error(new Error(new Error('职称填报错误！'))),
        rep_work:joi.string().min(1).max(300).required().error(new Error('代表性学术成果（限3项）填报错误！')),
        discipline:joi.string().min(1).max(50).required().error(new Error('学科方向填报错误！')),
    }
    )
)

const data_3_2_2_0 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        team_name:joi.string().min(1).max(100).required().error(new Error('团队名称填报错误！')),
        level:joi.string().valid('国家级','省级').required().error(new Error(new Error('层次填报错误！'))),
        honor_name:joi.string().min(1).max(100).required().error(new Error('荣誉称号填报错误！')),
        yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('获批年度填报错误！'))
    }
    )
)

const data_3_2_2_1 = joi.array().items(
   joi.object().keys({
       tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
       team_name:joi.string().min(1).max(100).required().error(new Error('团队名称填报错误！')),
       level:joi.string().valid('国家级','省级').required().error(new Error(new Error('层次填报错误！'))),
       honor_name:joi.string().min(1).max(100).required().error(new Error('荣誉称号填报错误！')),
       yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('获批年度填报错误！'))
   }
   )
)

const data_3_2_2_2 = joi.array().items(
   joi.object().keys({
       tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
       team_name:joi.string().min(1).max(100).required().error(new Error('团队名称填报错误！')),
       level:joi.string().valid('国家级','省级').required().error(new Error(new Error('层次填报错误！'))),
       honor_name:joi.string().min(1).max(100).required().error(new Error('荣誉称号填报错误！')),
       yr:joi.number().integer().less(2023).greater(1950).required().error(new Error('获批年度填报错误！'))
   }
   )
)


const data_3_2_3 = joi.array().items(
    joi.object().keys({
        year:joi.number().integer().less(2025).greater(1950).required().error(new Error('获批年度填报错误！')),
        full_tch_num:joi.number().integer().required().error(new Error('专任教师总数填报错误！')),
        ageblow25:joi.number().integer().required().error(new Error('25岁以下数量填报错误！')),
        age2535:joi.number().integer().required().error(new Error('25-35岁数量填报错误！')),
        age3645:joi.number().integer().required().error(new Error('36-45岁数量填报错误！')),
        age4660:joi.number().integer().required().error(new Error('46-60岁数量填报错误！')),
        ageup60:joi.number().integer().required().error(new Error('60岁以上数量填报错误！')),
        senior:joi.number().integer().required().error(new Error('正高级数量填报错误！')),
        sub_senior:joi.number().integer().required().error(new Error('副高级数量填报错误！')),
        mid_grade:joi.number().integer().required().error(new Error('中级数量填报错误！')),
        other_grade:joi.number().integer().required().error(new Error('其他职称数量填报错误！')),
        phd:joi.number().integer().required().error(new Error('博士数量填报错误！')),
        m_degree:joi.number().integer().required().error(new Error('硕士数量填报错误！')),
        b_degree:joi.number().integer().required().error(new Error('其他学历数量填报错误！')),
    }
    )
)

const data_3_2_4 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
        postdoc_or_ra:joi.string().valid('博士后','科研助理').required().error(new Error(new Error('博士后/科研助理填报错误！'))),
        new_inc:joi.number().integer().required().error(new Error('今年新增填报错误！')),
    }
    )
)

const data_3_2_5 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
        full_ftch_type:joi.string().min(1).max(20).required().error(new Error('外籍专任教师类型填报错误！')),
        full_ftch_num:joi.number().min(0).integer().required().error(new Error('数量填报错误！')),
        high_prof_title:joi.number().min(0).integer().required().error(new Error('正高级职称数量填报错误！')),
    }
    )
)

const data_3_3_1 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        jour_name:joi.string().min(1).max(100).required().error(new Error('期刊名称填报错误！')),
        in_jour_code:joi.number().integer().min(1).required().error(new Error('国内期刊编号填报错误！')),
        out_jour_code:joi.number().integer().min(1).required().error(new Error('国外期刊编号填报错误！')),
        jour_collec:joi.string().min(1).max(50).required().error(new Error('期刊收录情况填报错误！')),
        pos:joi.string().min(1).max(50).required().error(new Error('担任职务填报错误！')),
        tenure:joi.string().pattern(/^[0-9]{4}-[0-9]{4}$/).required().error(new Error('任职期限填报错误！')),                   //
    }
    )
)

const data_3_3_2 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
        
        ac_org:joi.string().min(1).max(100).required().error(new Error('学术组织名称填报错误！')),
        pos:joi.string().min(1).max(50).required().error(new Error('担任职务填报错误！')),
        tenure:joi.string().pattern(/^[0-9]{4}-[0-9]{4}$/).required().error(new Error('任职期限填报错误！')),                   //
    }
    )
)

const data_3_3_3 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
        conf_name:joi.string().min(1).max(100).required().error(new Error('会议名称填报错误！')),
        rpt_name:joi.string().min(1).max(100).required().error(new Error('报告题目填报错误！')),
        rpt_time:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('报告年月填写错误！')),
        rpt_place:joi.string().min(1).max(100).required().error(new Error('报告地点填报错误！')), 
    }
    )
)

const data_3_3_4 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        comp_name:joi.string().min(1).max(100).required().error(new Error('比赛名称填报错误！')),
        comp_yr_mth:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('比赛年月填写错误！')),
        pos:joi.string().min(1).max(50).required().error(new Error('担任职务填报错误！')),
    }
    )
)



exports.table_3_1_1 = {
    body: {
        data_3_1_1
        }
}
exports.table_3_2_1 = {
    body: {
        data_3_2_1
        }
}
exports.table_3_2_2_0 = {
    body: {
        data_3_2_2_0
        }
}
exports.table_3_2_2_1 = {
    body: {
        data_3_2_2_1
        }
}
exports.table_3_2_2_2 = {
    body: {
        data_3_2_2_2
        }
}
exports.table_3_2_3 = {
    body: {
        data_3_2_3
        }
}
exports.table_3_2_4 = {
    body: {
        data_3_2_4
        }
}
exports.table_3_2_5 = {
    body: {
        data_3_2_5
        }
}
exports.table_3_3_1 = {
    body: {
        data_3_3_1
        }
}
exports.table_3_3_2 = {
    body: {
        data_3_3_2
        }
}
exports.table_3_3_3 = {
    body: {
        data_3_3_3
        }
}
exports.table_3_3_4 = {
    body: {
        data_3_3_4
        }
}