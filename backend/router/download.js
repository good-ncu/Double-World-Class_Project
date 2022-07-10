const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const download_handler = require('../router_handler/download')

router.post('/download',download_handler.download_excels)

module.exports = router