const express = require('express')
const router = express.Router()

const gov_query_overall_handler = require('../../router_handler/query/gov_query_overall')

const role_audit = require('../../schema/role_audit')

// 整体 - 01学科建设进展情况
router.post('/gov-overview-listen-01', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_01)

// 整体 - 02 - 国家级教学成果奖数量
router.post('/gov-overview-listen-02-awards', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_02_awards)
// 整体 - 02 - 人才培养基地
router.post('/gov-overview-listen-02-platform', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_02_platform)

// 整体 - 03 - 国家级团队数量
router.post('/gov-overview-listen-03-leader', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_03_leader)
// 整体 - 03 - 国家级学术领军人才
router.post('/gov-overview-listen-03-leadernum', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_03_leadernum)
// 整体 - 03 - 外籍专任教师数量
router.post('/gov-overview-listen-03-foreign', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_03_foreign)
// 整体 - 03 - 担任重要期刊负责人
router.post('/gov-overview-listen-03-response', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_03_response)
// 整体 - 03 - 担任国际比赛负责人
router.post('/gov-overview-listen-03-contest', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_03_contest)

// 整体 - 04 - 国内外发表顶级期刊
router.post('/gov-overview-listen-04-top', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_04_top)


module.exports = router