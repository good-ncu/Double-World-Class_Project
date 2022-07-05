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
 * 表3-1-1 学科入选国家优秀教师先进典型 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.honor_counts_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_3_1_1
    console.log(submit_info)
    user = req.user

    var sqls = []
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO tch_moral_const(id, univ_code, discipline_code, yr, tch_name, recogn_honor) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},
        '${submit_info[i].tch_name}','${submit_info[i].recogn_honor}')`
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























/**
 *  二级表格下的表格是否可以填报
 *  */ 
 exports.query_is_time = function(req,res){
    // 1. 在fill表内根据fill_id检查flag（1在填报周期，0不在填报周期）
    // 2. 根据fill_id、user_id去user_fill表内查找flag，若为1则已经填报，若为0或者null则未填报
    // 接收表单数据
    const submit_info = req.body.id
    console.log(submit_info)
    // console.log(submit_info.length)
    var resultt = []
    var sqls = []
    userinfo = req.user
    for (let i = 0, len = submit_info.length; i < len; i++) {
        sqls[i] = `select id,fill_about,flag,fill_cycle from fill where id = '${submit_info[i]}'`
    }
    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // console.log(1);
                // 异常后调用callback并传入err
                callback(err);
            } else {
                // console.log(2);
                resultt.push(results.rows[0])
                console.log(item + "执行成功");
                // 执行完成后也要调用callback，不需要参数
                callback();
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            // console.log(3);
            console.log(err);
        } else {
            // sqls执行没有报错，
            var sqls2 = []
            console.log(resultt);
            var count = 0 
            // 循环遍历上个查询结果时，可以顺便就把下个sql定义了
            // 临时变量，用于当作sqls2的移动下标，不宜直接在循环中用i作下标
            var temp = 0
            // 临时变量，用于当作real_result的移动下标，不宜直接在循环中用i作下标
            var temp_for_real_result = 0
            // 记录 无法填报的表格的id
            var real_result = []
            // 先检查填报周期，如果全部不在填报周期，就直接返回数据（所有按钮灰色）
            for(let i = 0,len = resultt.length;i<len;i++){
                if(resultt[i].flag===0){
                    count++
                    real_result[temp_for_real_result++] = resultt[i].id
                    if(count===len){
                        return res.send({
                            result: resultt
                        })
                    }
                }
                if(resultt[i].flag===1){
                    // 存在处于填报周期的字段
                    sqls2[temp]=(`select * from user_fill where user_id = '${userinfo.id}' and fill_id='${resultt[i].id}'`)
                }
            }
            console.log("===========================");
            console.log(real_result);
            console.log(sqls2);
            var resultt2 = []
            // 否则再依次检查flag为1的fill_id是否填报过
            async.each(sqls2,function(item,callback){
                client.query(item, function(err,results) {
                    if (err) {
                        callback(err)
                    } else {
                        // 非NULL
                        if(results.rows.length!==0){
                            resultt2.push(results.rows[0])
                        }
                        callback()
                    }
                })
            }, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log(resultt2);
                    for(let i = 0,len = resultt2.length;i<len;i++){
                        if(resultt2[i].flag===1){
                            // 记录无法填报的表格的id
                            real_result[temp_for_real_result++] = resultt2[i].fill_id
                        }
                    }
                    // 记录无法填报的表格的完整信息（id, name, cycle）
                    var unable_fill_result = []
                    var temp_unable_fill_result = 0
                    for(let i = 0,len = resultt.length;i<len;i++){
                        if(real_result.includes(resultt[i].id)){
                            unable_fill_result[temp_unable_fill_result] = resultt[i]
                            // flag置空 避免误解
                            unable_fill_result[temp_unable_fill_result].flag = ''
                            temp_unable_fill_result++
                        }
                    }
                    res.send({
                        unable_fill: unable_fill_result
                    })
                }
            })
            // res.send({
            //     result: resultt
            // })
            // console.log("SQL全部执行成功");
        }
    });
}