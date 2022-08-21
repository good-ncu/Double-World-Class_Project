const express = require('express')
const router = express.Router()



// 导入省厅 学科详情  路由处理函数对应的模块
const disci_cons_handler = require('../../router_handler/dis_detail/disci-cons')
const role_audit = require('../../schema/role_audit')



/**
 * 根路径添加：  /api/
 */



// 学科评估情况（1-1-2）
router.post('/gov-detail-1-evaluation', role_audit.is_gov_or_school, disci_cons_handler.gov_detail_1_evaluation)

// 学科影响力情况（1-1-3）
router.post('/gov-detail-1-influence', role_audit.is_gov_or_school, disci_cons_handler.gov_detail_1_influence)

// 手动 填写学科建设经费数额（1-1-4）
router.post('/gov-detail-1-found', role_audit.is_gov_or_school, disci_cons_handler.gov_detail_1_found)





module.exports = router
