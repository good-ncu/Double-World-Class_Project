// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../config')
// 导入uuid包
const { v4: uuidv4 } = require('uuid');

const expressJWT = require('express-jwt')

const async = require('async');
const { query } = require('express');



/**
 * 表4-1-1-0 学科入选国家优秀教师先进典型 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.prize_counts_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_4_1_1_0
    console.log(submit_info)
    user = req.user

    var sqls = []
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO tch_award(id, univ_code, discipline_code, yr, tch_name, award_name,level,award_eval_org,award_eval_org_type,
            grade) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},
        '${submit_info[i].tch_name}','${submit_info[i].award_name}','${submit_info[i].level}','${submit_info[i].award_eval_org}','${submit_info[i].award_eval_org_type}','${submit_info[i].grade}')`
        console.log(sqls[i])
    }

    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // 异常后调用callback并传入err
                callback(err);
            }else if (results.rowCount !== 1){
                // 当前sql影响不为1，则错误
                err = item+"插入失败！"
                callback(err);
            }else{
                console.log(item + "执行成功");
                // 执行完成后也要调用callback，不需要参数
                callback();
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            res.send({
                status: 1,
                message: err
            })
        } else {
            res.send({
                status: 0,
                message: "填报成功！！"
            })
            console.log("SQL全部执行成功");
        }
    });


}