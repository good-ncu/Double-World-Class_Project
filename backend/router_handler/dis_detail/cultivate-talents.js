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
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
    sql = ''
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示           ========= 修改 标题上的注释抄下来
            res.cc("该校学科无教学成果奖的信息")
        } else {
            //   调试阶段可以 ============修改  gov_detail_2_award 
            console.log("========gov_detail_2_award   results_to_data: =========");
            console.log(results.rows);
            res.send({
                status: 0,
                // name: results.rows
                // ==============修改   返回前对照rap2 字段是否一致
                name: [
                    "国家教学成果奖",
                    "省级教学成果奖",
                    "研究生教育成果奖"
                ],
                value: [
                    220,
                    132,
                    101
                ]
            })
        }
    });

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


