
// 导入数据库操作模块
const client = require('../../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../../config')
// 导入uuid包
const { v4: uuidv4 } = require('uuid');
var async = require('async');

/**
 * 该function用于 学校对其下属学科填报用户初次填报后进行 审核
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

/**
 * 查找当前学校管理员所属学校拥有的所有学科
 * @param {*} req 
 * @param {*} res 
 */
exports.query_all_discipline = function (req,res){
    userinfo = req.user
    sql = `select * from univ_discipline where univ_code = '${userinfo.univ_code}'` 
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        }else if (results.rowCount == 0){
            // 当前sql查询为空，则返回填报提示
            res.send({
                status: 0,
                message: "还未录入您所在学校的学科信息"
            })
        }else{
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });
}

/**
 * 查询 学校管理员选择某一学科后， 将所有信息按照 表格的形式展现出来 处理函数
 * @param {*} req 
 * @param {*} res 
 */ 
exports.query_single_discipline_info = function(req,res){



}