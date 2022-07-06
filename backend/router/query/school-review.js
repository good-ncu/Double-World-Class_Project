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
 
 
/* 
    查询 当前学校拥有的所有学科 路由
*/
router.post('/query-all-discipline', school_review_handler.query_all_discipline)


/* 
    查询 学校管理员选择某一学科后， 将所有信息按照 表格的形式展现出来 路由
*/
router.post('/query-single-discipline-info', school_review_handler.query_single_discipline_info)

module.exports = router