const express = require('express')
const router = express.Router()

const chart_handler = require('../../router_handler/query/chart')

 // 省厅查看 学科评估情况
router.post('/discipline-eval-gov', chart_handler.discipline_eval_gov)
 // 学校查看 学科评估情况
 router.post('/discipline-eval-school', chart_handler.discipline_eval_school)

module.exports = router