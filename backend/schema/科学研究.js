const joi = require('joi')
//tch_award 
 const data_4_1_1_0 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        award_name:joi.string().min(1).max(100).required().error(new Error('奖项名称填报错误！')),
        // 奖项等级
        grade:joi.string().valid('国家特等奖','国家一等奖','国家二等奖','一等奖','二等奖','三等奖').required().error(new Error('奖项等级填报错误！')),
        award_eval_org:joi.string().min(1).max(50).required().error(new Error('评奖组织单位填报错误！')),
        award_eval_org_type:joi.string().min(1).max(50).required().error(new Error('组织单位类型填报错误！')),
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('获奖年份填报错误！')),
        level:joi.string().valid('国家级','省部级').required().error(new Error(new Error('层次填报错误！'))),
    }
    )
)

//tch_award 
const data_4_1_1_1 = joi.array().items(
   joi.object().keys({
       tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
       award_name:joi.string().min(1).max(100).required().error(new Error('奖项名称填报错误！')),
       grade:joi.string().valid('国家特等奖','国家一等奖','国家二等奖','一等奖','二等奖','三等奖').required().error(new Error('奖项等级填报错误！')),
       award_eval_org:joi.string().min(1).max(50).required().error(new Error('评奖组织单位填报错误！')),
       award_eval_org_type:joi.string().min(1).max(50).required().error(new Error('评奖组织单位类型填报错误！')),
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('获奖年份填报错误！')),

       pos:joi.string().min(1).max(50).error(new Error('担任职务填报错误！')),
       level:joi.string().valid('国家级','省部级').error(new Error(new Error('层次填报错误！'))),
   }
   )
)

//tch_award 
const data_4_1_1_2 = joi.array().items(
   joi.object().keys({
       tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
       award_name:joi.string().min(1).max(100).required().error(new Error('奖项名称填报错误！')),
       level:joi.string().valid('国家级','省部级').required().error(new Error(new Error('层次填报错误！'))),
       pos:joi.string().min(1).max(50).required().error(new Error('担任职务填报错误！')),
       award_eval_org:joi.string().min(1).max(50).required().error(new Error('评奖组织单位填报错误！')),
       award_eval_org_type:joi.string().min(1).max(50).required().error(new Error('评奖组织单位类型填报错误！')),
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('获奖年份填报错误！')),
       
       grade:joi.string().valid('国家特等奖','国家一等奖','国家二等奖','一等奖','二等奖','三等奖').required().error(new Error('奖项等级填报错误！')),
   }
   )
)

//tch_monog 
const data_4_1_2 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('年度填报错误！')),
        monograph:joi.string().min(1).max(100).required().error(new Error('专著名称填报错误！')),
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        publisher:joi.string().min(1).max(100).required().error(new Error('出版社填报错误！')),
        publish_date:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).error(new Error('出版时间填写错误！')),
    }
    )
)

//tch_publish_paper 
const data_4_1_3_0 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('年度填报错误！')),
        paper_title:joi.string().min(1).required().error(new Error('论文标题填报错误！')),
        paper_au:joi.string().min(1).max(200).required().error(new Error('作者姓名填报错误！')),
        jour_name:joi.string().min(1).max(100).required().error(new Error('发表期刊填报错误！')),
        volume_num:joi.number().integer().min(1).required().error(new Error('期刊卷（期）数填报错误！')),
        remarks: joi.string().max(200).allow("").error(new Error('备注在200字以内！')),

        tch_name:joi.string().min(1).max(13).error(new Error('姓名填报错误！')),
        yr:joi.number().integer().less(2029).greater(1950).error(new Error('获奖年份填报错误！')),
        quarter:joi.string().valid('第一季度','第二季度','第三季度','第四季度').error(new Error('填报季度填报错误！')),
        jour_level:joi.string().valid('国内外顶级期刊','国内重要期刊','其他重要期刊').error(new Error('期刊级别填报错误！')),
        publish_yr_mth:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).error(new Error('发表年月填写错误！')),
        
    }
    )
)

//tch_publish_paper  修改：增加require()
const data_4_1_3_1 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('年度填报错误！')),
        quarter:joi.string().required().valid('第一季度','第二季度','第三季度','第四季度').error(new Error('季度填报错误！')),
        paper_title:joi.string().min(1).required().error(new Error('论文标题填报错误！')),
        paper_au:joi.string().min(1).max(200).required().error(new Error('作者姓名填报错误！')),
        jour_name:joi.string().min(1).max(100).required().error(new Error('发表期刊填报错误！')),
        volume_num:joi.number().integer().min(1).required().error(new Error('期刊卷（期）数填报错误！')),
        remarks: joi.string().max(200).allow("").error(new Error('备注在200字以内！')),

        tch_name:joi.string().min(1).max(13).error(new Error('姓名填报错误！')),
        yr:joi.number().integer().less(2029).greater(1950).error(new Error('获奖年份填报错误！')),
        jour_level:joi.string().valid('国内外顶级期刊','国内重要期刊','其他重要期刊').error(new Error('期刊级别填报错误！')),
        publish_yr_mth:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).error(new Error('发表年月填写错误！')),
        
    }
    )
)

//tch_publish_paper 修改：增加require()
const data_4_1_3_2 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('年度填报错误！')),
        quarter:joi.string().required().valid('第一季度','第二季度','第三季度','第四季度').error(new Error('季度填报错误！')),
        paper_title:joi.string().min(1).required().error(new Error('论文标题填报错误！')),
        paper_au:joi.string().min(1).max(200).required().error(new Error('作者姓名填报错误！')),
        jour_name:joi.string().min(1).max(100).required().error(new Error('发表期刊填报错误！')),
        volume_num:joi.number().integer().min(1).required().error(new Error('期刊卷（期）数填报错误！')),
        remarks: joi.string().max(200).allow("").error(new Error('备注在200字以内！')),

        tch_name:joi.string().min(1).max(13).error(new Error('姓名填报错误！')),
        yr:joi.number().integer().less(2029).greater(1950).error(new Error('获奖年份填报错误！')),
        jour_level:joi.string().valid('国内外顶级期刊','国内重要期刊','其他重要期刊').error(new Error('期刊级别填报错误！')),
        publish_yr_mth:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).error(new Error('发表年月填写错误！')),
        
    }
    )
)

//tch_publish_paper 修改：增加require()
const data_4_1_3_3 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('年度填报错误！')),
        quarter:joi.string().required().valid('第一季度','第二季度','第三季度','第四季度').error(new Error('季度填报错误！')),
        paper_title:joi.string().min(1).required().error(new Error('论文标题填报错误！')),
        paper_au:joi.string().min(1).max(200).required().error(new Error('作者姓名填报错误！')),
        jour_name:joi.string().min(1).max(100).required().error(new Error('发表期刊填报错误！')),
        volume_num:joi.number().integer().min(1).required().error(new Error('期刊卷（期）数填报错误！')),
        remarks: joi.string().max(200).allow("").error(new Error('备注在200字以内！')),

        tch_name:joi.string().min(1).max(13).error(new Error('姓名填报错误！')),
        yr:joi.number().integer().less(2029).greater(1950).error(new Error('获奖年份填报错误！')),
        jour_level:joi.string().valid('国内外顶级期刊','国内重要期刊','其他重要期刊').error(new Error('期刊级别填报错误！')),
        publish_yr_mth:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).error(new Error('发表年月填写错误！')),
        
    }
    )
)

//utk_major_desgshow 修改：增加require() 
const data_4_1_4 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
       quarter:joi.string().valid('第一季度','第二季度','第三季度','第四季度').required().error(new Error('填报季度填报错误！')),
       major_desg_or_show_name:joi.string().min(1).required().error(new Error('国内外重大设计或展演名称填报错误！')),
       parti_date:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('参与时间填写错误！')),
       task: joi.string().max(200).allow("").required().error(new Error('任务填写错误！')),
   }
   )
)

//scir_innova_platconst 修改：增加require() 修改为省部级
const data_4_2_1_0 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
       plat_name:joi.string().min(1).max(100).required().error(new Error('平台名称填报错误！')),
       palt_level:joi.string().valid('科技部国家级','其他国家级','省部级').required().error(new Error(new Error('平台等级填报错误！'))),
       appro_time:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('批准时间填写错误！')),
   }
   )
)

//scir_innova_platconst 修改：增加require() 修改为省部级
const data_4_2_1_1 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
        plat_name:joi.string().min(1).max(100).required().error(new Error('平台名称填报错误！')),
        palt_level:joi.string().valid('科技部国家级','其他国家级','省部级').required().error(new Error(new Error('平台等级填报错误！'))),
        appro_time:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('批准时间填写错误！')),
    }
    )
)

//scir_innova_platconst 修改：增加require() 修改为省部级
const data_4_2_1_2 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
        plat_name:joi.string().min(1).max(100).required().error(new Error('平台名称填报错误！')),
        palt_level:joi.string().valid('科技部国家级','其他国家级','省部级').required().error(new Error(new Error('平台等级填报错误！'))),
        appro_time:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('批准时间填写错误！')),
    }
    )
)


//scir_innova_platconst 修改：增加require() 修改为省部级
const data_4_2_1_3 = joi.array().items(
    joi.object().keys({
        yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
        plat_name:joi.string().min(1).max(100).required().error(new Error('平台名称填报错误！')),
        palt_level:joi.string().valid('科技部国家级','其他国家级','省部级').required().error(new Error(new Error('平台等级填报错误！'))),
        appro_time:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('批准时间填写错误！')),
    }
    )
)

//host_scirproj_list 修改：增加require()
const data_4_2_2_0 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
       proj_name:joi.string().min(1).max(100).required().error(new Error('项目名称填报错误！')),
       proj_level:joi.string().valid('国家级','省级').required().error(new Error(new Error('层次填报错误！'))),
       proj_type:joi.string().valid('纵向','横向').required().error(new Error(new Error('项目类型填报错误！'))),
       proj_fromto_ymth:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('项目起止年月填写错误！')),
       proj_fund:joi.number().min(0).required().error(new Error('项目经费填报错误！')),
   }
   )
)

//host_scirproj_list 修改：增加require()
const data_4_2_2_1 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
       proj_name:joi.string().min(1).max(100).required().error(new Error('项目名称填报错误！')),
       proj_type:joi.string().valid('纵向','横向').required().error(new Error(new Error('项目类型填报错误！'))),
       proj_fromto_ymth:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('项目起止年月填写错误！')),
       proj_fund:joi.number().min(0).required().error(new Error('项目经费填报错误！')),

       proj_level:joi.string().valid('国家级','省级').error(new Error(new Error('项目等级填报错误！'))),
   }
   )
)

//host_scirproj_list 修改：增加require()
const data_4_2_2_2 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
       proj_name:joi.string().min(1).max(100).required().error(new Error('项目名称填报错误！')),
       proj_type:joi.string().valid('纵向','横向').required().error(new Error(new Error('项目类型填报错误！'))),
       proj_fromto_ymth:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('项目起止年月填写错误！')),
       proj_fund:joi.number().min(0).required().error(new Error('项目经费填报错误！')),
        // 删除require
       proj_level:joi.string().valid('国家级','省级').error(new Error(new Error('项目等级填报错误！'))),
   }
   )
)

//host_scirproj_list 修改：增加require()
const data_4_2_2_3 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
       proj_name:joi.string().min(1).max(100).required().error(new Error('项目名称填报错误！')),
       proj_type:joi.string().valid('纵向','横向').required().error(new Error(new Error('项目类型填报错误！'))),
       proj_fromto_ymth:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('项目起止年月填写错误！')),
       proj_fund:joi.number().min(0).required().error(new Error('项目经费填报错误！')),
        // 删除require
       proj_level:joi.string().valid('国家级','省级').error(new Error(new Error('项目等级填报错误！'))),
   }
   )
)

//total_scifund_touniv 
const data_4_2_3_1 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
       quarter:joi.string().valid('第一季度','第二季度','第三季度','第四季度').required().error(new Error('填报季度填报错误！')),
       total_fund:joi.number().min(0).allow('').error(new Error('建设总经费填报错误！')),
       
       subj_type:joi.string().valid('纵向','横向').error(new Error(new Error('课题类型填报错误！'))),
   }
   )
)

//total_scifund_touniv 
const data_4_2_3_2 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('填报年度填报错误！')),
       quarter:joi.string().valid('第一季度','第二季度','第三季度','第四季度').required().error(new Error('填报季度填报错误！')),
       total_fund:joi.number().min(0).allow('').error(new Error('建设总经费填报错误！')),
       
       subj_type:joi.string().valid('纵向','横向').error(new Error(new Error('课题类型填报错误！'))),
   }
   )
)

//host_acjour_list  
const data_4_2_4 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('年度填报错误！')),
       jour_name:joi.string().min(1).max(100).required().error(new Error('期刊名称填报错误！')),
       jour_in_num:joi.number().integer().min(1).required().error(new Error('国内期刊编号填报错误！')),
       jour_out_num:joi.number().integer().min(1).required().error(new Error('国外期刊编号填报错误！')),
       adopt:joi.string().valid('CSSCI','CSCD','SCI','SSCI','EI','A&HCI').required().error(new Error('期刊收录情况填报错误！')),
       create_time:joi.string().pattern(/^(1[9][5-9][0-9]|2[0][0-2][0-9])-(0[1-9]|1[0-2])$/).required().error(new Error('创刊时间填写错误！')),
       ac_influ:joi.string().min(1).max(100).required().error(new Error('学术影响力填报错误！')),
       
   }
   )
)

//tch_mk_dfstd 
const data_4_3_1 = joi.array().items(
   joi.object().keys({
       proj_name:joi.string().min(1).max(100).required().error(new Error('名称填报错误！')),
       proj_type:joi.string().valid('纵向','横向').required().error(new Error(new Error('类型填报错误！'))),
       yr:joi.number().integer().less(2029).greater(1950).required().error(new Error('年度填报错误！')),
       quarter:joi.string().valid('第一季度','第二季度','第三季度','第四季度').required().error(new Error('季度填报错误！')),
       parti_type:joi.string().min(1).max(100).required().error(new Error('参与类型填报错误！')),              //
   }
   )
)

//intnaco_paper_num 
const data_4_3_2 = joi.array().items(
   joi.object().keys({
       yr:joi.number().integer().less(2025).greater(1950).required().error(new Error('填报年度填报错误！')),
       quarter:joi.string().valid('第一季度','第二季度','第三季度','第四季度').required().error(new Error('填报季度填报错误！')),
       chn_nsci_num:joi.number().integer().min(0).required().error(new Error('中文期刊论文自然科学数量填报错误！')),
       chn_hss_num:joi.number().integer().min(0).required().error(new Error('中文期刊论文人文社科数量填报错误！')),
       for_nsci_num:joi.number().integer().min(0).required().error(new Error('外文期刊自然科学数量填报错误！')),
       for_hss_num:joi.number().integer().min(0).required().error(new Error('外文期刊人文社科数量填报错误！')),
       co_nsci_num:joi.number().integer().min(0).required().error(new Error('国际合作论文自然科学数量填报错误！')),
       co_hss_num:joi.number().integer().min(0).required().error(new Error('国际合作论文人文社科数量填报错误！')),
   }
   )
)


exports.table_4_1_1_0 = {
    body: {
        data_4_1_1_0
        }
}
exports.table_4_1_1_1 = {
    body: {
        data_4_1_1_1
        }
}
exports.table_4_1_1_2 = {
    body: {
        data_4_1_1_2
        }
}
exports.table_4_1_2 = {
    body: {
        data_4_1_2
        }
}
exports.table_4_1_3_0 = {
    body: {
        data_4_1_3_0
        }
}
exports.table_4_1_3_1 = {
   body: {
       data_4_1_3_1
       }
}
exports.table_4_1_3_2 = {
   body: {
       data_4_1_3_2
       }
}
exports.table_4_1_3_3 = {
   body: {
       data_4_1_3_3
       }
}
exports.table_4_1_4 = {
   body: {
       data_4_1_4
       }
}
exports.table_4_2_1_0 = {
   body: {
       data_4_2_1_0
       }
}
exports.table_4_2_1_1 = {
   body: {
       data_4_2_1_1
       }
}
exports.table_4_2_1_2 = {
   body: {
       data_4_2_1_2
       }
}
exports.table_4_2_1_3 = {
   body: {
       data_4_2_1_3
       }
}
exports.table_4_2_2_0 = {
   body: {
       data_4_2_2_0
       }
}
exports.table_4_2_2_1 = {
   body: {
       data_4_2_2_1
       }
}
exports.table_4_2_2_2 = {
   body: {
       data_4_2_2_2
       }
}
exports.table_4_2_2_3 = {
   body: {
       data_4_2_2_3
       }
}
exports.table_4_2_3_1 = {
   body: {
       data_4_2_3_1
       }
}
exports.table_4_2_3_2 = {
   body: {
       data_4_2_3_2
       }
}
exports.table_4_2_4 = {
   body: {
       data_4_2_4
       }
}
exports.table_4_3_1 = {
   body: {
       data_4_3_1
       }
}
exports.table_4_3_2 = {
   body: {
       data_4_3_2
       }
}