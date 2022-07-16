const express = require('express')
const router = express.Router()

// 1. 导入并使用平台首页 建设一流师资队伍 路由处理函数对应的模块
const teacher_team_handler = require('../../router_handler/user_fill/teacher-team')

const pre_view_handler = require('../../router_handler/preview_table')


// 2. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 3. 导入需要的验证规则对象
const sub_schema3  = require('../../schema/建设一流师资队伍')

// 4. 导入解析文件中间件
const excel_parsing3 = require('../../excel_parsing/建设一流师资队伍_xls')

// 5 解析表格中间件
const public = require('../../excel_parsing/公用中间件multer')


// 查询 当前teacher-team/teacher-morality下的表格是否可以填报
router.post('/teacher-morality', teacher_team_handler.query_is_time)

// 查询 当前teacher-team/major-teacher下的表格是否可以填报
router.post('/major-teacher', teacher_team_handler.query_is_time)

// 查询 当前teacher-team/International-level下的表格是否可以填报
router.post('/International-level', teacher_team_handler.query_is_time)



// 第二 文档填写   （3_1_1docx）
router.post('/teacher-morality/honor-counts-word', teacher_team_handler.honor_counts_word_sub)
// 第一 文档填写  （3_1_1docx）
router.post('/teacher-morality/honor-counts-word-template', public.tempupload_word_file_callback, pre_view_handler.preview_word)




/*
    3-1 师德师风建设
 */
// 手动 填报 学科入选国家优秀教师先进典型 情况路由（3-1-1）
router.post('/teacher-morality/honor-counts',expressJoi(sub_schema3.table_3_1_1), teacher_team_handler.honor_counts_sub)




/*
    3-2 专任教师队伍
 */
// 手动 填报 学科主要方向、学科带头人及中青年学术骨干清单 情况路由（表格3-2-1）
router.post('/major-teacher/subject-counts',expressJoi(sub_schema3.table_3_2_1), teacher_team_handler.subject_counts_sub)

// 手动 填报 高层次人才及团队存量清单 情况路由（表3-2-2-0）
router.post('/major-teacher/personnel-team/all-counts',expressJoi(sub_schema3.table_3_2_2_0), teacher_team_handler.all_counts_sub)

// 手动 填报 国家级团队和学术领军人才（含青年人才）清单 情况路由（表3-2-2-1）
router.post('/major-teacher/personnel-team/nation-counts',expressJoi(sub_schema3.table_3_2_2_1), teacher_team_handler.nation_counts_sub)

// 手动 填报 省重点人才清单 情况处理函数 情况路由（表3-2-2-2）
router.post('/major-teacher/personnel-team/province-counts',expressJoi(sub_schema3.table_3_2_2_2), teacher_team_handler.province_counts_sub)

// 手动 填报 表3-2-3 学科专任教师数量及结构
router.post('/major-teacher/number-struct',expressJoi(sub_schema3.table_3_2_3), teacher_team_handler.number_struct_sub)

// 手动 填报 表3-2-4 博士后和科研助理数量
router.post('/major-teacher/assistant-counts',expressJoi(sub_schema3.table_3_2_4), teacher_team_handler.assistant_counts_sub)

// 手动 填报 表3-2-5 外籍专任教师数量及结构
router.post('/major-teacher/foreign-teacher',expressJoi(sub_schema3.table_3_2_5), teacher_team_handler.foreign_teacher_sub)



/**
 * 3-3 师资队伍国际水平
 */
// 手动 填报 表3-3-1 教师担任国内外重要期刊负责人清单
router.post('/International-level/journal-director',expressJoi(sub_schema3.table_3_3_1), teacher_team_handler.journal_director_sub)

// 手动 填报 表3-3-2 教师在国内外重要学术组织任职主要负责人清单
router.post('/International-level/conference-director',expressJoi(sub_schema3.table_3_3_2), teacher_team_handler.conference_director_sub)

// 手动 填报 表3-3-3 学科主要方向、学科带头人及中青年学术骨干清单
router.post('/International-level/conference-report',expressJoi(sub_schema3.table_3_3_3), teacher_team_handler.conference_report_sub)

// 手动 填报 表3-3-4 学科主要方向、学科带头人及中青年学术骨干清单
router.post('/International-level/judges-counts',expressJoi(sub_schema3.table_3_3_4), teacher_team_handler.judges_counts_sub)









// 表格 填报


// 实现文件上传需要两个中间件：
// 1. public.upload_file_callback：实现存储文件   dest 值为文件存储的路径  ;  single方法,表示上传单个文件,参数为前端表单数据对应的key
// 2. excel_parsing1.table_1_1_2：对文件重命名，解析内容为JSON



/*
    3-1 师德师风建设
 */
// 手动 填报 学科入选国家优秀教师先进典型 情况路由（3-1-1）
router.post('/teacher-morality/honor-counts-template',public.upload_file_callback,excel_parsing3.deal_table_3_1_1,expressJoi(sub_schema3.table_3_1_1), pre_view_handler.preview_table)




/*
    3-2 专任教师队伍
 */
// 手动 填报 学科主要方向、学科带头人及中青年学术骨干清单 情况路由（表格3-2-1）
router.post('/major-teacher/subject-counts-template',public.upload_file_callback,excel_parsing3.deal_table_3_2_1,expressJoi(sub_schema3.table_3_2_1), pre_view_handler.preview_table)

// 手动 填报 高层次人才及团队存量清单 情况路由（表3-2-2-0）
router.post('/major-teacher/personnel-team/all-counts-template',public.upload_file_callback,excel_parsing3.deal_table_3_2_2_0,expressJoi(sub_schema3.table_3_2_2_0), pre_view_handler.preview_table)

// 手动 填报 国家级团队和学术领军人才（含青年人才）清单 情况路由（表3-2-2-1）
router.post('/major-teacher/personnel-team/nation-counts-template',public.upload_file_callback,excel_parsing3.deal_table_3_2_2_1,expressJoi(sub_schema3.table_3_2_2_1), pre_view_handler.preview_table)

// 手动 填报 省重点人才清单 情况处理函数 情况路由（表3-2-2-2）
router.post('/major-teacher/personnel-team/province-counts-template',public.upload_file_callback,excel_parsing3.deal_table_3_2_2_2,expressJoi(sub_schema3.table_3_2_2_2), pre_view_handler.preview_table)

// 手动 填报 表3-2-3 学科专任教师数量及结构
router.post('/major-teacher/number-struct-template',public.upload_file_callback,excel_parsing3.deal_table_3_2_3,expressJoi(sub_schema3.table_3_2_3), pre_view_handler.preview_table)

// 手动 填报 表3-2-4 博士后和科研助理数量
router.post('/major-teacher/assistant-counts-template',public.upload_file_callback,excel_parsing3.deal_table_3_2_4,expressJoi(sub_schema3.table_3_2_4), pre_view_handler.preview_table)

// 手动 填报 表3-2-5 外籍专任教师数量及结构
router.post('/major-teacher/foreign-teacher-template',public.upload_file_callback,excel_parsing3.deal_table_3_2_5,expressJoi(sub_schema3.table_3_2_5), pre_view_handler.preview_table)



/**
 * 3-3 师资队伍国际水平
 */
// 手动 填报 表3-3-1 教师担任国内外重要期刊负责人清单
router.post('/International-level/journal-director-template',public.upload_file_callback,excel_parsing3.deal_table_3_3_1,expressJoi(sub_schema3.table_3_3_1), pre_view_handler.preview_table)

// 手动 填报 表3-3-2 教师在国内外重要学术组织任职主要负责人清单
router.post('/International-level/conference-director-template',public.upload_file_callback,excel_parsing3.deal_table_3_3_2,expressJoi(sub_schema3.table_3_3_2), pre_view_handler.preview_table)

// 手动 填报 表3-3-3 学科主要方向、学科带头人及中青年学术骨干清单
router.post('/International-level/conference-report-template',public.upload_file_callback,excel_parsing3.deal_table_3_3_3,expressJoi(sub_schema3.table_3_3_3), pre_view_handler.preview_table)

// 手动 填报 表3-3-4 学科主要方向、学科带头人及中青年学术骨干清单
router.post('/International-level/judges-counts-template',public.upload_file_callback,excel_parsing3.deal_table_3_3_4,expressJoi(sub_schema3.table_3_3_4), pre_view_handler.preview_table)







module.exports = router