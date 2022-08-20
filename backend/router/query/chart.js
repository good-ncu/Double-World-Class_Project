const express = require('express')
const router = express.Router()

const chart_handler_gov = require('../../router_handler/query/chart_gov')
const chart_handler_school = require('../../router_handler/query/chart_school')
const chart_handler_discipline = require('../../router_handler/query/chart_discipline')
const role_audit = require('../../schema/role_audit')
/**
 * 省厅
 */

// 省厅查看 突击队学科（11个Logo）
router.post('/gov-tjd', role_audit.is_gov, chart_handler_gov.gov_tjd)

// 省厅查看 第四轮学科评估情况
router.post('/gov-tjd-4-evaluation', role_audit.is_gov, chart_handler_gov.gov_tjd_4_evaluation)


// 省厅查看 学术领军人才
router.post('/gov-tjd-leaders', role_audit.is_gov, chart_handler_gov.gov_tjd_leaders)
// 省厅查看 学术领军人才 详情
router.post('/gov-tjd-leaders-detail', role_audit.is_gov, chart_handler_gov.gov_tjd_leaders_detail)


// 省厅查看 主持国家重点重大项目情况
router.post('/gov-tjd-hold-big-project', role_audit.is_gov, chart_handler_gov.gov_tjd_hold_big_project)
// 省厅查看 学术领军人才 详情
router.post('/gov-tjd-hold-big-project-detail', role_audit.is_gov, chart_handler_gov.gov_tjd_hold_big_project_detail)


// 省厅查看 学科国家级教学成果奖情况
router.post('/gov-tjd-big-award', role_audit.is_gov, chart_handler_gov.gov_tjd_big_award)
// 省厅查看 学术领军人才 详情
router.post('/gov-tjd-big-award-detail', role_audit.is_gov, chart_handler_gov.gov_tjd_big_award_detail)


// 省厅查看 教师国家级奖项情况
router.post('/gov-tjd-big-teacher-award', role_audit.is_gov, chart_handler_gov.gov_tjd_big_teacher_award)
// 省厅查看 教师国家级奖项情况
router.post('/gov-tjd-big-teacher-award-detail', role_audit.is_gov, chart_handler_gov.gov_tjd_big_teacher_award_detail)


// 省厅查看 国家级平台建设情况
router.post('/gov-tjd-big-platform', role_audit.is_gov, chart_handler_gov.gov_tjd_big_platform)
// 省厅查看 国家级平台建设情况
router.post('/gov-tjd-big-platform-detail', role_audit.is_gov, chart_handler_gov.gov_tjd_big_platform_detail)







/**
 * 学校
 */

// 学校查看 学科评估情况
router.post('/discipline-eval-school', role_audit.is_school, chart_handler_school.discipline_eval_school)

































module.exports = router