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
// 整体 - 03 - 外籍专任教师数量
router.post('/gov-overview-listen-03-foreign', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_03_foreign)


module.exports = router