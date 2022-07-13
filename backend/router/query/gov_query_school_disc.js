 const express = require('express')
 const router = express.Router()
 
 // 导入并使用平台首页 培养拔尖创新人才 路由处理函数对应的模块
 const govl_query_scdis_handler = require('../../router_handler/query/gov_query_school_disc.js')
 
 router.post('/govl-query-scdis-handler', govl_query_scdis_handler.gov_query_school_disc)

 


module.exports = router