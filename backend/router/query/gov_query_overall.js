const express = require('express')
const router = express.Router()

const gov_query_overall_handler = require('../../router_handler/query/gov_query_overall')

const role_audit = require('../../schema/role_audit')

// 整体 - 01学科建设进展情况
router.post('/gov-overview-listen-01', role_audit.is_gov, gov_query_overall_handler.gov_overview_listen_01)
// 整体 - 02 - 国家级教学成果奖数量



module.exports = router