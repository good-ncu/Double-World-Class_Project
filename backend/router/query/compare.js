const express = require('express')
const router = express.Router()

const compare_handler_gov = require('../../router_handler/query/compare_gov')
// const compare_handler_school = require('../../router_handler/query/compare_school')

const role_audit = require('../../schema/role_audit')
/**
 * 省厅
 */

// 省厅查看 学科对比（选择1~3个学科）
router.post('/gov-compare-subject', role_audit.is_gov, compare_handler_gov.gov_compare_subject)







/**
 * 学校
 */










module.exports = router