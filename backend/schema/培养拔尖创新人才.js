const joi = require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */


 const data_2_1_1 = joi.array().items(
    joi.object().keys({
        project_type:joi.string().min(1).required().error(new Error('荣誉表彰和项目类型填报错误！')),
        project_person:joi.string().min(1).max(30).required().error(new Error('获得者格式填报错误！')),//
        project_year:joi.number().integer().less(2023).greater(1950).required().error(new Error('项目年份填报错误！')),
    })
) 

const data_2_2_1_0 = joi.array().items(
    joi.object().keys({
        award_level:joi.string().min(1).max(30).required().error(new Error('奖项等级填报错误！')),
        award_type:joi.string().min(1).max(30).required().error(new Error('奖项类型填报错误！')),//
        award_date:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('获奖年月填写错误！正确格式：Year-Month（例：2021-08）')),
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！'))
    })
)


const data_2_2_1_1 = joi.array().items(
    joi.object().keys({
        award_level:joi.string().min(1).max(30).required().error(new Error('奖项等级填报错误！')),
        award_type:joi.string().min(1).max(30).required().error(new Error('奖项类型填报错误！')),//
        award_date:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('获奖年月填写错误！')),
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！'))
    })
)

const data_2_2_2_1 = joi.array().items(
    joi.object().keys({
        tch_name:joi.string().min(1).max(13).required().error(new Error('教师姓名填报错误！')),
        textbook:joi.string().min(1).max(30).required().error(new Error('教材名称填报错误！')),
        au_or_tans:joi.string().min(1).max(13).required().error(new Error('作者/译者填报错误！')),
        sig:joi.string().min(1).max(30).required().error(new Error('署名情况填报错误！')),
        publish_date:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('出版时间填写错误！')),
        publisher:joi.string().min(1).max(30).required().error(new Error('出版社填报错误！')),
        revision: joi.number().integer().less(1).greater(50).required().error(new Error('版次填报错误！')),
        textbook_using:joi.string().max(100).allow("").error(new Error('教材使用情况在100字以内！')),
        remarks: joi.string().max(100).allow("").error(new Error('备注在100字以内！')),
    })
)

const data_2_2_2_3 = joi.array().items(
    joi.object().keys({
        head_name:joi.string().min(1).max(13).required().error(new Error('负责人填报错误！')),
        cour_name:joi.string().min(1).max(30).required().error(new Error('课程名称填报错误！')),
        cour_type:joi.string().min(1).max(30).required().error(new Error('课程类别填报错误！')),
        appro_year:joi.number().integer().less(2023).greater(1950).required().error(new Error('获批年度填报错误！')),
        cour_level:joi.string().min(1).max(30).required().error(new Error('课程级别填报错误！')),
    }
    )
)

const data_2_2_3_0 = joi.array().items(
    joi.object().keys({
        head_name:joi.string().min(1).max(13).required().error(new Error('负责人填报错误！')),
        plat_base_level:joi.string().min(1).max(30).required().error(new Error('平台/基地级别填报错误！')),
        plat_base_type:joi.string().min(1).max(30).required().error(new Error('平台/基地类型填报错误！')),
        plat_base_name:joi.string().min(1).max(13).required().error(new Error('平台/基地名称填报错误！')),
        year:joi.number().integer().less(2023).greater(1950).required().error(new Error('年度填报错误！')),
    }
    )
)

const data_2_2_4 = joi.array().items(
    joi.object().keys({
        year:joi.number().integer().less(2023).greater(1950).required().error(new Error('年度填报错误！')),
        master_tutor_num:joi.number().integer().min(0).required().error(new Error('硕导数量填报错误！')),
        doc_tutor_num:joi.number().integer().min(0).required().error(new Error('博导数量填报错误！')),
    }
    )
)

const data_2_2_5 = joi.array().items(
    joi.object().keys({
        year:joi.number().integer().less(2023).greater(1950).required().error(new Error('年度填报错误！')),
        sem:joi.number().integer().max(8).required().error(new Error('学期填报错误！')),
        num_full_prof:joi.number().integer().min(0).required().error(new Error('学科正教授数填报错误！')),
        num_full_prof_teach_underg:joi.number().integer().min(0).required().error(new Error('为本科生上课的正教授数填报错误！')),
    }
    )
)

const data_2_2_6 = joi.array().items(
    joi.object().keys({
        stu_name:joi.string().min(1).max(13).required().error(new Error('学生姓名填报错误！')),
        stu_type:joi.string().valid('本科生','硕士研究生',"博士研究生").required().error(new Error(new Error('学生类型填报错误！'))),
        award_name:joi.string().min(1).max(30).required().error(new Error('奖项名称填报错误！')),
        award_work:joi.string().min(1).max(30).required().error(new Error('获奖作品填报错误！')),
        award_level:joi.string().min(1).max(30).required().error(new Error('奖项等级填报错误！')),
        award_date:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('获奖年月填写错误！')),
        org_name:joi.string().min(1).required().error(new Error('组织单位填报错误！')),
        org_type:joi.string().min(1).required().error(new Error('组织单位类型填报错误！')),
    }
    )
)

const data_2_2_7 = joi.array().items(
    joi.object().keys({
        stu_name:joi.string().min(1).max(13).required().error(new Error('学生姓名填报错误！')),
        paper_title:joi.string().min(1).required().error(new Error('论文标题填报错误！')),
        publish_date:joi.string().pattern(/^[0-9]{4}$/).error(new Error('发表年份填写错误！')),
        stu_type:joi.string().valid('本科生','硕士研究生',"博士研究生").required().error(new Error(new Error('学生类型填报错误！'))),
        jour_name:joi.string().min(1).max(50).required().error(new Error('期刊名称填报错误！')),
        jour_volume:joi.number().integer().min(1).required().error(new Error('期刊卷数填报错误！')),
        jour_collec:joi.string().min(1).max(50).required().error(new Error('期刊收录情况填报错误！')),
    }
    )
)

const data_2_3_1 = joi.array().items(
    joi.object().keys({
        year:joi.number().integer().less(2023).greater(1950).required().error(new Error('年度填报错误！')),
        award_bd_num:joi.number().integer().min(0).required().error(new Error('授予学士学位数填报错误！')),
        award_md_num:joi.number().integer().min(0).required().error(new Error('授予硕士学位数填报错误！')),
        award_phd_num:joi.number().integer().min(0).required().error(new Error('授予博士学位数填报错误！')),
        jour_name:joi.string().min(1).max(50).required().error(new Error('期刊名称填报错误！')),
        jour_volume:joi.number().integer().min(1).required().error(new Error('期刊卷数填报错误！')),
        jour_collec:joi.string().min(1).max(50).required().error(new Error('期刊收录情况填报错误！')),
    }
    )
)

const data_2_3_2 = joi.array().items(
    joi.object().keys({
        stu_name:joi.string().min(1).max(13).required().error(new Error('学生姓名填报错误！')),
        grad_year:joi.number().integer().less(2023).greater(1950).required().error(new Error('毕业年份填报错误！')),
        pro_contribute_proj:joi.string().min(1).max(200).required().error(new Error('突出贡献项目填报错误！')),
    }
    )
)

const data_2_4_1 = joi.array().items(
    joi.object().keys({
        stu_name:joi.string().min(1).max(13).required().error(new Error('学生姓名填报错误！')),
        grad_year:joi.number().integer().less(2023).greater(1950).required().error(new Error('毕业年份填报错误！')),
        pro_contribute_proj:joi.string().min(1).max(200).required().error(new Error('突出贡献项目填报错误！')),
    }
    )
)

const data_2_4_2 = joi.array().items(
    joi.object().keys({
        stu_name:joi.string().min(1).max(13).required().error(new Error('学生姓名填报错误！')),
        year:joi.number().integer().less(2023).greater(1950).required().error(new Error('填报年度填报错误！')),
        stu_type:joi.string().valid('本科生','硕士研究生',"博士研究生").required().error(new Error(new Error('学生类型填报错误！'))),
        conf_name:joi.string().min(1).max(100).required().error(new Error('会议名称填报错误！')),
        rpt_name:joi.string().min(1).max(100).required().error(new Error('报告名称填报错误！')),
        rpt_time:joi.string().pattern(/^[0-9]{4}-(0[1-9]|1[0-2])$/).error(new Error('报告时间填写错误！')),
        rpt_place:joi.string().min(1).max(100).required().error(new Error('报告地点填报错误！')),
    }
    )
)


exports.table_2_1_1 = {
    body: {
            data_2_1_1
        }
}
exports.table_2_2_1_0 = {
    body: {
            data_2_2_1_0
        }
}
exports.table_2_2_1_1 = {
    body: {
            data_2_2_1_1
        }
}
exports.table_2_2_1_2 = {
    body: {
        data_2_2_1_1
        }
}
exports.table_2_2_1_3 = {
    body: {
        data_2_2_1_1
        }
}
exports.table_2_2_2_1 = {
    body: {
        data_2_2_2_1
        }
}
exports.table_2_2_2_3 = {
    body: {
        data_2_2_2_3
        }
}
exports.table_2_2_2_4 = {
    body: {
        data_2_2_2_3
        }
}
exports.table_2_2_3_0 = {
    body: {
        data_2_2_3_0
        }
}
exports.table_2_2_3_1 = {
    body: {
        data_2_2_3_0
        }
}
exports.table_2_2_3_2 = {
    body: {
        data_2_2_3_0
        }
}
exports.table_2_2_4 = {
    body: {
        data_2_2_4
        }
}
exports.table_2_2_5 = {
    body: {
        data_2_2_5
        }
}
exports.table_2_2_6 = {
    body: {
        data_2_2_6
        }
}
exports.table_2_2_7 = {
    body: {
        data_2_2_7
        }
}
exports.table_2_3_1 = {
    body: {
        data_2_3_1
        }
}
exports.table_2_3_2 = {
    body: {
        data_2_3_2
        }
}

exports.table_2_4_1 = {
    body: {
        data_2_4_1
        }
}
exports.table_2_4_2 = {
    body: {
        data_2_4_2
        }
}