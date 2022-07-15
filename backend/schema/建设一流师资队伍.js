const joi = require('joi')
//tch_moral_const 

 const data_3_1_1 = joi.array().items(
    joi.object().keys({
        recogn_honor:joi.string().min(1).max(200).required().error(new Error('荣誉表彰/项目类型填报错误！')),       //因为太多了，客户自己填写
        tch_name:joi.string().min(1).max(300).required().error(new Error('获得者姓名填报错误！')),
        yr:joi.number().integer().less(2029).greater(2020).required().error(new Error('获得年度填报错误！'))
    }
    )
)
//acleader_youthcore 
const data_3_2_1 = joi.array().items(
    joi.object().keys({
        discipline:joi.string().min(1).max(50).required().error(new Error('学科方向填报错误！')),
        tch_type:joi.string().valid('中青年学术骨干','学科带头人').required().error(new Error('人员性质填报错误！')),
        tch_name:joi.string().min(1).max(300).required().error(new Error('姓名填报错误！')),
        age:joi.number().integer().min(1).max(150).required().error(new Error('年龄填写错误！')),
        tch_title:joi.string().valid('其他正高级',"其他副高级","其他中级","其他",'讲师','副教授','教授').required().error(new Error(new Error('职称填报错误！'))),
        rep_work:joi.string().min(1).max(300).required().error(new Error('代表性学术成果（限3项）填报错误！')),
        
    }
    )
)





//highlevel_talent_team 
const data_3_2_2_0 = joi.array().items(
    joi.object().keys({
        talent_team_name:joi.string().min(1).max(100).required().error(new Error('团队/人才姓名填报错误！')),
        level:joi.string().valid('国家级','省级').required().error(new Error(new Error('层次填报错误！'))),
        honor_name:joi.string().min(1).max(300).required().error(new Error('荣誉称号填报错误！')),
        yr:joi.number().integer().less(2021).greater(1900).required().error(new Error('获批年度填报错误！')),
        
        tch_name:joi.string().min(1).max(100).error(new Error('教师姓名填报错误！')),
    }
    )
)

//highlevel_talent_team 
const data_3_2_2_1 = joi.array().items(
   joi.object().keys({
       talent_team_name:joi.string().min(1).max(100).required().error(new Error('团队/人才名称填报错误！')),
       honor_name:joi.string().min(1).max(300).required().error(new Error('荣誉称号填报错误！')),
       yr:joi.number().integer().less(2029).greater(2020).required().error(new Error('获批年度填报错误！')),
       
       level:joi.string().valid('国家级').error(new Error('层次填报错误！')),
       tch_name:joi.string().min(1).max(100).error(new Error('教师姓名填报错误！')),
    }
   )
)

//highlevel_talent_team 
const data_3_2_2_2 = joi.array().items(
   joi.object().keys({
       talent_team_name:joi.string().min(1).max(100).required().error(new Error('团队名称填报错误！')),
       honor_name:joi.string().min(1).max(300).required().error(new Error('荣誉称号填报错误！')),
       yr:joi.number().integer().less(2029).greater(2020).required().error(new Error('获批年度填报错误！')),

       tch_name:joi.string().min(1).max(100).error(new Error('教师姓名填报错误！')),
       level:joi.string().valid('省级').error(new Error(new Error('层次填报错误！'))),
   }
   )
)



//numstru_fulltch 
const data_3_2_3 = joi.array().items(
    joi.object().keys({
        yr:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(1[9][5-9][0-9]|2[0][0-2][0-9])$/).required().error(new Error('学年度填报错误！')),
        full_tch_num:joi.number().integer().min(0).required().error(new Error('专任教师总数填报错误！')),
        ageblow25:joi.number().integer().min(0).required().error(new Error('25岁以下数量填报错误！')),
        age2535:joi.number().integer().min(0).required().error(new Error('25-35岁数量填报错误！')),
        age3645:joi.number().integer().min(0).required().error(new Error('36-45岁数量填报错误！')),
        age4660:joi.number().integer().min(0).required().error(new Error('46-60岁数量填报错误！')),
        ageup60:joi.number().integer().min(0).required().error(new Error('60岁以上数量填报错误！')),
        senior:joi.number().integer().min(0).required().error(new Error('正高级数量填报错误！')),
        sub_senior:joi.number().integer().min(0).required().error(new Error('副高级数量填报错误！')),
        mid_grade:joi.number().integer().min(0).required().error(new Error('中级数量填报错误！')),
        other_grade:joi.number().integer().min(0).required().error(new Error('其他职称数量填报错误！')),
        phd:joi.number().integer().required().min(0).error(new Error('博士数量填报错误！')),
        m_degree:joi.number().integer().required().min(0).error(new Error('硕士数量填报错误！')),
        b_degree:joi.number().integer().required().min(0).error(new Error('其他学历数量填报错误！')),
    }
    )
)

//pdoc_ra 
const data_3_2_4 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(2020).required().error(new Error('年度填报错误！')),
        in_postdoc_sum:joi.number().integer().min(0).required().error(new Error('国内毕业博士后总数填报错误！')),
        in_postdoc_newinc:joi.number().integer().min(0).required().error(new Error('国内毕业博士后当年新增填报错误！')),
        out_postdoc_sum:joi.number().integer().min(0).required().error(new Error('境外毕业博士后总数填报错误！')),
        out_postdoc_newinc:joi.number().integer().min(0).required().error(new Error('境外毕业博士后当年新增填报错误！')),
        univ_ra_sum:joi.number().integer().min(0).required().error(new Error('校聘科研助理人数总数填报错误！')),
        univ_ra_newinc:joi.number().integer().min(0).required().error(new Error('校聘科研助理人数当年新增填报错误！')),
        inst_ra_sum:joi.number().integer().min(0).required().error(new Error('院聘科研助理人数总数填报错误！')),
        inst_ra_newinc:joi.number().integer().min(0).required().error(new Error('院聘科研助理人数当年新增填报错误！')),
        task_ra_sum:joi.number().integer().min(0).required().error(new Error('课题聘科研助理人数总数填报错误！')),
        task_ra_newinc:joi.number().integer().min(0).required().error(new Error('课题聘科研助理人数当年新增填报错误！')),
    }
    )
)

//numstru_for_fulltch 
const data_3_2_5 = joi.array().items(
    joi.object().keys({
        yr:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(1[9][5-9][0-9]|2[0][0-2][0-9])$/).required().error(new Error('学年度填报错误！')),
        sum_full_ftch:joi.number().integer().min(0).required().error(new Error('数量(总数)填报错误！')),
        sum_high_title:joi.number().integer().min(0).required().error(new Error('正高级职称数量(总数)填报错误！')),
        lang_full_ftch:joi.number().integer().min(0).required().error(new Error('数量(语言类外籍专任教师数)填报错误！')),
        lang_high_title:joi.number().integer().min(0).required().error(new Error('正高级职称数量(语言类外籍专任教师)填报错误！')),
        prof_full_ftch:joi.number().integer().min(0).required().error(new Error('数量(专业类外籍专任教师)填报错误！')),
        prof_high_title:joi.number().integer().min(0).required().error(new Error('正高级职称数量(专业类外籍专任教师)填报错误！')),
    }
    )
)

//tch_ashead_imptjour 
const data_3_3_1 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(100).required().error(new Error('教师姓名填报错误！')),
        jour_name:joi.string().min(1).max(100).required().error(new Error('任职期刊名称填报错误！')),
        in_jour_code:joi.string().min(1).allow('').error(new Error('国内期刊编号填报错误！')),//改
        out_jour_code:joi.string().min(1).allow('').required().error(new Error('国际期刊编号填报错误！')),
        jour_collec:joi.string().valid('CSSCI','CSCD','SCI','SSCI','EI','A&HCI','其他').required().error(new Error('期刊收录情况填报错误！')),
        pos:joi.string().valid('主编','副主编','编委').required().error(new Error('担任职务填报错误！')),
        tenure:joi.string().pattern(/^((1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2]))至((1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2]))$/).required().error(new Error('任职期限填报错误！')),                   
        // tenure:joi.string().min(1).max(100).error(new Error('担任职务填报错误！')),
    }
    )
)

//tch_ashead_imptacorg 
const data_3_3_2 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(100).required().error(new Error('教师姓名填报错误！')),
        ac_org:joi.string().min(1).max(100).required().error(new Error('学术组织名称填报错误！')),
        pos:joi.string().valid('会长','副会长','理事会','副理事会','秘书长','副秘书长').required().error(new Error('担任职务填报错误！')),
        tenure:joi.string().pattern(/^((1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2]))至((1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2]))$/).required().error(new Error('任职期限填报错误！')),   

        // yr:joi.number().integer().less(2029).greater(2020).error(new Error('填报年度填报错误！')),
    }
    )
)

//tch_attdrpt_imptacconf 
const data_3_3_3 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(2020).required().error(new Error('年度填报错误！')),
        tch_name:joi.string().min(1).max(50).required().error(new Error('教师姓名填报错误！')),
        conf_name:joi.string().min(1).max(200).required().error(new Error('会议名称填报错误！')),
        rpt_title:joi.string().min(1).max(200).required().error(new Error('报告题目填报错误！')),
        rpt_yr_mth:joi.string().pattern(/^(2[0][2][1-9])-(0[1-9]|1[0-2])$/).required().error(new Error('报告年月填写错误！')),
        rpt_place:joi.string().min(1).max(100).required().error(new Error('报告地点填报错误！')), 
    }
    )
)



//tch_asjudge_intnacomp 
const data_3_3_4 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(50).required().error(new Error('教师姓名填报错误！')),
        comp_name:joi.string().min(1).max(100).required().error(new Error('比赛名称填报错误！')),
        comp_yr_mth:joi.string().pattern(/^(2[0][2][1-9])-(0[1-9]|1[0-2])$/).required().error(new Error('比赛年月填写错误！')),
        pos:joi.string().valid('裁判','评委').required().error(new Error('担任职务填报错误！')),
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