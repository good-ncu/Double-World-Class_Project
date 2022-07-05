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

// 学科评估情况处理函数 1-1-2（无唯一检测）
// exports.disci_eval_situation_sub = function (req, res) {
//     // 对 5、6轮的数据进行校验    （春波无法完成的情况编写）

//     // 接收表单数据
//     const submit_info = req.body.data_1_1_2
//     // 获取token中的user信息
//     user = req.user
//     for (let i = 0, len = submit_info.length; i < len; i++) {

//         const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//         const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符，使用空格代替
//         // 执行唯一性检验 
//         const unique_sql = `SELECT count(*) FROM discipline_eval WHERE discipline_code=${user.discipline_code} AND univ_code=${user.univ_code} AND discipline_eval_turn=${submit_info.discipline_eval_turn} `
//         // client.query(unique_sql,(err,results)=>{

//         // })

//         // 执行插入SQL
//         const sql = "insert into discipline_eval(discipline_code,univ_code,discipline_eval_turn,discipline_eval_result) values($1,$2,$3,$4)"
//         client.query(sql, [user.discipline_code, user.univ_code, submit_info[i].discipline_eval_turn, submit_info[i].discipline_eval_result], (err, results) => {
//             // 执行 SQL 语句失败
//             if (err) return res.send({ status: 1, message: err.message })
//             console.log("sql执行成功");
//             // SQL 语句执行成功，但影响行数不为 1
//             console.log(results.rowCount)
//             if (results.rowCount !== 1) {
//                 return res.send({ status: 1, message: '填报失败，请稍后再试！' })
//             }
//             // 填报成功

//         })

//     }
//     res.send({ status: 0, message: '填报成功' })
// }



/**
 * 表1-1-2 学科评估情况处理函数 （已完成）
 * @param {*} req 
 * @param {*} res 
 */
exports.disci_eval_situation_sub = function (req, res) {
    // 对 5、6轮的数据进行校验    （春波无法完成的情况编写）

    // 接收表单数据
    const submit_info = req.body.data_1_1_2
    // 获取token中的user信息
    user = req.user

   
    //开始唯一性检测
    var sqls = []
    for (let i = 0, len = submit_info.length; i < len; i++) {
        sqls[i]=(`SELECT * FROM discipline_eval WHERE discipline_code='${user.discipline_code}' AND univ_code='${user.univ_code}' AND discipline_eval_turn=${submit_info[i].discipline_eval_turn} `)
    }
    console.log(sqls)
    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (results.rows.length !==0) {
                // 异常后调用callback并传入err
                err="重复提交！"
                callback(err);
            } else {
                console.log(item + "唯一性检测无误");
                // 执行完成后也要调用callback，不需要参数
                callback();
            }
        });
    }, function (err) {
        // 所有唯一检测性SQL执行完成后回调
        if (err) {
            res.send({
                status : 1,
                message: "重复提交"
            })
        } else {

            //  注意！！！！！      上述唯一性检测没问题后，开始插入操作
            var sqls_insert = []
            for (let i = 0, len = submit_info.length; i < len; i++) {
               sqls_insert[i]=(`insert into discipline_eval(discipline_code,univ_code,discipline_eval_turn,discipline_eval_result) values('${user.discipline_code}','${user.univ_code}',${submit_info[i].discipline_eval_turn},'${submit_info[i].discipline_eval_result}')`)
            }
            console.log(sqls_insert)
            async.each(sqls_insert, function (item, callback) {
                // 遍历每条SQL并执行
                client.query(item, function (err, results) {
                    if (err) {
                        // 异常后调用callback并传入err
                        callback(err);
                    } else {
                        console.log(item + "插入完成");
                        // 执行完成后也要调用callback，不需要参数
                        callback();
                    }
                });
            }, function (err) {
                // 所有SQL执行完成后回调
                if (err) {
                   console.log(err)
                } else {
                    res.send({
                        status : 0,
                        message: "ok!!!!!"
                    })
                    console.log("SQL全部执行成功");
                }
            });
            
        }
    });


}


/**
 * 表1-1-3 学科影响力情况处理函数
 */
 exports.disci_influence_sub = function (req, res) {
    // 接收表单数据
    const submit_info = req.body.data_1_1_3
    console.log(submit_info)
    // 获取token中的user信息
    user = req.user
    
    var sqls = []
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO discipline_influ(id, univ_code, discipline_code, yr, rank_type, rank) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},'${submit_info[i].rank_type}',${submit_info[i].rank})`
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
 * 表1-1-4数据填报插入
 */
exports.disci_funds_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_1_1_4
    console.log(submit_info)
    user = req.user

    var sqls = []
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO discipline_const_fund(id, univ_code, discipline_code, yr, total_fund, ctr_budg_fund,ctr_expend_fund,lcl_budg_fund,
            lcl_receive_fund,lcl_expend_fund,self_budg_fund,self_receive_fund,self_expend_fund,other_budg_fund,other_receive_fund,other_expend_fund) 
        VALUES ('${strUUID2}','${user.univ_code}',
        '${user.discipline_code}',${submit_info[i].yr},${submit_info[i].total_fund},${submit_info[i].ctr_budg_fund},${submit_info[i].ctr_expend_fund},${submit_info[i].lcl_budg_fund},
        ${submit_info[i].lcl_receive_fund},${submit_info[i].lcl_expend_fund},${submit_info[i].self_budg_fund},${submit_info[i].self_receive_fund},${submit_info[i].self_expend_fund},
        ${submit_info[i].other_budg_fund},${submit_info[i].other_receive_fund},${submit_info[i].other_expend_fund})`
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








//     for (let i = 0, len = submit_info.length; i < len; i++) {
//         // const sql = "INSERT INTO discipline_influ(id, univ_code, discipline_code, year, rank_type, rank, flag, path) VALUES ($1, $2, $3, $4, $5, $6, NULL, NULL)"
       

//         // 执行SQL
//         client.query(sql, [strUUID2, user.univ_code, user.discipline_code, submit_info[i].year, submit_info[i].rank_type, submit_info[i].rank], (err, results) => {
//             // 执行 SQL 语句失败
//             if (err) return res.send({ status: 1, message: err.message })
//             console.log("disci_influence_sub sql执行成功");
//             // SQL 语句执行成功，但影响行数不为 1
//             // console.log(results.rowCount)
//             if (results.rowCount !== 1) {
//                 return res.send({ status: 1, message: '填报失败，请稍后再试！' })
//             }
//             // 填报成功

//         })

//     }
//     res.send({ status: 0, message: '填报成功' })





// // 查找 睡眠方法
// exports.query_is_time=function(req,res){
//     // 接收表单数据
//     const submit_info = req.body.id
//     // console.log(submit_info[0])
//     // console.log(submit_info.length)
//     var resultt=[]


//     for(let i=0,len=submit_info.length;i<len;i++){ 
//         const sql = `select flag,fill_cicle from fill_cicle where id = '${submit_info[i]}'`
//         client.query(sql,(err,results)=>{
//             // 执行 SQL 语句失败
//             if (err) return res.send({ status: 1, message: err.message })

//             console.log("sql执行成功");
//             // SQL 语句执行成功，但影响行数不为 1
//             console.log(results.rowCount)

//             if (results.rows.length ==0) {
//                 return res.send({ status: 1, message: '填报周期查询失败，请稍后再试！' })
//             }
//             resultt[i]=results.rows[0]  
//         })
//     }

//     setTimeout(function() {
//         res.send({
//             result : resultt
//         })
//     }, 3000)
// }

// 查找填报周期  （已完成）
exports.query_is_time = function (req, res) {
    // 接收表单数据
    const submit_info = req.body.id
    // console.log(submit_info[0])
    // console.log(submit_info.length)
    var resultt = []
    var sqls = []
    for (let i = 0, len = submit_info.length; i < len; i++) {
        sqls[i] = `select id,flag,fill_cicle from fill_cicle where id = '${submit_info[i]}'`
    }

    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // 异常后调用callback并传入err
                callback(err);
            } else {
                resultt.push(results.rows[0])
                console.log(item + "执行成功");
                // 执行完成后也要调用callback，不需要参数
                callback();
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            console.log(err);
        } else {
            res.send({
                result: resultt
            })
            console.log("SQL全部执行成功");
        }
    });

}

