const express = require('express')
const router = express.Router()

const chart_handler_gov = require('../../router_handler/query/chart_gov')
const chart_handler_school = require('../../router_handler/query/chart_school')
const chart_handler_discipline = require('../../router_handler/query/chart_discipline')
const role_audit  = require('../../schema/role_audit')
/**
 * 省厅
 */

 // 省厅查看 学科评估情况
router.post('/discipline-eval-gov', role_audit.is_gov, chart_handler_gov.discipline_eval_gov)

// 省厅查看 







/**
 * 学校
 */

 // 学校查看 学科评估情况
router.post('/discipline-eval-school', role_audit.is_school, chart_handler_school.discipline_eval_school)
 









 /**
  * 学科
  */

 // 学科查看 学科评估情况
router.post('/discipline-eval-discipline', role_audit.is_discipline, chart_handler_discipline.discipline_eval_discipline)
























module.exports = router