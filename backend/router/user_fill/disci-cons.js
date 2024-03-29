const express = require('express')
const router = express.Router()



// 导入首页  用户填报  路由处理函数对应的模块
const disci_cons_handler = require('../../router_handler/user_fill/disci-cons')

const pre_view_handler = require('../../router_handler/preview_table')


// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 2. 导入需要的验证规则对象

const sub_schema1 = require('../../schema/学科建设进展')

// 3. 导入解析文件中间件
const excel_parsing1 = require('../../excel_parsing/学科建设进展_xls')


// 4 解析表格中间件
const public = require('../../excel_parsing/公用中间件multer')


/**
 * 根路径添加：  /api/index/disci-cons
 */



// 第二步 文档填写 学科建设进展情况写实  （1-1-1）
router.post('/progress/progress-situation', disci_cons_handler.progress_situation_sub)
// 第一步 文档填写 学科建设进展情况写实  （1-1-1）
router.post('/progress/progress-situation-template', public.tempupload_word_file_callback, pre_view_handler.preview_word)


// 查询 当前disci-cons/progress下的表格是否可以填报
router.post('/progress', disci_cons_handler.query_is_time)


// 手动 填写学科评估情况（1-1-2）
router.post('/progress/disci-eval-situation', expressJoi(sub_schema1.table_1_1_2), disci_cons_handler.disci_eval_situation_sub)
// router.post('/progress/new-disci-eval-situation', expressJoi(sub_schema1.table_1_1_2), disci_cons_handler.new_disci_eval_situation_sub)

// 手动 填写学科影响力情况（1-1-3）
router.post('/progress/disci-influence', expressJoi(sub_schema1.table_1_1_3), disci_cons_handler.disci_influence_sub)

// 手动 填写学科建设经费数额（1-1-4）
router.post('/progress/disci-funds', expressJoi(sub_schema1.table_1_1_4), disci_cons_handler.disci_funds_sub)




// 表格    文档1-1-1


// 实现文件上传需要两个中间件：
// 1. public.upload_file_callback：实现存储文件   dest 值为文件存储的路径  ;  single方法,表示上传单个文件,参数为前端表单数据对应的key
// 2. excel_parsing1.table_1_1_2：对文件重命名，解析内容为JSON



// 填写学科评估情况（1-1-2）
router.post('/progress/disci-eval-situation-template', public.upload_file_callback, excel_parsing1.deal_table_1_1_2, expressJoi(sub_schema1.table_1_1_2), pre_view_handler.preview_table)


// 填写学科影响力情况（1-1-3）
router.post('/progress/disci-influence-template', public.upload_file_callback, excel_parsing1.deal_table_1_1_3, expressJoi(sub_schema1.table_1_1_3), pre_view_handler.preview_table)

// 填写学科建设经费数额（1-1-4）
router.post('/progress/disci-funds-template', public.upload_file_callback, excel_parsing1.deal_table_1_1_4, expressJoi(sub_schema1.table_1_1_4), pre_view_handler.preview_table)







//  这是一个公共的接口： 对某个学校某个学科的任何一个表来说，如果没有数据需要填入，那么可以做一个伪插入操作
router.post('/fill-empty', disci_cons_handler.fill_empty)




module.exports = router
