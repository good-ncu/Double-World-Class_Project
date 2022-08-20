const express = require('express')
const router = express.Router()

// 1. 导入并使用平台首页 建设一流师资队伍 路由处理函数对应的模块
const teacher_team_handler = require('../../router_handler/dis_detail/teacher-team')


/**
 * 根路径添加：  /api/
 */




// 专任教师队伍   
/**
 * 高层次人才及团队, 国家级团队和学术领军人才,  省重点人才, 学科专任教师, 博士后和科研助理, 外籍专任教师       的数量
 * 即3-2的全部
 */
router.post('/gov-detail-3-teacher', teacher_team_handler.gov_detail_3_teacher)


// 师资队伍国际水平     3-3 的全部
router.post('/gov-detail-3-level', teacher_team_handler.gov_detail_3_level)








module.exports = router