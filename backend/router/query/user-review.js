/** 
 * 该文件用于学科用户填报完某张表后的查看功能，
 * 需要传入该张表的信息  fill_id
 * /api/index/user-query
 */

 const express = require('express')
 const router = express.Router()
 
 
 // 导入并使用平台首页 培养拔尖创新人才 路由处理函数对应的模块
 const user_review_handler = require('../../router_handler/query/user-review')
 
 /* 
    查询 学科用户选择某一学科当前周期下某个已经填报的表后，将该表的数据返回 路由
*/
router.post('/query-single-table-info', user_review_handler.query_single_table_info)












 module.exports = router