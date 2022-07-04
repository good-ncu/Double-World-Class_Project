const express = require('express')
const router = express.Router()

// 导入并使用平台首页 培养拔尖创新人才 路由处理函数对应的模块
const cultivate_talents_handler = require('../router_handler/cultivate-talents')

// // 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const sub_schema2  = require('../schema/培养拔尖创新人才')


/*
    2-1 教书育人
 */
// 查询 /api/index/cultivate-talents/education下的表格是否可以填报
router.post('/education', cultivate_talents_handler.query_can_write_education)

// 手动 填报思想政治教育特色与成效（2-1-1）
router.post('/education/political-edu',expressJoi(sub_schema2.table_2_1_1), cultivate_talents_handler.political_edu_sub)



/* 
    2-2 培养过程
*/
// 查询 /api/index/cultivate-talents/progress下的表格是否可以填报
router.post('/progress', cultivate_talents_handler.query_can_write_progress)
// 手动 填报教学成果奖存量情况（2-2-1-0）
router.post('/progress/edu-awards-num/counts', expressJoi(sub_schema2.table_2_2_1_0), cultivate_talents_handler.edu_awards_num_counts_sub)
// 手动 填报国家级教学成果奖情况（2-2-1-1）
router.post('/progress/edu-awards-num/nation-counts', expressJoi(sub_schema2.table_2_2_1_1), cultivate_talents_handler.edu_awards_num_nation_counts_sub)





module.exports = router