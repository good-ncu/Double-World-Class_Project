const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const download_handler = require('../router_handler/download')

router.get('/download',download_handler.download_excels)
router.get('/download-report',download_handler.download_report)

module.exports = router