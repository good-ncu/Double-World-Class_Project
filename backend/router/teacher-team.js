const express = require('express')
const router = express.Router()

// 1. 导入并使用平台首页 建设一流师资队伍 路由处理函数对应的模块
const teacher_team_handler = require('../router_handler/teacher-team')

// 2. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 3. 导入需要的验证规则对象
const sub_schema3  = require('../schema/建设一流师资队伍')



// 查询 当前teacher-team/teacher-morality下的表格是否可以填报
router.post('/teacher-morality', teacher_team_handler.query_is_time)

// 查询 当前teacher-team/major-teacher下的表格是否可以填报
router.post('/major-teacher', teacher_team_handler.query_is_time)

// 查询 当前teacher-team/International-level下的表格是否可以填报
router.post('/International-level', teacher_team_handler.query_is_time)






/*
    3-1 师德师风建设
 */
// 手动 填报 学科入选国家优秀教师先进典型 情况（3-1-1）
router.post('/teacher-morality/honor-counts',expressJoi(sub_schema3.table_3_1_1), teacher_team_handler.honor_counts_sub)


















module.exports = router