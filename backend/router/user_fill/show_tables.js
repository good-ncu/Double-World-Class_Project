const express = require('express')
const router = express.Router()

const show_tables_handler = require('../../router_handler/user_fill/show_tables')

// 查询 当前学科用户哪些表填了，那些表没填，表都是打开了填报周期的表
router.post('/show-tables', show_tables_handler.show_tables)

module.exports = router