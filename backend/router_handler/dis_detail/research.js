// 导入数据库操作模块
const client = require('../../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../../config')
// 导入uuid包
const { v4: uuidv4 } = require('uuid');
var async = require('async');
var fs = require('fs');


// 教师获国内外重要奖项情况  4-1-1  '国家级奖项', '省部级奖项'
exports.gov_detail_4_award = function (req, res) {

}


// 教师在国内外重要期刊发表论文  4-1-3   "['国内外顶级期刊', '国内外重要期刊', '其他重要期刊'],",
exports.gov_detail_4_paper = function (req, res) {

}

// 科研创新平台建设情况  4-2-1   ['国家级平台', '省部级平台']
exports.gov_detail_4_platform = function (req, res) {

}

// 学科主持科研项目情况  4-2-2   ['国家重点重大项目', '国家一般项目', '省级重点重大项目']
exports.gov_detail_4_hold = function (req, res) {

}

// 参与国内外标准指定项目数  4-3-1   ['2021年第一季度', '2021年第二季度', '2021年第三季度', '2021年第四季度']
exports.gov_detail_4_project = function (req, res) {

}

// 参与国际论文合作数量  4-3-2   ['2021年第一季度', '2021年第二季度', '2021年第三季度', '2021年第四季度']
exports.gov_detail_4_copaper = function (req, res) {

}

// 3个数字  4-1-2   4-1-4  4-2-4   ['开出版专著', '承担国内外重大设计', '主办学术期刊']
exports.gov_detail_4_number = function (req, res) {

}
