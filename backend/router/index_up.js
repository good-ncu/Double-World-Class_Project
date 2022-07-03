const express = require('express')
const router = express.Router()



// 导入首页  用户填报  路由处理函数对应的模块
const index_up_handler = require('../router_handler/index_up')



// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 2. 导入需要的验证规则对象

const sub_schema1  = require('../schema/学科建设进展')



// // 手动 注册学科填报用户
router.post('/disci-cons/progress/disci-eval-situation', sub_schema1.table_1_1_2, index_up_handler.sub)


// 手动 注册学科填报用户
// router.post('/a/b/sub',index_up_handler.sub)



module.exports = router
