const express = require('express')
const router = express.Router()

// 导入并使用平台首页 社会服务 路由处理函数对应的模块
const social_services_handler = require('../../router_handler/dis_detail/social-services')


// 成果转化    5-1 成果转化xxxx万元    
router.post('/gov-detail-5-earn', social_services_handler.gov_detail_5_earn)


// 智库建设  5-2
router.post('/gov-detail-5-intelligent', social_services_handler.gov_detail_5_intelligent)





module.exports = router