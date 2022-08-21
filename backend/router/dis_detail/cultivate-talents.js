const express = require('express')
const router = express.Router()

// 导入并使用平台首页 培养拔尖创新人才 路由处理函数对应的模块
const cultivate_talents_handler = require('../../router_handler/dis_detail/cultivate-talents')
const role_audit = require('../../schema/role_audit')

/*
    2-2-1 教书育人
 */
//  教学成果奖 情况（2-2-1全部）      即 2-2-1-0到2-2-1-3
router.post('/gov-detail-2-award', role_audit.is_gov_or_school, cultivate_talents_handler.gov_detail_2_award)


// 人才培养基地  2-2-3的全部   即 2-2-3-0到2-2-3-2
router.post('/gov-detail-2-platform', role_audit.is_gov_or_school, cultivate_talents_handler.gov_detail_2_platform)


// 硕博导师情况  2-2-4
router.post('/gov-detail-2-teacher', role_audit.is_gov_or_school, cultivate_talents_handler.gov_detail_2_teacher)


// 学生国内外竞赛获奖情况  2-2-6
router.post('/gov-detail-2-contest', role_audit.is_gov_or_school, cultivate_talents_handler.gov_detail_2_contest)


// 学生发表代表性论文情况  2-2-7
router.post('/gov-detail-2-paper', role_audit.is_gov_or_school, cultivate_talents_handler.gov_detail_2_paper)


// 学科毕业生结构  2-3-1
router.post('/gov-detail-2-graduate', role_audit.is_gov_or_school, cultivate_talents_handler.gov_detail_2_graduate)


// 学科留学生结构  2-4-1
router.post('/gov-detail-2-exchange', role_audit.is_gov_or_school, cultivate_talents_handler.gov_detail_2_exchange)


// 三个数字  "正教授","突出毕业生","学术报告人     2-4-2  ,  2-2-5  ,2-3-2 
router.post('/gov-detail-2-number', role_audit.is_gov_or_school, cultivate_talents_handler.gov_detail_2_number)





module.exports = router