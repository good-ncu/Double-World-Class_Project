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
        var t1 = submit_info[i]+'_%'
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
            var all_fill_period = resultt[0].map(function(item) {
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
            var temp  = 0
            for(let i = 0,len = all_fill_period.length;i<len;i++){
                sqls2[temp++]=(`select * from user_fill where user_id = '${userinfo.id}' and fill_id='${all_fill_period[i].id}'`)
            }
            // user_fill表内的记录
            // var all_user_fill = []
            var count = 0 
            async.each(sqls2,
                function(item,callback){
                    console.log("loulou");
                    console.log(item);
                    client.query(item, function(err,results) {
                            count++
                            if (err) {
                                callback(err)
                            } else {
                                // 非NULL
                                if(results.rows.length!==0){
                                    console.log(results.rows);
                                    // 只有一条记录
                                    if(results.rows.length==1){
                                        all_fill_period[count-1].is_filled = results.rows[0].flag
                                    }
                                    var c = 0
                                    // 还可能存在多个记录，检索所有记录，是不是user_fill中的flag都为0
                                    for(let i = 0, len = results.rows.length; i < len; i++){
                                        if(results.rows[i].flag == 1){
                                            c=1
                                            break
                                        }
                                    }
                                    all_fill_period[count-1].is_filled = c
                                    // all_user_fill.push(results.rows[0])
                                } else {
                                    all_fill_period[count-1].is_filled = 0
                                }
                                callback()
                            }
                    })
                }, 
                function(err){
                    if(err){
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
            // return res.send({
            //     fill_status: resultt[0]
            // })
        /**
         * 旧代码 返回不能填报的表格
         * 
         */
        //     // sqls执行没有报错，
        //     var sqls2 = []
        //     console.log(resultt[0]);
        //     resultt = resultt[0]
        //     var count = 0 
        //     // 循环遍历上个查询结果时，可以顺便就把下个sql定义了
        //     // 临时变量，用于当作sqls2的移动下标，不宜直接在循环中用i作下标
        //     var temp = 0
        //     // 临时变量，用于当作real_result的移动下标，不宜直接在循环中用i作下标
        //     var temp_for_real_result = 0
        //     // 记录 无法填报的表格的id
        //     var real_result = []
        //     // 先检查填报周期，如果全部不在填报周期，就直接返回数据（所有按钮灰色）
        //     for(let i = 0,len = resultt.length;i<len;i++){
        //         if(resultt[i].flag===0){
        //             count++
        //             real_result[temp_for_real_result++] = resultt[i].id
        //             if(count===len){
        //                 return res.send({
        //                     result: resultt
        //                 })
        //             }
        //         }
        //         if(resultt[i].flag===1){
        //             // 存在处于填报周期的字段
        //             sqls2[temp]=(`select * from user_fill where user_id = '${userinfo.id}' and fill_id='${resultt[i].id}'`)
        //         }
        //     }
        //     console.log("===========================");
        //     console.log(real_result);
        //     console.log(sqls2);
        //     var resultt2 = []
        //     // 否则再依次检查flag为1的fill_id是否填报过
        //     async.each(sqls2,function(item,callback){
        //         client.query(item, function(err,results) {
        //             if (err) {
        //                 callback(err)
        //             } else {
        //                 // 非NULL
        //                 if(results.rows.length!==0){
        //                     resultt2.push(results.rows[0])
        //                 }
        //                 callback()
        //             }
        //         })
        //     }, function(err){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log(resultt2);
        //             for(let i = 0,len = resultt2.length;i<len;i++){
        //                 if(resultt2[i].flag===1){
        //                     // 记录无法填报的表格的id
        //                     real_result[temp_for_real_result++] = resultt2[i].fill_id
        //                 }
        //             }
        //             // 记录无法填报的表格的完整信息（id, name, cycle）
        //             var unable_fill_result = []
        //             var temp_unable_fill_result = 0
        //             for(let i = 0,len = resultt.length;i<len;i++){
        //                 if(real_result.includes(resultt[i].id)){
        //                     unable_fill_result[temp_unable_fill_result] = resultt[i]
        //                     // flag置空 避免误解
        //                     unable_fill_result[temp_unable_fill_result].flag = ''
        //                     temp_unable_fill_result++
        //                 }
        //             }
        //             res.send({
        //                 unable_fill: unable_fill_result
        //             })
        //         }
        //     })
        //     // res.send({
        //     //     result: resultt
        //     // })
        //     // console.log("SQL全部执行成功");
        }
    });
}

/**
 * 表4-1-1-0 教师获国内外奖项数及清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.teacher_prize_prize_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_1_1_0
    console.log(submit_info)
    user = req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '4_1_1_0' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO tch_award(id, univ_code, discipline_code, yr, tch_name, award_name,level,award_eval_org,award_eval_org_type,
            grade,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},
        '${submit_info[i].tch_name}','${submit_info[i].award_name}','${submit_info[i].level}','${submit_info[i].award_eval_org}','${submit_info[i].award_eval_org_type}','${submit_info[i].grade}','${user_fill_id}')`
        
    }
    console.log(sqls)
    async.eachSeries(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            console.log(results.rows.length)
            if (err) {
                // 异常后调用callback并传入err
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else {
                if (results.rows.length !== 0 && results.rows[0].flag == 1) {
                    console.log("test2");
                    err = "请勿重复提交"
                }
                // 执行完成后也要调用callback，不需要参数
                if (err == "请勿重复提交") {
                    console.log("test2");
                    callback(err)
                } else {
                    callback();
                }
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','4_1_1_0',1)`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-1-1-1 教师获国家级奖项数及清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.teacher_prize_nation_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_1_1_1
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO tch_award(id, univ_code, discipline_code, yr, award_name, tch_name, level, grade, award_eval_org, award_eval_org_type, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].award_name}', '${submit_info[i].tch_name}', '国家级', '${submit_info[i].grade}', '${submit_info[i].award_eval_org}', '${submit_info[i].award_eval_org_type}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_1_1_1')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-1-1-2 教师获省部级奖项数及清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.teacher_prize_province_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_1_1_2
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO tch_award(id, univ_code, discipline_code, yr, award_name, tch_name, level, grade, award_eval_org, award_eval_org_type, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].award_name}', '${submit_info[i].tch_name}', '省部级', '${submit_info[i].yr}', '${submit_info[i].grade}', '${submit_info[i].award_eval_org}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_1_1_2')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-1-2 教师公开出版的专著清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.teacher_prize_book_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_1_2
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO tch_monog(id, univ_code, discipline_code, yr, tch_name, monograph, publisher, publish_date, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].tch_name}', '${submit_info[i].monograph}', '${submit_info[i].publisher}', '${submit_info[i].publish_date}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_1_2')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-1-3-0 教师国内外期刊的论文存量 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.paper_list_all_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_1_3_0
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO tch_paper(id, univ_code, discipline_code, yr, paper_title, paper_au, jour_name, jour_level, yr_mth_volum, remarks, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].paper_title}', '${submit_info[i].paper_au}', '${submit_info[i].jour_name}', '${submit_info[i].jour_level}', '${submit_info[i].yr_mth_volum}', '${submit_info[i].remarks}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_1_3_0')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-1-3-1 教师国内外顶级期刊的论文存量 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.paper_list_top_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_1_3_1
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO tch_paper(id, univ_code, discipline_code, yr, quarter, paper_title, paper_au, jour_name, jour_level, yr_mth_volum, remarks, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', 
        '${submit_info[i].paper_title}', '${submit_info[i].paper_au}', '${submit_info[i].jour_name}', '${submit_info[i].jour_level}', '${submit_info[i].yr_mth_volum}', '${submit_info[i].remarks}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_1_3_1')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-1-3-2 教师国内外重要期刊的论文存量 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.paper_list_good_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_1_3_2
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO tch_paper(id, univ_code, discipline_code, yr, quarter, paper_title, paper_au, jour_name, jour_level, yr_mth_volum, remarks, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', 
        '${submit_info[i].paper_title}', '${submit_info[i].paper_au}', '${submit_info[i].jour_name}', '${submit_info[i].jour_level}', '${submit_info[i].yr_mth_volum}', '${submit_info[i].remarks}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_1_3_2')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-1-3-3 教师国内外其它期刊的论文存量 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.paper_list_other_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_1_3_3
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO tch_paper(id, univ_code, discipline_code, yr, quarter, paper_title, paper_au, jour_name, jour_level, yr_mth_volum, remarks, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', 
        '${submit_info[i].paper_title}', '${submit_info[i].paper_au}', '${submit_info[i].jour_name}', '${submit_info[i].jour_level}', '${submit_info[i].yr_mth_volum}', '${submit_info[i].remarks}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_1_3_3')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-1-4 承担国内重大设计与展演任务清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.design_display_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_1_4
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_1_4')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-1-0 科技创新平台建设存量及清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.innovate_platform_platform_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_1_0
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO sci_innova_plat(id, univ_code, discipline_code, yr, plat_name, palt_level, appro_time, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].plat_name}', '${submit_info[i].palt_level}', '${submit_info[i].appro_time}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_1_0')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-1-1 科技部国家级平台清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.innovate_platform_tech_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_1_1
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO sci_innova_plat(id, univ_code, discipline_code, yr, plat_name, palt_level, appro_time, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].plat_name}', '${submit_info[i].palt_level}', '${submit_info[i].appro_time}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_1_1')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-1-2 其它国家级平台清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.innovate_platform_nation_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_1_2
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO sci_innova_plat(id, univ_code, discipline_code, yr, plat_name, palt_level, appro_time, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].plat_name}', '${submit_info[i].palt_level}', '${submit_info[i].appro_time}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_1_2')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-1-3 省部级平台清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.innovate_platform_province_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_1_3
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO sci_innova_plat(id, univ_code, discipline_code, yr, plat_name, palt_level, appro_time, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].plat_name}', '${submit_info[i].palt_level}', '${submit_info[i].appro_time}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_1_3')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-2-0 主持科研项目存量及清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.project_list_project_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_2_0
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO host_sciproj(id, univ_code, discipline_code, yr, proj_name, proj_level, proj_type, proj_fromto_ymth, proj_fund, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].proj_name}', '${submit_info[i].proj_level}', '${submit_info[i].proj_type}', '${submit_info[i].proj_fromto_ymth}', ${submit_info[i].proj_fund}, NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_2_0')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-2-1 主持国家重点重大项目清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.project_list_top_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_2_1
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO host_sciproj(id, univ_code, discipline_code, yr, proj_name, proj_level, proj_type, proj_fromto_ymth, proj_fund, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].proj_name}', '国家级', '${submit_info[i].proj_type}', '${submit_info[i].proj_fromto_ymth}', ${submit_info[i].proj_fund}, NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_2_1')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-2-2 主持其它国家项目清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.project_list_nation_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_2_2
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO host_sciproj(id, univ_code, discipline_code, yr, proj_name, proj_level, proj_type, proj_fromto_ymth, proj_fund, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].proj_name}', '国家级', '${submit_info[i].proj_type}', '${submit_info[i].proj_fromto_ymth}', ${submit_info[i].proj_fund}, NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_2_2')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-2-3 主持省级重点重大项目清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.project_list_province_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_2_3
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO host_sciproj(id, univ_code, discipline_code, yr, proj_name, proj_level, proj_type, proj_fromto_ymth, proj_fund, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].proj_name}', '省级', '${submit_info[i].proj_type}', '${submit_info[i].proj_fromto_ymth}', ${submit_info[i].proj_fund}, NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_2_3')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-3-1 纵向到校科研经费数 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.funds_portrait_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_3_1
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO touniv_scifund(id, univ_code, discipline_code, yr, quarter, total_fund, subj_type, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', ${submit_info[i].total_fund}, '纵向', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_3_1')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-3-2 横向到校科研经费数 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.funds_transverse_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_3_2
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO touniv_scifund(id, univ_code, discipline_code, yr, quarter, total_fund, subj_type, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', ${submit_info[i].total_fund}, '横向', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_3_2')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-2-4 主办的学术期刊清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.hold_journals_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_2_4
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO host_acjour(id, univ_code, discipline_code, yr, jour_name, jour_in_num, jour_out_num, adopt, create_time, ac_influ, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].jour_name}', '${submit_info[i].jour_in_num}', '${submit_info[i].jour_out_num}', '${submit_info[i].adopt}', '${submit_info[i].create_time}', '${submit_info[i].ac_influ}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_2_4')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-3-1 参与国内外标准制定项目清单 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.international_influence_standard_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_3_1
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO mk_std(id, univ_code, discipline_code, yr, quarter, proj_name, proj_type, parti_type, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].proj_name}', '${submit_info[i].proj_type}', ' ${submit_info[i].parti_type}', NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_3_1')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
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
 * 表4-3-2 国际合作论文数量 情况处理函数
 * @param {*} req 
 * @param {*} res 
 */
 exports.international_influence_paper_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_4_3_2
    console.log(submit_info)
    user = req.user

    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        // sqls[i] = `INSERT INTO utk_desgshow(id, univ_code, discipline_code, yr, quarter, major_desg_or_show_name, parti_date, task, path, user_fill_id) 
        // VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', '${submit_info[i].major_desg_or_show_name}', '${submit_info[i].parti_date}', '${submit_info[i].task}', NULL, '${user_fill_id}');`
        sqls[i] = `INSERT INTO intnaco_paper(id, univ_code, discipline_code, yr, quarter, chn_nsci_num, chn_hss_num, for_nsci_num, for_hss_num, co_nsci_num, co_hss_num, path, user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}', ${submit_info[i].yr}, '${submit_info[i].quarter}', ${submit_info[i].chn_nsci_num}, ${submit_info[i].chn_hss_num}, ${submit_info[i].for_nsci_num}, ${submit_info[i].for_hss_num}, ${submit_info[i].co_nsci_num}, ${submit_info[i].co_hss_num}, NULL, '${user_fill_id}');`
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
            console.log(err.message);
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','4_3_2')`, function(err,result){
                if(err) return res.cc('系统繁忙,请稍后再试')
                if(result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
                res.send({
                    status: 0,
                    message: "填报成功！！"
                })
                console.log("SQL全部执行成功");
            })
        }
    });
}







