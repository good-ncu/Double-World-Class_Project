// 导入数据库操作模块
const client = require('../../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../../config')
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
    // 插入所有的数据都用同一个，与user_fill表的id相匹配
    var user_fill_id = uuidv4().replace(/-/g, '')

    //开始唯一性检测
    var sqls = []
    for (let i = 0, len = submit_info.length; i < len; i++) {
        sqls[i] = (`SELECT * FROM discipline_eval WHERE discipline_code='${user.discipline_code}' AND univ_code='${user.univ_code}' AND discipline_eval_turn=${submit_info[i].discipline_eval_turn} `)
    }
    console.log(sqls)
    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (results.rows.length !== 0) {
                // 异常后调用callback并传入err
                err = "请勿重复提交"
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
                status: 1,
                message: "请勿重复提交"
            })
        } else {

            //  注意！！！！！      上述唯一性检测没问题后，开始插入操作
            var sqls_insert = []
            for (let i = 0, len = submit_info.length; i < len; i++) {
                const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
                const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
                sqls_insert[i] = (`insert into discipline_eval(id,discipline_code,univ_code,discipline_eval_turn,discipline_eval_result,user_fill_id) values('${strUUID2}','${user.discipline_code}','${user.univ_code}',${submit_info[i].discipline_eval_turn},'${submit_info[i].discipline_eval_result}','${user_fill_id}')`)
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
                    return res.cc('系统繁忙,请稍后再试')
                } else {
                    // 当当前用户所填数据都成功后，说明当前周期对应的excel表已经填报完成， 则在user_fill插入一条记录，flag置为1， 说明该表
                    client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','1_1_2',1)`, function (err, result) {
                        if (err) return res.cc('填报错误,请稍后再试')
                        if (result.rowCount !== 1) return res.cc('填报失败,请稍后再试')
                        res.send({
                            status: 0,
                            message: "填报成功！！"
                        })
                        console.log("SQL全部执行成功");
                    })
                }
            });

        }
    });


}


/**
 * 表1-1-3 学科影响力情况处理函数
 */
exports.disci_influence_sub = function (req, res) {
    console.log(req.body);
    // 接收表单数据
    const submit_info = req.body.data_1_1_3
    console.log(submit_info)
    // 获取token中的user信息
    user = req.user
    // 插入所有的数据都用同一个，与user_fill表的id相匹配
    var user_fill_id = uuidv4().replace(/-/g, '')


    var sqls = []
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO discipline_influ(id, univ_code, discipline_code, yr, rank_type, rank,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},'${submit_info[i].rank_type}',${submit_info[i].rank},'${user_fill_id}')`
    }

    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // 异常后调用callback并传入err
                callback(err);
            } else if (results.rowCount !== 1) {
                // 当前sql影响不为1，则错误
                err = item + "插入失败！"
                callback(err);
            } else {
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','1_1_3',1)`, function (err, result) {
                if (err) return res.cc('系统繁忙,请稍后再试')
                if (result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
                res.send({
                    status: 0,
                    message: "填报成功！！"
                })
                console.log("SQL全部执行成功");
            })
        }
    });

}



/**
 * 表1-1-4 本学科建设经费数额（万元） 情况处理函数

 */
exports.disci_funds_sub = function (req, res) {

    // 接收表单数据
    const submit_info = req.body.data_1_1_4
    console.log(submit_info)
    user = req.user
    // 插入所有的数据都用同一个，与user_fill表的id相匹配
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO discipline_const_fund(id, univ_code, discipline_code, yr, total_fund, ctr_budg_fund,ctr_expend_fund,lcl_budg_fund,
            lcl_receive_fund,lcl_expend_fund,self_budg_fund,self_receive_fund,self_expend_fund,other_budg_fund,other_receive_fund,other_expend_fund,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}',
        '${user.discipline_code}',${submit_info[i].yr},${submit_info[i].total_fund},${submit_info[i].ctr_budg_fund},${submit_info[i].ctr_expend_fund},${submit_info[i].lcl_budg_fund},
        ${submit_info[i].lcl_receive_fund},${submit_info[i].lcl_expend_fund},${submit_info[i].self_budg_fund},${submit_info[i].self_receive_fund},${submit_info[i].self_expend_fund},
        ${submit_info[i].other_budg_fund},${submit_info[i].other_receive_fund},${submit_info[i].other_expend_fund},'${user_fill_id}')`
        // console.log(sqls[i])
    }

    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // 异常后调用callback并传入err
                callback(err);
            } else if (results.rowCount !== 1) {
                // 当前sql影响不为1，则错误
                err = item + "插入失败！"
                callback(err);
            } else {
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','1_1_4',1)`, function (err, result) {
                if (err) return res.cc('系统繁忙,请稍后再试')
                if (result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
                res.send({
                    status: 0,
                    message: "填报成功！！"
                })
                console.log("SQL全部执行成功");
            })
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

/**
 *  二级表格下的表格是否可以填报
 *  */
exports.query_is_time = function (req, res) {
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
            for (let i = 0, len = resultt.length; i < len; i++) {
                if (resultt[i].flag == 0) {
                    count++
                    real_result[temp_for_real_result++] = resultt[i].id
                    if (count === len) {
                        return res.send({
                            result: resultt
                        })
                    }
                }
                if (resultt[i].flag === 1) {
                    // 存在处于填报周期的字段
                    sqls2[temp] = (`select * from user_fill where user_id = '${userinfo.id}' and fill_id='${resultt[i].id}'`)
                }
            }
            console.log("===========================");
            console.log(real_result);
            console.log(sqls2);
            var resultt2 = []
            // 否则再依次检查flag为1的fill_id是否填报过
            async.each(sqls2, function (item, callback) {
                client.query(item, function (err, results) {
                    if (err) {
                        callback(err)
                    } else {
                        // 非NULL
                        if (results.rows.length !== 0) {
                            resultt2.push(results.rows[0])
                        }
                        callback()
                    }
                })
            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(resultt2);
                    for (let i = 0, len = resultt2.length; i < len; i++) {
                        if (resultt2[i].flag === 1) {
                            // 记录无法填报的表格的id
                            real_result[temp_for_real_result++] = resultt2[i].fill_id
                        }
                    }
                    // 记录无法填报的表格的完整信息（id, name, cycle）
                    var unable_fill_result = []
                    var temp_unable_fill_result = 0
                    for (let i = 0, len = resultt.length; i < len; i++) {
                        if (real_result.includes(resultt[i].id)) {
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