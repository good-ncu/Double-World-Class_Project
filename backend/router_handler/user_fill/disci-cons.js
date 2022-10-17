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
var fs = require('fs');
const { timeStamp } = require('console');

function toLiteral(str) {
    // var dict = { '\b': 'b', '\t': 't', '\n': 'n', '\v': 'v', '\f': 'f', '\r': 'r' };
    return str.replace(/(['])/g, function ($0, $1) {
        return '\'' + $1;
    });
}


/**
 * 文档1-1-1 学科建设进展情况写实 
 * @param {*} req 
 * @param {*} res 
 */
exports.progress_situation_sub = function (req, res) {
    user = req.user

    fil_id = '1_1_1'
    path_temp = req.body.path
    // 先判断前端传来的path数组有无字段，无则直接return
    if (path_temp.length == 0) {
        return res.cc("请先选择文件再点击提交！")
    }
    var path_ora = []
    var path = []
    // for循环， 每一个循环都是移动一个文件从temp_upload 到 upload文件
    for (let i = 0, len = path_temp.length; i < len; i++) {
        // path_ora[i] = '/root/syl_backend/temp_upload/' + path_temp[i]
        path_ora[i] = 'D:\\project\\temp_upload\\' + path_temp[i]

        try {
            if (fs.existsSync(path_ora[i]) && path_temp[i] != '') {
                path.push(path_ora[i].replace("temp_", ""))
                // console.log(path_ora[i])
                // console.log(path[i])
                // console.log("1111111111111111111111111111111111111111111111111")
                // console.log(path_ora[1])
                //file exists
                fs.rename(path_ora[i], path[i], function (err) {
                    if (path_ora[i])
                        if (err) err = '文件上传失败，请稍后再试'
                    fs.stat(path[i], function (err, stats) {
                        console.log('stats: ' + JSON.stringify(stats));
                        if (err) err = '文件上传失败，请稍后再试'
                    });
                });

            } else {
                return res.cc("您提交的第" + (i + 1) + "个文件不存在，请稍后再试")
            }
        } catch (err) {
            return res.cc('第' + (i + 1) + '个文件上传失败，请稍后再试')
        }
    }

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '1_1_1' AND flag=1`)
    const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    const user_fill_id = strUUID.replace(/-/g, '');       // 去掉-字符
    // sql2 = `insert into docx(id,discipline_code,univ_code,doc_about,discipline_eval_result,user_fill_id) values('${strUUID2}','${user.discipline_code}','${user.univ_code}',${submit_info[i].discipline_eval_turn},'${submit_info[i].discipline_eval_result}','${user_fill_id}')`

    async.eachSeries(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            // console.log(results.rows.length)
            if (err) {
                // 异常后调用callback并传入err
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else {
                if (results.rows.length !== 0 && results.rows[0].flag == 1) {
                    // 删除文件  没做 


                    err = "请勿重复提交!"
                }
                // 执行完成后也要调用callback，不需要参数
                if (err == "请勿重复提交!") {
                    callback(err)
                } else {
                    callback();
                }
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            return res.cc(err)
        } else {
            // 当前用户所填数据都成功后，说明当前周期对应的excel表已经填报完成， 则在user_fill插入一条记录，flag置为1， 说明该表
            client.query(`insert into user_fill(id, user_id, fill_id,path) values('${user_fill_id}','${user.id}','1_1_1','${path}')`, function (err, result) {
                if (err) return res.cc('填报错误,请稍后再试')
                if (result.rowCount !== 1) return res.cc('填报失败,请稍后再试')
                res.send({
                    status: 0,
                    message: "填报成功！！"
                })
                // console.log("SQL全部执行成功");
            })
        }
    })


}

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



    //  注意！！！！！      唯一性检测 1.push(`SELECT * FR ....  2. [i+1]   3. async.eachSeries  3
    var sqls_insert = []
    sqls_insert.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '1_1_2' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls_insert[i + 1] = (`insert into discipline_eval(id,discipline_code,univ_code,discipline_eval_turn,discipline_eval_result,user_fill_id) values('${strUUID2}','${user.discipline_code}','${user.univ_code}',${submit_info[i].discipline_eval_turn},'${submit_info[i].discipline_eval_result}','${user_fill_id}')`)
    }
    async.eachSeries(sqls_insert, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            // console.log(results.rows.length)
            if (err) {
                // 异常后调用callback并传入err
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else {

                if (results.rows.length !== 0 && results.rows[0].flag == 1) {
                    err = "请勿重复提交"
                }
                // 执行完成后也要调用callback，不需要参数
                if (err == "请勿重复提交") {
                    callback(err)
                } else {
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','1_1_2',1)`, function (err, result) {
                if (err) return res.cc('填报错误,请稍后再试')
                if (result.rowCount !== 1) return res.cc('填报失败,请稍后再试')
                res.send({
                    status: 0,
                    message: "填报成功！！"
                })
                // console.log("SQL全部执行成功");
            })
        }
    })

}





/**
 * 表1-1-3 学科影响力情况处理函数
 */
exports.disci_influence_sub = function (req, res) {
    // console.log(req.body);
    // 接收表单数据
    const submit_info = req.body.data_1_1_3
    // console.log(submit_info)
    // 获取token中的user信息
    user = req.user
    // 插入所有的数据都用同一个，与user_fill表的id相匹配
    var user_fill_id = uuidv4().replace(/-/g, '')





    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '1_1_3' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i + 1] = `INSERT INTO discipline_influ(id, univ_code, discipline_code, yr, rank_type, rank,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},'${toLiteral(submit_info[i].rank_type.toString())}','${toLiteral(submit_info[i].rank.toString())}','${user_fill_id}')`
    }
    // console.log(sqls)

    async.eachSeries(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            // console.log(results.rows.length)
            if (err) {
                // 系统级别错误   异常后调用callback并传入err
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else {
                if (results.rows.length !== 0 && results.rows[0].flag == 1) {
                    // 多次提交错误
                    err = "请勿重复提交"
                }
                // 执行完成后也要调用callback，不需要参数
                if (err == "请勿重复提交") {
                    callback(err)
                } else {
                    callback();
                }
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
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '1_1_4' AND flag=1`)
    console.log(submit_info.length);
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i + 1] = `INSERT INTO discipline_const_fund(id, univ_code, discipline_code, yr, total_fund, ctr_budg_fund,ctr_expend_fund,lcl_budg_fund,
            lcl_receive_fund,lcl_expend_fund,self_budg_fund,self_receive_fund,self_expend_fund,other_budg_fund,other_receive_fund,other_expend_fund,ctr_receive_fund,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}',
        '${user.discipline_code}',${submit_info[i].yr},${submit_info[i].total_fund},${submit_info[i].ctr_budg_fund},${submit_info[i].ctr_expend_fund},${submit_info[i].lcl_budg_fund},
        ${submit_info[i].lcl_receive_fund},${submit_info[i].lcl_expend_fund},${submit_info[i].self_budg_fund},${submit_info[i].self_receive_fund},${submit_info[i].self_expend_fund},
        ${submit_info[i].other_budg_fund},${submit_info[i].other_receive_fund},${submit_info[i].other_expend_fund},${submit_info[i].ctr_receive_fund},'${user_fill_id}')`
    }
    console.log(sqls);
    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            // console.log(results.rows.length)
            if (err) {
                // 异常后调用callback并传入err
                console.log(err.message);
                console.log("aaaaaaaaaaaaaaaaaaaa");
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else {
                if (results.rows.length !== 0 && results.rows[0].flag == 1) {
                    err = "请勿重复提交"
                }
                // 执行完成后也要调用callback，不需要参数
                if (err == "请勿重复提交") {
                    callback(err)
                } else {
                    callback();

                }


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

                if (err) {
                    console.log(err.message);
                    return res.cc('系统繁忙,请稍后再试')
                }
                if (result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
                res.send({
                    status: 0,
                    message: "填报成功！！"
                })
            })
        }
    });

}

// test 使用
// exports.new_disci_eval_situation_sub = function (req, res) {
//     // 接收表单数据
//     const submit_info = req.body.data_1_1_2
//     // 获取token中的user信息
//     user = req.user

//     // 插入所有的数据都用同一个，与user_fill表的id相匹配
//     var user_fill_id = uuidv4().replace(/-/g, '')
//     var sqls_insert = []
//     sqls_insert.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '1_1_2' AND flag=1`)
//     for (let i = 0, len = submit_info.length; i < len; i++) {
//         const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//         const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
//         sqls_insert[i + 1] = (`insert into discipline_eval(id,discipline_code,univ_code,discipline_eval_turn,discipline_eval_result,user_fill_id) values('${strUUID2}','${user.discipline_code}','${user.univ_code}',${submit_info[i].discipline_eval_turn},'${submit_info[i].discipline_eval_result}','${user_fill_id}')`)
//     }
//     //  ============================================================ 分界线=========================================================

//     // function数组，需要执行的任务列表，每个function都有一个参数callback函数并且要调用
//     var tasks = [function (callback) {
//         // 开启事务
//         client.beginTransaction(function (err) {
//             callback(err);
//         });
//     }, function (callback) {
//         async.eachSeries(sqls_insert, function (item, callback) {
//             // 遍历每条SQL并执行
//             client.query(item, function (err, results) {
//                 // console.log(results.rows.length)
//                 if (err) {
//                     // 异常后调用callback并传入err
//                     err = "系统错误，请刷新页面后重试"
//                     callback(err);
//                 } else {

//                     if (results.rows.length !== 0 && results.rows[0].flag == 1) {
//                         err = "请勿重复提交"
//                     }
//                     // 执行完成后也要调用callback，不需要参数
//                     if (err == "请勿重复提交") {
//                         callback(err)
//                     } else {
//                         callback();
//                     }
//                 }
//             });
//         }, function (err) {
//             // 所有SQL执行完成后回调
//             if (err) {
//                 return res.cc(err)
//             }
//         });
//     }, function (callback) {

//         client.query('insert into user_fill(id, user_id, fill_id) values(?,?,?)', [user_fill_id, user.id, '1_1_2'], function (err, result) {
//             callback(err);
//         });
//     }, function (callback) {
//         // 提交事务
//         client.commit(function (err) {
//             callback(err);
//         });
//     }];

//     async.series(tasks, function (err, results) {
//         if (err) {
//             console.log(err);
//             client.rollback(); // 发生错误事务回滚
//         }
//         client.end();
//     });


// }








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
        var t1 = submit_info[i] + '_%'
        sqls[i] = `select id,fill_about,flag,fill_cycle from fill where id like '${t1}'`
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
                resultt.push(results.rows)
                console.log(item + "执行成功");
                // 执行完成后也要调用callback，不需要参数
                callback();
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            // console.log(3);
            return res.cc('系统繁忙,请稍后再试')
        } else {
            // fill表内的记录
            var all_fill_period = resultt[0].map(function (item) {
                return {
                    id: item.id,
                    name: item.fill_about,
                    circle: item.fill_cycle,
                    target: "学科填报",
                    is_period: item.flag,
                    is_filled: ""
                }
            })
            console.log(all_fill_period);
            var sqls2 = []
            var temp = 0
            for (let i = 0, len = all_fill_period.length; i < len; i++) {
                sqls2[temp++] = (`select * from user_fill where user_id = '${userinfo.id}' and fill_id='${all_fill_period[i].id}'`)
            }
            // user_fill表内的记录
            // var all_user_fill = []
            var count = 0
            async.each(sqls2,
                function (item, callback) {
                    console.log("loulou");
                    console.log(item);
                    client.query(item, function (err, results) {
                        count++
                        if (err) {
                            callback(err)
                        } else {
                            // 非NULL
                            if (results.rows.length !== 0) {
                                console.log(results.rows);
                                // 只有一条记录
                                if (results.rows.length == 1) {
                                    all_fill_period[count - 1].is_filled = results.rows[0].flag
                                }
                                var c = 0
                                // 还可能存在多个记录，检索所有记录，是不是user_fill中的flag都为0
                                for (let i = 0, len = results.rows.length; i < len; i++) {
                                    if (results.rows[i].flag == 1) {
                                        c = 1
                                        break
                                    }
                                }
                                all_fill_period[count - 1].is_filled = c
                                // all_user_fill.push(results.rows[0])
                            } else {
                                all_fill_period[count - 1].is_filled = 0
                            }
                            callback()
                        }
                    })
                },
                function (err) {
                    if (err) {
                        console.log(err);
                        res.cc('系统繁忙，请稍后再试')
                    } else {
                        console.log("======================");
                        console.log(count);
                        console.log(all_fill_period);
                        res.send({
                            menus: all_fill_period,
                        })
                    }
                }
            )
        }
    });
}






/**
 * 该handler用于任意表格的空数据插入操作
 * 需要传入该张表的表id  如 2_2_2_1
 * @param {*} req 
 * @param {*} res 
 */
exports.fill_empty = function (req, res) {
    // 接收表单数据
    const fill_id = req.body.fill_id
    console.log('插入空数据的表id是' + fill_id)
    user = req.user
    // 插入所有的数据都用同一个，与user_fill表的id相匹配
    var user_fill_id = uuidv4().replace(/-/g, '')


    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '${fill_id}' AND flag=1`)
    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            // console.log(results.rows.length)
            if (err) {
                // 异常后调用callback并传入err
                console.log(err.message);
                console.log("出错了，系统即将奔溃");
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else {
                if (results.rows.length !== 0 && results.rows[0].flag == 1) {
                    err = "请勿重复提交"
                }
                // 执行完成后也要调用callback，不需要参数
                if (err == "请勿重复提交") {
                    callback(err)
                } else {
                    callback();

                }


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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','${fill_id}',1)`, function (err, result) {

                if (err) {
                    console.log(err.message);
                    return res.cc('系统繁忙,请稍后再试')
                }
                if (result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
                res.send({
                    status: 0,
                    message: "填报成功！！"
                })
            })
        }
    });

}