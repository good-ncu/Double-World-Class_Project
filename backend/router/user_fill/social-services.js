const express = require('express')
const router = express.Router()

// 导入并使用平台首页 社会服务 路由处理函数对应的模块
const social_services_handler = require('../../router_handler/user_fill/social-services')

// 2. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 3. 导入需要的验证规则对象
const sub_schema5  = require('../../schema/社会服务')

// 查询 当前5-1下的表格是否可以填报
router.post('/result-trans', social_services_handler.query_is_time)

// 查询 当前5-2下的表格是否可以填报
router.post('/social-support', social_services_handler.query_is_time)

// 查询 当前5-3下的表格是否可以填报
router.post('/services-social', social_services_handler.query_is_time)

/**
 * 5-1 成果转化
 */
//成果转化到校金额
// 手动 填报 成果转化到校金额  情况路由（5-1-1）
router.post('/result-trans/get-funds',expressJoi(sub_schema5.table_5_1_1), social_services_handler.get_funds_sub)



// 手动 填报 国家级产教融合平台建设数 情况路由（5-2-1-1）
router.post('/social-support/industry-nation-counts',expressJoi(sub_schema5.table_5_2_1_1), social_services_handler.industry_nation_counts_sub)

// 手动 填报 省部级产教融合平台建设数 情况路由（5-2-1-2）
router.post('/social-support/industry-province-counts',expressJoi(sub_schema5.table_5_2_1_2), social_services_handler.industry_province_counts_sub)



// 手动 填报 国家级咨政研究情况 情况路由（5-2-2-1）
router.post('/services-social/consultative-nation-counts',expressJoi(sub_schema5.table_5_2_2_1), social_services_handler.consultative_nation_counts_sub)

// 手动 填报 省部级咨政研究情况 情况路由（5-2-2-2）
router.post('/services-social/consultative-province-counts',expressJoi(sub_schema5.table_5_2_2_2), social_services_handler.consultative_province_counts_sub)











module.exports = router