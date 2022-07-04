const express = require('express')
const router = express.Router()



// 导入首页  用户填报  路由处理函数对应的模块
const disci_cons_handler = require('../router_handler/disci-cons')



// // 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 2. 导入需要的验证规则对象

const sub_schema1  = require('../schema/学科建设进展')

// 查询 当前disci-cons/progress下的表格是否可以填报
router.post('/progress', disci_cons_handler.query_is_time)


// 手动 填写学科评估情况（1-1-2）
router.post('/progress/disci-eval-situation', expressJoi(sub_schema1.table_1_1_2), disci_cons_handler.disci_eval_situation_sub)

// 手动 填写学科影响力情况（1-1-3）
router.post('/progress/disci-influence', expressJoi(sub_schema1.table_1_1_3), disci_cons_handler.disci_influence_sub)

// 手动 填写本学科建设经费数额（1-1-4）
// router.post('/progress/disci-funds', expressJoi(sub_schema1.table_1_1_4), disci_cons_handler.disci_funds_sub)



module.exports = router
