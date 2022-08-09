 const express = require('express')
 const router = express.Router()
 
 
 // 导入并使用平台首页 培养拔尖创新人才 路由处理函数对应的模块
 const govl_query_scdis_handler = require('../../router_handler/query/gov_query_school_disc.js')
 
 //  省厅 一流大学，一流学科  下拉菜单的内容
 router.post('/govl-query-scdis-handler', govl_query_scdis_handler.gov_query_school_disc)

 //  省厅的首页    所有学校 及其对应 学科  的展示
router.post('/gov-query-school-disc-eval', govl_query_scdis_handler.gov_query_school_disc_eval)
 
 //  省厅 获取指定学校  对应的所有学科
 router.post('/index/province/subjects_of_school', govl_query_scdis_handler.province_subjects_of_school)

module.exports = router