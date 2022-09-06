// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 导入生成随机UUID
const uuid = require('uuid')



// 表格填报状态查询
exports.fill_status = function (req, res) {

    user = req.user
    sql = `SELECT id,flag,fill_about,to_dbtable FROM fill`
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        } else {
            console.log("========fill_switch_status =========");
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });
}