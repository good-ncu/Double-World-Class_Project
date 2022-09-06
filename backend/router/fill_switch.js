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

// // 查看每张表的填报状态
// router.post('/fill_status', role_audit.is_gov, fill_switch_handler.fill_status)




module.exports = router
