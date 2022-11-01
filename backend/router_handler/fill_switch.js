// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')
const async = require('async');

// 获取时间
function getDatetime() {
    var d = new Date();
    var year = d.getFullYear();
    var month = change(d.getMonth() + 1);
    var day = change(d.getDate());
    var hour = change(d.getHours());
    var minute = change(d.getMinutes());
    var second = change(d.getSeconds());

    function change(t) {
        if (t < 10) {
            return "0" + t;
        } else {
            return t;
        }
    }

    var time = year + '-' + month + '-' + day + ' '
        + hour + ':' + minute + ':' + second;

    return time;
}

// 表格填报状态查询
exports.fill_status = function (req, res) {

    user = req.user
    sql = `SELECT id,flag,fill_about,to_dbtable,fill_cycle as circle,op_time AS time
    FROM fill `
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



// 单一表格填报状态修改    从开启到关闭    
exports.status_change_close = function (req, res) {
    id = req.body.id
    user = req.user
    time = getDatetime()

    sql = `UPDATE fill set flag=0 ,op_time='${time}' where id ='${id}' `
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount !== 1) {
            // 当前sql查询为空，则返回填报提示
            res.cc('填报状态修改失败，请刷新页面重试！')
        } else {
            console.log("========status_change =========");
            res.send({
                status: 0,
                message: "表格填报周期已关闭！"
            })
        }
    });
}


// 单一表格填报状态修改    从关闭到开启    
exports.status_change_open = function (req, res) {
    id = req.body.id
    user = req.user
    time = getDatetime()
    sqls = []
    sqls.push(`UPDATE fill set flag=1 ,op_time='${time}',round = round+1 where id ='${id}'`)
    sql2 = `UPDATE user_fill set flag = 0 where fill_id = '${id}'`
    async.eachSeries(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            // console.log(results.rows.length)
            if (err) {
                // 异常后调用callback并传入err
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else {
                if (results.rowCount !== 1) {
                    err = "填报状态修改失败，请刷新页面重试！"
                }
                // 执行完成后也要调用callback，不需要参数
                else {
                    callback();
                }
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            return res.cc(err)
        } else {
            // 当当前用户所填数据都成功后，说明当前周期对应的excel表已经填报完成， 则在user_fill插入一条记录，flag置为1， 说明该表
            client.query(sql2, function (err, result) {
                if (err) return res.cc('填报状态修改失败，请刷新页面重试！！')
                res.send({
                    status: 0,
                    message: "表格填报周期已开启！"
                })
                // console.log("SQL全部执行成功");
            })
        }
    })
}




// 表格填报状态查询
exports.check_is_out = function (req, res) {
    user = req.user
    res.send({
        status: 0,
        message: "正常登录token"
    })
}