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




// 教学成果奖 情况（2-2-1全部）      即 2-2-1-0到2-2-1-3
exports.gov_detail_2_award = function (req, res) {

}

// 人才培养基地  2-2-3的全部   即 2-2-3-0到2-2-3-2
exports.gov_detail_2_platform = function (req, res) {

}

// 硕博导师情况  2-2-4
exports.gov_detail_2_teacher = function (req, res) {

}


// 学生国内外竞赛获奖情况  2-2-6
exports.gov_detail_2_contest = function (req, res) {

}


// 学生发表代表性论文情况  2-2-7
exports.gov_detail_2_paper = function (req, res) {

}


// 学科毕业生结构  2-3-1
exports.gov_detail_2_graduate = function (req, res) {

}


// 学科留学生结构  2-4-1
exports.gov_detail_2_exchange = function (req, res) {

}



// 三个数字  "正教授","突出毕业生","学术报告人     2-4-2  ,  2-2-5  ,2-3-2 
exports.gov_detail_2_number = function (req, res) {

}


