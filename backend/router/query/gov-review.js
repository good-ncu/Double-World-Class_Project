const express = require('express')
const router = express.Router()

// 导入并使用平台首页 培养拔尖创新人才 路由处理函数对应的模块
const gov_review_handler = require('../../router_handler/query/gov-review')

//  省厅将所有此次周期下学校的表格数据导出 （总表）    导出的表格可选，（1~61张）  
//    /api/index/gov-query/export-all-discipline-table
router.get('/export-all-discipline-table', gov_review_handler.export_all_discipline_table, gov_review_handler.download_all_data)




/* 
   查询 省厅查看选择某一学校学科当前周期下某个已经填报的表后，将该表的数据返回 路由
*/
router.post('/query-single-table-info', gov_review_handler.query_single_table_info)













module.exports = router