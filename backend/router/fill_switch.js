const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const fill_switch_handler = require('../router_handler/fill_switch')


// 校验 用户身份   （必须有，一定要是省厅才能进入下述接口）
const role_audit = require('../schema/role_audit')

/*  
加上 /api/fill_switch 
*/

// 查看每张表的填报状态
router.post('/fill_status', role_audit.is_gov, fill_switch_handler.fill_status)

// 单一表格填报状态修改    从开启到关闭  
router.post('/status_change_close', role_audit.is_gov, fill_switch_handler.status_change_close)

// 单一表格填报状态修改    从关闭到开启 
router.post('/status_change_open', role_audit.is_gov, fill_switch_handler.status_change_open)



module.exports = router
