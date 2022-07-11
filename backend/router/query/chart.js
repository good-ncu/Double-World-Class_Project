const express = require('express')
const router = express.Router()

const chart_handler = require('../../router_handler/query/chart')
const role_audit  = require('../../schema/role_audit')

 // 省厅查看 学科评估情况
router.post('/discipline-eval-gov', role_audit.is_gov, chart_handler.discipline_eval_gov)
 // 学校查看 学科评估情况
 router.post('/discipline-eval-school', role_audit.is_school, chart_handler.discipline_eval_school)
  // 学科查看 学科评估情况
  router.post('/discipline-eval-discipline', role_audit.is_discipline, chart_handler.discipline_eval_discipline)

module.exports = router