const express = require('express')
const router = express.Router()

// 导入并使用平台首页 科学研究 路由处理函数对应的模块
const research_handler = require('../router_handler/research')

// 2. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 3. 导入需要的验证规则对象
const sub_schema4  = require('../schema/科学研究')



// 查询 当前research/research-innovate下的表格是否可以填报
router.post('/research-innovate', research_handler.query_is_time)

// 查询 当前research/research-platform下的表格是否可以填报
router.post('/research-platform', research_handler.query_is_time)

// 查询 当前research/International-influence下的表格是否可以填报
router.post('/International-influence', research_handler.query_is_time)


/*
    4-1 师德师风建设
 */
// 手动 填报 教师获国内外重要奖项数存量 情况（4-1-1-0）
router.post('/research-innovate/teacher-prize/prize-counts',expressJoi(sub_schema4.table_4_1_1_0), research_handler.prize_counts_sub)













module.exports = router