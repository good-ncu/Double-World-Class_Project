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
            return res.cc('系统繁忙,请稍后再试')
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

/**
 * 填报思想政治教育特色与成效（2-1-1）
 *  */ 
exports.political_edu_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_2_1_1
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `insert into think_edu_proj(id, proj_type, proj_person, proj_year, univ_code, discipline_code, is_seen, path, user_fill_id) values('${strUUID2}','${submit_info[i].project_type}','${submit_info[i].project_person}','${submit_info[i].project_year}','${user.univ_code}','${user.discipline_code}',0,NULL,'${user_fill_id}')`
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
            return res.cc('系统繁忙,请稍后再试')
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','2_1_1',1)`, function(err,result){
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
 * 教学成果奖存量情况（2-2-1-0）
 *  */ 
exports.edu_awards_num_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_2_2_1_0
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO teaching_achv(id, award_level, award_type, award_date, award_ltype, tch_name, univ_code, discipline_code, is_seen, path, user_fill_id) values('${strUUID2}','${submit_info[i].award_level}','${submit_info[i].award_type}','${submit_info[i].award_date}','${submit_info[i].award_ltype}','${submit_info[i].tch_name}','${user.univ_code}','${user.discipline_code}',0,NULL,'${user_fill_id}')`
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
            return res.cc('系统繁忙,请稍后再试')
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','2_2_1_0',1)`, function(err,result){
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
 * 国家级教学成果奖情况（2-2-1-1） 
 */ 
exports.edu_awards_num_nation_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_2_2_1_1
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO teaching_achv(id, award_name,award_type, award_level, award_ltype, award_date, tch_name, univ_code, discipline_code, is_seen, path, user_fill_id) values('${strUUID2}','${submit_info[i].award_name}','${submit_info[i].award_type}','${submit_info[i].award_level}','国家级教学成果奖','${submit_info[i].award_date}','${submit_info[i].tch_name}','${user.univ_code}','${user.discipline_code}',0,NULL,'${user_fill_id}')`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','2_2_1_1',1)`, function(err,result){
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
 * 中国学位与研究生教育学会教育成果奖情况（2-2-1-2）
 */ 
exports.edu_awards_num_graduate_counts_sub = function(req,res){
    // 接收表单数据
    console.log(req.body);
    const submit_info = req.body.data_2_2_1_2
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO teaching_achv(id, award_level, award_type, award_name, award_date, award_ltype, tch_name, univ_code, discipline_code, is_seen, path,user_fill_id) values(
            '${strUUID2}','${submit_info[i].award_level}','${submit_info[i].award_type}','${submit_info[i].award_name}','${submit_info[i].award_date}','研究生教学成果奖','${submit_info[i].tch_name}','${user.univ_code}','${user.discipline_code}',0,NULL,'${user_fill_id}')`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${uuidv4().replace(/-/g,'')}','${user.id}','2_2_1_2',1)`, function(err,result){
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
 * 省级教育成果奖情况（2-2-1-3）
 */ 
exports.edu_awards_num_province_counts_sub = function(req,res){
    // 接收表单数据
    console.log(req.body);
    const submit_info = req.body.data_2_2_1_3
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO teaching_achv(id, award_level, award_type, award_name, award_date, award_ltype, tch_name, univ_code, discipline_code, is_seen, path,user_fill_id) values(
            '${strUUID2}','${submit_info[i].award_level}','${submit_info[i].award_type}','${submit_info[i].award_name}','${submit_info[i].award_date}','省级教育成果奖','${submit_info[i].tch_name}','${user.univ_code}','${user.discipline_code}',0,NULL,'${user_fill_id}')`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','2_2_1_3',1)`, function(err,result){
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
 * 出版教材质量（2-2-2-1）
 */ 
exports.major_class_publish_quality_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_2_2_2_1
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO publish_textbook(id, univ_code, discipline_code, textbook, au_or_tans, sig, publish_date, publisher, revision, textbook_using, remarks, is_seen, is_delete, path,user_fill_id) 
        VALUES ('${strUUID2}', '${user.univ_code}', '${user.discipline_code}', '${submit_info[i].textbook}', '${submit_info[i].au_or_tans}', '${submit_info[i].sig}', '${submit_info[i].publish_date}', '${submit_info[i].publisher}', ${submit_info[i].revision},'${submit_info[i].textbook_using}', '${submit_info[i].textbook_using}', 0, 0, NULL,'${user_fill_id}');`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','2_2_2_1',1)`, function(err,result){
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
 * 国家级一流课程建设情况（2-2-2-3）
 */ 
exports.major_class_nation_counts_sub = function(req,res){
    // 接收表单数据
    console.log(req.body);
    const submit_info = req.body.data_2_2_2_3
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO firstclass_course_const(id, univ_code, discipline_code, head_name, cour_name, cour_type, appro_year, cour_level, is_seen, is_delete, path, user_fill_id) 
        VALUES ('${strUUID2}', '${user.univ_code}', '${user.discipline_code}', '${submit_info[i].head_name}', '${submit_info[i].cour_name}', '${submit_info[i].cour_type}', ${submit_info[i].appro_year}, '国家级', 0, 0, NULL,'${user_fill_id}');`
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
                message: '系统繁忙,请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','2_2_2_3',1)`, function(err,result){
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
 * 省级一流课程建设情况（2-2-2-4）
 */ 
exports.major_class_province_counts_sub = function(req,res){
    // 接收表单数据
    console.log(req.body);
    const submit_info = req.body.data_2_2_2_4
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i] = `INSERT INTO firstclass_course_const(id, univ_code, discipline_code, head_name, cour_name, cour_type, appro_year, cour_level, is_seen, is_delete, path,user_fill_id) 
        VALUES ('${strUUID2}', '${user.univ_code}', '${user.discipline_code}', '${submit_info[i].head_name}', '${submit_info[i].cour_name}', '${submit_info[i].cour_type}', ${submit_info[i].appro_year}, '省级', 0, 0, NULL,'${user_fill_id}');`
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
            console.log(console.log(err.message));
            res.send({
                status: 1,
                message: '系统繁忙,请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','2_2_2_4',1)`, function(err,result){
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
 * 人才培养平台/基地建设存量情况（2-2-3-0）
 */ 
 exports.personnel_cultivate_platform_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_2_2_3_0
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i]= `INSERT INTO talent_platbase_const(id, univ_code, discipline_code, head_name, plat_base_level, plat_base_type, plat_base_name, yr, is_seen, is_delete, path,user_fill_id) 
        VALUES ('${strUUID2}', '${user.univ_code}', '${user.discipline_code}', '${submit_info[i].head_name}',NULL, '${submit_info[i].plat_base_type}', '${submit_info[i].plat_base_name}', '${submit_info[i].yr}', 0, 0, NULL,'${user_fill_id}');`
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
            console.log(console.log(err.message));
            res.send({
                status: 1,
                message: '系统繁忙,请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','2_2_3_0',1)`, function(err,result){
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
 * 国家级人才培养平台/基地建设存量情况（2-2-3-1）
 */ 
 exports.personnel_cultivate_nation_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_2_2_3_1
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    var sqls = []
    var user_fill_id = uuidv4().replace(/-/g, '')
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i]= `INSERT INTO talent_platbase_const(id, univ_code, discipline_code, head_name, plat_base_level, plat_base_type, plat_base_name, yr, is_seen, is_delete, path,user_fill_id) 
        VALUES ('${strUUID2}', '${user.univ_code}', '${user.discipline_code}', '${submit_info[i].head_name}','国家级', '${submit_info[i].plat_base_type}', '${submit_info[i].plat_base_name}', '${submit_info[i].yr}', 0, 0, NULL,'${user_fill_id}');`
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
            console.log(console.log(err.message));
            res.send({
                status: 1,
                message: '系统繁忙,请稍后再试'
            })
        } else {
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','2_2_3_1',1)`, function(err,result){
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
 * 省部级人才培养平台/基地建设存量情况（2-2-3-2）
 */ 
 exports.personnel_cultivate_province_counts_sub = function(req,res){

}

/**
 * 硕士导师和博士导师情况（2-2-4）
 */ 
 exports.master_doctoral_tutor_sub = function(req,res){

}
/**
 * 给本科生上课的正教授人数（2-2-5）
 */ 
 exports.professor_counts_sub = function(req,res){

}
/**
 * 本科生、硕士生、博士生（含留学生）国内外竞赛获奖项目清单（2-2-6）
 */ 
 exports.student_competition_sub = function(req,res){

}
/**
 * 本科生、硕士生、博士生（含留学生）发表的代表性论文清单（2-2-7）
 */ 
 exports.student_paper_sub = function(req,res){

}

/**
 * 年度授予学士、硕士、博士学位情况（2-3-1）
 */
exports.degree_counts_sub = function(req,res){

}

/**
 * 年度授予学士、硕士、博士学位情况（2-3-2）
 */
exports.discipline_pioneer_sub = function(req,res){

}

/**
 * 年度授予学士、硕士、博士学位情况（2-4-1）
 */
 exports.scholar_counts_sub = function(req,res){

}

/**
 * 本科生、硕士生、博士生参加本领域国内外重要学术会议并作报告人员清单（2-4-2）
 */
exports.conference_counts_sub = function(req,res){

}










