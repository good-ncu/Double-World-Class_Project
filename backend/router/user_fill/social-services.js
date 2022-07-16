const express = require('express')
const router = express.Router()

// 导入并使用平台首页 社会服务 路由处理函数对应的模块
const social_services_handler = require('../../router_handler/user_fill/social-services')

const pre_view_handler = require('../../router_handler/preview_table')


// 2. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 3. 导入需要的验证规则对象
const sub_schema5  = require('../../schema/社会服务')

// 4. 导入解析文件中间件
const excel_parsing5 = require('../../excel_parsing/社会服务_xls')

// 5 解析表格中间件
const public = require('../../excel_parsing/公用中间件multer')

// 查询 当前5-1下的表格是否可以填报
router.post('/result-trans', social_services_handler.query_is_time)

// 查询 当前5-2下的表格是否可以填报
router.post('/social-support', social_services_handler.query_is_time)

// 查询 当前5-3下的表格是否可以填报
router.post('/services-social', social_services_handler.query_is_time)




// 第二 文档填写   （5_4_1）
router.post('/services-social/kjxt', social_services_handler.kjxt_sub)
// 第一 文档填写  （5_4_1）
router.post('/services-social/kjxt-template', public.tempupload_word_file_callback, pre_view_handler.preview_word)

// 第二 文档填写   （5_4_2）
router.post('/services-social/fwgj', social_services_handler.fwgj_sub)
// 第一 文档填写  （5_4_2）
router.post('/services-social/fwgj-template', public.tempupload_word_file_callback, pre_view_handler.preview_word)






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











// 表格 填报


// 实现文件上传需要两个中间件：
// 1. public.upload_file_callback：实现存储文件   dest 值为文件存储的路径  ;  single方法,表示上传单个文件,参数为前端表单数据对应的key
// 2. excel_parsing1.table_1_1_2：对文件重命名，解析内容为JSON


/**
 * 5-1 成果转化
 */
//成果转化到校金额
// 手动 填报 成果转化到校金额  情况路由（5-1-1）
router.post('/result-trans/get-funds-template',public.upload_file_callback,excel_parsing5.deal_table_5_1_1,expressJoi(sub_schema5.table_5_1_1), pre_view_handler.preview_table)



// 手动 填报 国家级产教融合平台建设数 情况路由（5-2-1-1）
router.post('/social-support/industry-nation-counts-template',public.upload_file_callback,excel_parsing5.deal_table_5_2_1_1,expressJoi(sub_schema5.table_5_2_1_1), pre_view_handler.preview_table)

// 手动 填报 省部级产教融合平台建设数 情况路由（5-2-1-2）
router.post('/social-support/industry-province-counts-template',public.upload_file_callback,excel_parsing5.deal_table_5_2_1_2,expressJoi(sub_schema5.table_5_2_1_2),pre_view_handler.preview_table)



// 手动 填报 国家级咨政研究情况 情况路由（5-2-2-1）
router.post('/services-social/consultative-nation-counts-template',public.upload_file_callback,excel_parsing5.deal_table_5_2_2_1,expressJoi(sub_schema5.table_5_2_2_1),pre_view_handler.preview_table)

// 手动 填报 省部级咨政研究情况 情况路由（5-2-2-2）
router.post('/services-social/consultative-province-counts-template',public.upload_file_callback,excel_parsing5.deal_table_5_2_2_2,expressJoi(sub_schema5.table_5_2_2_2),pre_view_handler.preview_table)











module.exports = router