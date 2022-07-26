const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const download_handler = require('../router_handler/download')

router.get('/download',download_handler.download_excels)
router.get('/download-report',download_handler.download_report)
router.get('/download-allexcels',download_handler.download_allexcels)

// 查是用户某表否上传了文件，返回上传的文件的文件名
router.get('/download-query-wordname',download_handler.download_query_wordname)

// 下载用户选中 需要下载的文件， （一个请求只有一个下载，需要多各文件的下载需要多次发送请求）
router.get('/download-filled-word',download_handler.download_filled_word)

module.exports = router