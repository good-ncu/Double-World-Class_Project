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
    console.log("=============");
    console.log(userinfo);
    for (let i = 0, len = submit_info.length; i < len; i++) {
        var t1 = submit_info[i]+'_%'
        sqls[i] = `select id,fill_about,flag,fill_cycle from fill where id like '${t1}'`
    }
    var is_more_query=0
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
            console.log(err);
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
                    is_filled: "",
                    more_query: "",
                    to_dbtable: "",
                    user_fill_id: ""
                }
            })
            // console.log(all_fill_period);
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
                    // console.log("loulou");
                    // console.log(item);
                    client.query(item, function(err,results) {
                            count++
                            console.log(count);
                            if (err) {
                                callback(err)
                            } else {
                                // 非NULL   0 1 2
                                if(results.rows.length!==0){
                                    // console.log(results.rows);
                                    // 只有一条记录
                                    if(results.rows.length==1){   // 1||0
                                        all_fill_period[count-1].is_filled = results.rows[0].flag
                                    }
                                    var c = 0
                                    var fill_id 
                                    var user_fill_id
                                    // 还可能存在多个记录，检索所有记录，是不是user_fill中的flag都为0
                                    for(let i = 0, len = results.rows.length; i < len; i++){
                                        if(results.rows[i].flag == 1){
                                            c=1
                                            fill_id = results.rows[i].fill_id
                                            user_fill_id = results.rows[i].user_fill_id
                                            all_fill_period[count-1].more_query = 1
                                            all_fill_period[count-1].user_fill_id = results.rows[i].id
                                            is_more_query = 1
                                            break
                                        }
                                    }
                                } else {  //0
                                    all_fill_period[count-1].is_filled = 0
                                }
                                console.log("333333333333333333333333");
                                callback()
                            }
                    })
                }, 
                function(err){
                    if(err){
                        console.log(err);
                        res.cc('系统繁忙，请稍后再试')
                    } else {
                        if(is_more_query==0){
                            return res.send({
                                menus: all_fill_period,
                            })
                        }
                        var sqls3=[]
                        var temp = 0
                        var temparr = []
                        for(let i=0; i< all_fill_period.length; i++){
                            if(all_fill_period[i].more_query==1){
                                temparr[temp]=i
                                sqls3[temp++] = `select * from fill where id = '${all_fill_period[i].id}'`
                            }
                        }
                        var count =0 
                        async.each(sqls3, function(item,callback){
                            client.query(item, function(err,results){
                                count++
                                if(err){
                                    callback(err)
                                } else {
                                    all_fill_period[temparr[count-1]].to_dbtable = results.rows[0].to_dbtable
                                    callback()
                                } 
                            })
                        },function(err){
                            if(err){
                                console.log(err);
                                return res.cc('系统繁忙，请稍后再试')
                            } else {
                                var sqls4 = []
                                var temp = 0
                                for(let i=0; i< all_fill_period.length; i++){
                                    if(all_fill_period[i].more_query==1){
                                        sqls4[temp++] = `select * from ${all_fill_period[i].to_dbtable} where user_fill_id = '${all_fill_period[i].user_fill_id}'`
                                    }
                                }
                                console.log(sqls4);
                                var count = 0
                                async.each(sqls4, function(item,callback){
                                    client.query(item,function(err,results){
                                        count++
                                        if(err){
                                            callback(err)
                                        }else{
                                            // 空数据，c=2
                                            if(results.rows.length==0){
                                                console.log("空数据！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！");
                                                c = 2 
                                            } else {
                                                c = 1
                                            }
                                            all_fill_period[temparr[count-1]].is_filled = c
                                            callback()
                                        }
                                    })
                                },function(err){
                                    if(err){
                                        console.log(err);
                                        return res.cc('系统繁忙，请稍后再试')
                                    } else {
                                        return res.send({
                                            menus: all_fill_period,
                                        })
                                    }
                                })
                            }
                        }
                        )
                    }
                }
                )
        }
    }       
    )
}



/**
 * 表5-1-1 成果转化到校金额 情况处理函数   pass
 * @param {*} req 
 * @param {*} res 
 */
 exports.get_funds_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_5_1_1
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '5_1_1' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO achv_to_univfund(id, univ_code, discipline_code, yr, quarter, achv_to_univfund,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},
        '${submit_info[i].quarter}',${submit_info[i].achv_to_univfund},'${user_fill_id}')`
    }

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
            // console.log(err.message)
            res.send({
                status: 1,
                message: err
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','5_1_1')`, function (err, result) {
                if (err) return res.cc('系统繁忙,请稍后再试')
                if (result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试')
                res.send({
                    status: 0,
                    message: "填报成功！！"
                })
                // console.log("SQL全部执行成功");
            })
        }
    });
}



/**
 * 表5-2-1-1 国家级产教融合平台建设数 情况处理函数   pass
 * @param {*} req 
 * @param {*} res 
 */
 exports.industry_nation_counts_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_5_2_1_1
    // console.log('=======================================')
    // console.log(submit_info)
    // console.log('++++++++++++++++++++++++++++++++++++++')
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '5_2_1_1' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO prodedu_plat(id, univ_code, discipline_code,yr, plat_name, plat_level, appro_date,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},
        '${submit_info[i].plat_name}','${submit_info[i].plat_level}','${submit_info[i].appro_date}','${user_fill_id}')`

    }

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
            // console.log(err.message)
            res.send({
                status: 1,
                message: err
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','5_2_1_1')`, function (err, result) {
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
 * 表5-2-1-2 省部级产教融合平台建设数 情况处理函数   pass
 * @param {*} req 
 * @param {*} res 
 */
 exports.industry_province_counts_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_5_2_1_2
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '5_2_1_2' AND flag=1`)

    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO prodedu_plat(id, univ_code, discipline_code,yr, plat_name, plat_level, appro_date,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},
        '${submit_info[i].plat_name}','${submit_info[i].plat_level}','${submit_info[i].appro_date}','${user_fill_id}')`
        console.log(sqls[i])
    }

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
            // console.log(err.message)
            res.send({
                status: 1,
                message: err
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','5_2_1_2')`, function (err, result) {
                if (err) return res.cc('系统繁忙,请稍后再试!!')
                if (result.rowCount !== 1) return res.cc('系统繁忙,请稍后再试!!!')
                res.send({
                    status: 0,
                    message: "填报成功！！"
                })

            })
        }
    });
}



/**
 * 表5-2-2-1 国家级咨政研究情况 情况处理函数   pass
 * @param {*} req 
 * @param {*} res 
 */
 exports.consultative_nation_counts_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_5_2_2_1
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '5_2_2_1' AND flag=1`)

    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO consult_policy(id, univ_code, discipline_code, yr, level, topic, adopt_leader, adopt_sit, adopt_date,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},
        '国家级','${submit_info[i].topic}','${submit_info[i].adopt_leader}','${submit_info[i].adopt_sit}','${submit_info[i].adopt_date}','${user_fill_id}')`

    }

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
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','5_2_2_1')`, function (err, result) {
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
 * 表5-2-2-2 省部级咨政研究情况 情况处理函数   pass
 * @param {*} req 
 * @param {*} res 
 */
 exports.consultative_province_counts_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_5_2_2_2
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '5_2_2_2' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO consult_policy(id, univ_code, discipline_code, yr, level, topic, adopt_leader, adopt_sit, adopt_date,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},
        '省部级','${submit_info[i].topic}','${submit_info[i].adopt_leader}','${submit_info[i].adopt_sit}','${submit_info[i].adopt_date}','${user_fill_id}')`
       
    }

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
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','5_2_2_2')`, function (err, result) {
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



 // 5_4_1      docx
 exports.kjxt_sub = function (req, res) {
    user = req.user
    
    fil_id = '5_4_1'
    
    path_temp = req.body.path
    // 先判断前端传来的path数组有无字段，无则直接return
    if (path_temp.length == 0){
        return res.cc("请先选择文件再点击提交！")
    }
    var path_ora = []
    var path = []
    // for循环， 每一个循环都是移动一个文件从temp_upload 到 upload文件
    for (let i = 0, len = path_temp.length; i < len; i++) {
        path_ora[i] = '/root/syl_backend/temp_upload/' + path_temp[i]
        // path_ora[i] = 'D:\\project\\temp_upload\\' + path_temp[i]

        try {
            if (fs.existsSync(path_ora[i]) && path_temp[i] != '') {
                path.push(path_ora[i].replace("temp_", ""))
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
                return res.cc("您提交的第"+(i+1)+"个文件不存在，请稍后再试")
            }
        } catch (err) {
            return res.cc('第'+(i+1)+'个文件上传失败，请稍后再试')
        }
    }


    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '5_4_1' AND flag=1`)
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
                    // 删除文件    没做


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
            client.query(`insert into user_fill(id, user_id, fill_id,path) values('${user_fill_id}','${user.id}','5_4_1','${path}')`, function (err, result) {
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



// 5_4_2      docx
exports.fwgj_sub = function (req, res) {
    user = req.user
    
    fil_id = '5_4_2'
    
    path_temp = req.body.path
    // 先判断前端传来的path数组有无字段，无则直接return
    if (path_temp.length == 0){
        return res.cc("请先选择文件再点击提交！")
    }
    var path_ora = []
    var path = []
    // for循环， 每一个循环都是移动一个文件从temp_upload 到 upload文件
    for (let i = 0, len = path_temp.length; i < len; i++) {
        path_ora[i] = '/root/syl_backend/temp_upload/' + path_temp[i]
        // path_ora[i] = 'D:\\project\\temp_upload\\' + path_temp[i]

        try {
            if (fs.existsSync(path_ora[i]) && path_temp[i] != '') {
                path.push(path_ora[i].replace("temp_", ""))
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
                return res.cc("您提交的第"+(i+1)+"个文件不存在，请稍后再试")
            }
        } catch (err) {
            return res.cc('第'+(i+1)+'个文件上传失败，请稍后再试')
        }
    }



    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '5_4_2' AND flag=1`)
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
                    // 删除文件   没做

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
            client.query(`insert into user_fill(id, user_id, fill_id,path) values('${user_fill_id}','${user.id}','5_4_2','${path}')`, function (err, result) {
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
