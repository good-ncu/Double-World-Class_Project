const express = require('express')
const router = express.Router()

const download_attachment = require('../../router_handler/query/download_attachment')

// 附件列表查询接口
router.post('/attach-query-download', download_attachment.attach_query_download)
// 附件下载接口
router.get('/attach-filled-download', download_attachment.attach_filled_download)

module.exports = router