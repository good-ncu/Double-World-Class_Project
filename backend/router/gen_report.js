const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const gen_report_handler = require('../router_handler/gen_report')

// router.post('/gen-report',gen_report_handler.gen_report)

module.exports = router