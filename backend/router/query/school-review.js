/**
 * 该js文件用于 学校对其下属学科填报用户初次填报后进行 审核
 * 
 *  任何一条数据 只有在 is_seen=1 ,is_delete=o 的状态下可用
 *  请注意：   填报用户初次提交的一组数据中，只要有一条数据有误，则全部打回重新填。 
 *          即 设置  is_seen=1 ,is_delete=1  flag=0  （其中flag是学校管理员当前打回的数据所在的表格记录置为0，意味着学科填报用户可再次填写该类型数据）
 * 
 * 最后，审核逻辑如下所示：
 * 学校管理员：1、先选择想要审批的学科；2、以填报的一组完整数据为单位，展示对应学科填报用户初次填报的数据
 * 
 * 
 */

const express = require('express')
const router = express.Router()

// 导入并使用平台首页 培养拔尖创新人才 路由处理函数对应的模块
const school_review_handler = require('../../router_handler/query/school-review')
const word_review_handler = require('../../router_handler/download')



// userinfo  
/* 
    步骤1-1查询 当前学校拥有的所有学科 路由
*/
router.post('/query-all-discipline', school_review_handler.query_all_discipline)
/* 
    步骤1-1查询 南昌大学某学科群拥有的所有学科 路由
*/
router.post('/query-ncu-all-discipline', school_review_handler.query_ncu_all_discipline)



//已知： userinfo  + univ_code（无需传），discipline_name 
/* 
    步骤1-2查询 学校管理员选择某一学科后， 将当前周期下，该学科 所有已经填报了的表格，将其返回 路由
*/
router.post('/query-single-discipline-current', school_review_handler.query_single_discipline_current)



// 已知： userinfo + user_fill_id(前端给的是id 记得转换或对应起来)  +  fill_id 
/* 
    步骤1-3查询 学校管理员选择某一学科当前周期下某个已经填报的表后，将该表的数据返回 路由
*/
router.post('/query-single-discipline-table', school_review_handler.query_single_discipline_table)



/***
 * 步骤1-4      在步骤1-2的页面下， 给予学校管理员 一键查阅 或 部分查阅 的功能       user_fill表中 ，选中id的记录   is_seen : 0 --> 1
 * 
 */
router.post('/check-single-discipline-current', school_review_handler.check_single_discipline_current)


/***
 * 步骤1-5      在步骤1-4的页面下，删除该页面展示这次填报的所有数据！    即，删除当前周期 该学科、该表的数据 。   user_fill表中，选中id的记录    flag ：1-->0   is_delete : 0 -->1   
 */
router.post('/delete-single-discipline-table', school_review_handler.delete_single_discipline_table)


// 审核6个文档的接口
router.get('/review-download-filled-word', word_review_handler.review_download_filled_word)
router.get('/review-download-query-wordname', word_review_handler.review_download_query_wordname)


router.post('/check-word-discipline-current', school_review_handler.check_word_discipline_current)
router.post('/delete-word-discipline-table', school_review_handler.delete_word_discipline_table)



router.get('/export-all-discipline-table', school_review_handler.export_all_discipline_table, school_review_handler.download_all_data)



module.exports = router