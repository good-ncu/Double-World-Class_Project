const express = require('express')
const router = express.Router()



// 导入首页  用户填报  路由处理函数对应的模块
const disci_cons_handler = require('../router_handler/disci-cons')



// // 1. 导入验证数据的中间件
// const expressJoi = require('@escook/express-joi')

// 2. 导入需要的验证规则对象

const sub_schema1  = require('../schema/学科建设进展')

// 查询 当前disci-cons/progress下的表格是否可以填报
router.post('/disci-cons/progress', disci_cons_handler.query_is_time)


// // 手动 填报表1-1-2的数据   json --> schema_table 
router.post('/disci-cons/progress/disci-eval-situation', sub_schema1.table_1_1_2, disci_cons_handler.sub)
// // 模板 填报表1-1-2的数据    Excel--> json -->schema_table 
// router.post('/disci-cons/progress/disci-eval-situation', sub_schema1.table_1_1_2, disci_cons_handler.temp)



module.exports = router
