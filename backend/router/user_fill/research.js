const express = require('express')
const router = express.Router()

// 导入并使用平台首页 科学研究 路由处理函数对应的模块
const research_handler = require('../../router_handler/user_fill/research')

const pre_view_handler = require('../../router_handler/preview_table')

// 2. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 3. 导入需要的验证规则对象
const sub_schema4  = require('../../schema/科学研究')
// 导入解析文件中间件
const excel_parsing1 = require('../../excel_parsing/科学研究_xls')

// 4 解析表格中间件
const public = require('../../excel_parsing/公用中间件multer')

// 查询 当前research/research-innovate下的表格是否可以填报
router.post('/research-innovate', research_handler.query_is_time)

// 查询 当前research/research-platform下的表格是否可以填报
router.post('/research-platform', research_handler.query_is_time)

// 查询 当前research/International-influence下的表格是否可以填报
router.post('/international-influence', research_handler.query_is_time)


/**
 * 4-1 师德师风建设
 */
// 4-1-1-0
router.post('/research-innovate/teacher-prize/prize-counts',expressJoi(sub_schema4.table_4_1_1_0), research_handler.teacher_prize_prize_counts_sub)
// 4-1-1-1
router.post('/research-innovate/teacher-prize/nation-counts',expressJoi(sub_schema4.table_4_1_1_1), research_handler.teacher_prize_nation_counts_sub)
// 4-1-1-2
router.post('/research-innovate/teacher-prize/province-counts',expressJoi(sub_schema4.table_4_1_1_2), research_handler.teacher_prize_province_counts_sub)

// 4-1-2
router.post('/research-innovate/teacher-prize/book-counts',expressJoi(sub_schema4.table_4_1_2), research_handler.teacher_prize_book_counts_sub)

// 4-1-3-0
router.post('/research-innovate/paper-list/all-counts',expressJoi(sub_schema4.table_4_1_3_0), research_handler.paper_list_all_counts_sub)
// 4-1-3-1
router.post('/research-innovate/paper-list/top-counts',expressJoi(sub_schema4.table_4_1_3_1), research_handler.paper_list_top_counts_sub)
// 4-1-3-2
router.post('/research-innovate/paper-list/good-counts',expressJoi(sub_schema4.table_4_1_3_2), research_handler.paper_list_good_counts_sub)
// 4-1-3-3
router.post('/research-innovate/paper-list/other-counts',expressJoi(sub_schema4.table_4_1_3_3), research_handler.paper_list_other_counts_sub)

// 4-1-4
router.post('/research-innovate/design-display',expressJoi(sub_schema4.table_4_1_4), research_handler.design_display_sub)

/**
 * 4-2 科研平台建设
 */
// 4-2-1-0
router.post('/research-platform/innovate-platform/platform-counts',expressJoi(sub_schema4.table_4_2_1_0), 
research_handler.innovate_platform_platform_counts_sub)
// 4-2-1-1
router.post('/research-platform/innovate-platform/tech-counts',expressJoi(sub_schema4.table_4_2_1_1), 
research_handler.innovate_platform_tech_counts_sub)
// 4-2-1-2
router.post('/research-platform/innovate-platform/nation-counts',expressJoi(sub_schema4.table_4_2_1_2), 
research_handler.innovate_platform_nation_counts_sub)
// 4-2-1-3
router.post('/research-platform/innovate-platform/province-counts',expressJoi(sub_schema4.table_4_2_1_3), 
research_handler.innovate_platform_province_counts_sub)

// 4-2-2-0
router.post('/research-platform/project-list/project-counts',expressJoi(sub_schema4.table_4_2_2_0), 
research_handler.project_list_project_counts_sub)
// 4-2-2-1
router.post('/research-platform/project-list/top-counts',expressJoi(sub_schema4.table_4_2_2_1), 
research_handler.project_list_top_counts_sub)
// 4-2-2-2
router.post('/research-platform/project-list/nation-counts',expressJoi(sub_schema4.table_4_2_2_2), 
research_handler.project_list_nation_counts_sub)
// 4-2-2-3
router.post('/research-platform/project-list/province-counts',expressJoi(sub_schema4.table_4_2_2_3), 
research_handler.project_list_province_counts_sub)

// 4-2-3-1
router.post('/research-platform/funds/portrait-counts',expressJoi(sub_schema4.table_4_2_3_1), 
research_handler.funds_portrait_counts_sub)
// 4-2-3-2
router.post('/research-platform/funds/transverse-counts',expressJoi(sub_schema4.table_4_2_3_2), 
research_handler.funds_transverse_counts_sub)

// 4-2-4
router.post('/research-platform/hold-journals',expressJoi(sub_schema4.table_4_2_4), 
research_handler.hold_journals_sub)

// 4-3-1
router.post('/research-platform/international-influence/standard-counts',expressJoi(sub_schema4.table_4_3_1), 
research_handler.international_influence_standard_counts_sub)
// 4-3-2
router.post('/research-platform/international-influence/paper-counts',expressJoi(sub_schema4.table_4_3_2), 
research_handler.international_influence_paper_counts_sub)



/* 
    模板填报
*/
/**
 * 4-1 师德师风建设
 */
// 4-1-1-0
router.post('/research-innovate/teacher-prize/prize-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_1_1_0, expressJoi(sub_schema4.table_4_1_1_0), pre_view_handler.preview_table)
// 4-1-1-1
router.post('/research-innovate/teacher-prize/nation-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_1_1_1, expressJoi(sub_schema4.table_4_1_1_1), pre_view_handler.preview_table)
// 4-1-1-2
router.post('/research-innovate/teacher-prize/province-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_1_1_2, expressJoi(sub_schema4.table_4_1_1_2), pre_view_handler.preview_table)

// 4-1-2
router.post('/research-innovate/teacher-prize/book-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_1_2, expressJoi(sub_schema4.table_4_1_2), pre_view_handler.preview_table)

// 4-1-3-0
router.post('/research-innovate/paper-list/all-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_1_3_0, expressJoi(sub_schema4.table_4_1_3_0), pre_view_handler.preview_table)
// 4-1-3-1
router.post('/research-innovate/paper-list/top-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_1_3_1, expressJoi(sub_schema4.table_4_1_3_1), pre_view_handler.preview_table)
// 4-1-3-2
router.post('/research-innovate/paper-list/good-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_1_3_2, expressJoi(sub_schema4.table_4_1_3_2), pre_view_handler.preview_table)
// 4-1-3-3
router.post('/research-innovate/paper-list/other-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_1_3_3, expressJoi(sub_schema4.table_4_1_3_3), pre_view_handler.preview_table)

// 4-1-4
router.post('/research-innovate/design-display-template', public.upload_file_callback, excel_parsing1.deal_table_4_1_4, expressJoi(sub_schema4.table_4_1_4), pre_view_handler.preview_table)

/**
 * 4-2 科研平台建设
 */
// 4-2-1-0
router.post('/research-platform/innovate-platform/platform-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_1_0, expressJoi(sub_schema4.table_4_2_1_0), 
pre_view_handler.preview_table)
// 4-2-1-1
router.post('/research-platform/innovate-platform/tech-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_1_1, expressJoi(sub_schema4.table_4_2_1_1), 
pre_view_handler.preview_table)
// 4-2-1-2
router.post('/research-platform/innovate-platform/nation-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_1_2, expressJoi(sub_schema4.table_4_2_1_2), 
pre_view_handler.preview_table)
// 4-2-1-3
router.post('/research-platform/innovate-platform/province-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_1_3, expressJoi(sub_schema4.table_4_2_1_3), 
pre_view_handler.preview_table)

// 4-2-2-0
router.post('/research-platform/project-list/project-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_2_0, expressJoi(sub_schema4.table_4_2_2_0), 
pre_view_handler.preview_table)
// 4-2-2-1
router.post('/research-platform/project-list/top-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_2_1, expressJoi(sub_schema4.table_4_2_2_1), 
pre_view_handler.preview_table)
// 4-2-2-2
router.post('/research-platform/project-list/nation-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_2_2, expressJoi(sub_schema4.table_4_2_2_2), 
pre_view_handler.preview_table)
// 4-2-2-3
router.post('/research-platform/project-list/province-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_2_3, expressJoi(sub_schema4.table_4_2_2_3), 
pre_view_handler.preview_table)

// 4-2-3-1
router.post('/research-platform/funds/portrait-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_3_1, expressJoi(sub_schema4.table_4_2_3_1), 
pre_view_handler.preview_table)
// 4-2-3-2
router.post('/research-platform/funds/transverse-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_3_2, expressJoi(sub_schema4.table_4_2_3_2), 
pre_view_handler.preview_table)

// 4-2-4
router.post('/research-platform/hold-journals-template', public.upload_file_callback, excel_parsing1.deal_table_4_2_4, expressJoi(sub_schema4.table_4_2_4), 
pre_view_handler.preview_table)

// 4-3-1
router.post('/research-platform/international-influence/standard-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_3_1, expressJoi(sub_schema4.table_4_3_1), 
pre_view_handler.preview_table)
// 4-3-2
router.post('/research-platform/international-influence/paper-counts-template', public.upload_file_callback, excel_parsing1.deal_table_4_3_2, expressJoi(sub_schema4.table_4_3_2), 
pre_view_handler.preview_table)















module.exports = router