const express = require('express')
const router = express.Router()

// 导入并使用平台首页 科学研究 路由处理函数对应的模块
const research_handler = require('../../router_handler/dis_detail/research')
const role_audit = require('../../schema/role_audit')
/**
 * 根路径添加：  /api/
 */


// 教师获国内外重要奖项情况  4-1-1  '国家级奖项', '省部级奖项'
router.post('/gov-detail-4-award', role_audit.is_gov_or_school, research_handler.gov_detail_4_award)


// 教师在国内外重要期刊发表论文  4-1-3   "['国内外顶级期刊', '国内外重要期刊', '其他重要期刊'],",
router.post('/gov-detail-4-paper', role_audit.is_gov_or_school, research_handler.gov_detail_4_paper)


// 科研创新平台建设情况  4-2-1   ['国家级平台', '省部级平台']
router.post('/gov-detail-4-platform', role_audit.is_gov_or_school, research_handler.gov_detail_4_platform)


// 学科主持科研项目情况  4-2-2   ['国家重点重大项目', '国家一般项目', '省级重点重大项目']
router.post('/gov-detail-4-hold', role_audit.is_gov_or_school, research_handler.gov_detail_4_hold)


// 参与国内外标准指定项目数  4-3-1   ['2021年第一季度', '2021年第二季度', '2021年第三季度', '2021年第四季度']
router.post('/gov-detail-4-project', role_audit.is_gov_or_school, research_handler.gov_detail_4_project)


// 参与国际论文合作数量  4-3-2   ['2021年第一季度', '2021年第二季度', '2021年第三季度', '2021年第四季度']
router.post('/gov-detail-4-copaper', role_audit.is_gov_or_school, research_handler.gov_detail_4_copaper)


// 3个数字  4-1-2   4-1-4  4-2-4   ['开出版专著', '承担国内外重大设计', '主办学术期刊']
router.post('/gov-detail-4-number', role_audit.is_gov_or_school, research_handler.gov_detail_4_number)






module.exports = router