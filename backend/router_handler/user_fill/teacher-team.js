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

// 3_1_1docx 
 
exports.honor_counts_word_sub = function (req, res) {
    user = req.user
    
    fil_id = '3_1_1docx'
    
    path_temp = req.body.path
    path_ora = '/root/syl_backend/temp_upload/' + path_temp

    try {
        if (fs.existsSync(path_ora) && path_temp!='') {
            path = path_ora.replace("temp_", "");
            console.log(path_ora)
            console.log(path)
            //file exists
            fs.rename(path_ora, path, function (err) {
                if (path_ora)
                    if (err) err = '上传失败，请稍后再试'
                fs.stat(path, function (err, stats) {
                    console.log('stats: ' + JSON.stringify(stats));
                    if (err) err = '上传失败，请稍后再试'
                });
            });
        
        }else {
            return res.cc("请先选择文件再点击提交")
        }
    } catch (err) {
        return res.cc('上传失败，请稍后再试')   
    }



    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_1_1docx' AND flag=1`)
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
            client.query(`insert into user_fill(id, user_id, fill_id,path) values('${user_fill_id}','${user.id}','3_1_1docx','${path}')`, function (err, result) {
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
 * 表3-1-1 学科入选国家优秀教师先进典型 情况处理函数   pass
 * @param {*} req 
 * @param {*} res 
 */
 exports.honor_counts_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_3_1_1
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_1_1' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO tch_moral(id, univ_code, discipline_code, yr, tch_name, recogn_honor,user_fill_id) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}',${submit_info[i].yr},
        '${submit_info[i].tch_name}','${submit_info[i].recogn_honor}','${user_fill_id}')`

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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_1_1',1)`, function (err, result) {
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
 * 表3-2-1 学科主要方向、学科带头人及中青年学术骨干清单 情况处理函数  pass
 * @param {*} req 
 * @param {*} res
 */
 exports.subject_counts_sub = function(req,res){

    // 接收表单数据
    const submit_info = req.body.data_3_2_1
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_2_1' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO leader_youthcore(id, univ_code, discipline_code,user_fill_id,tch_name,tch_type,tch_title,age,rep_work,discipline) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}','${submit_info[i].tch_name}','${submit_info[i].tch_type}','${submit_info[i].tch_title}',${submit_info[i].age},'${submit_info[i].rep_work}','${submit_info[i].discipline}')`

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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_2_1',1)`, function (err, result) {
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
 * 表3-2-2-0 高层次人才及团队存量清单 情况处理函数   pass
 * @param {*} req 
 * @param {*} res
 */
 exports.all_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_2_2_0
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_2_2_0' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO talent_team(id, univ_code, discipline_code,user_fill_id,talent_team_name,level,honor_name,yr) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}','${submit_info[i].talent_team_name}','${submit_info[i].level}','${submit_info[i].honor_name}',${submit_info[i].yr})`

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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_2_2_0',1)`, function (err, result) {
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
 * 表3-2-2-1 国家级团队和学术领军人才（含青年人才）清单 情况处理函数    pass
 * @param {*} req 
 * @param {*} res
 */
 exports.nation_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_2_2_1
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_2_2_1' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO talent_team(id, univ_code, discipline_code,user_fill_id,talent_team_name,level,honor_name,yr) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}','${submit_info[i].talent_team_name}','国家级','${submit_info[i].honor_name}',${submit_info[i].yr})`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_2_2_1',1)`, function (err, result) {
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
 * 表3-2-2-2 省重点人才清单 情况处理函数
 * @param {*} req 
 * @param {*} res
 */
 exports.province_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_2_2_2
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_2_2_2' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO talent_team(id, univ_code, discipline_code,user_fill_id,talent_team_name,level,honor_name,yr) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}','${submit_info[i].talent_team_name}','省级','${submit_info[i].honor_name}',${submit_info[i].yr})`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_2_2_2',1)`, function (err, result) {
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
 * 表3-2-3 学科专任教师数量及结构 情况处理函数    pass
 * @param {*} req 
 * @param {*} res
 */
 exports.number_struct_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_2_3
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_2_3' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO fulltch(id, univ_code, discipline_code,user_fill_id,yr, full_tch_num, ageblow25, age2535, age3645, 
        age4660, ageup60, senior, sub_senior, mid_grade, other_grade, phd, m_degree, b_degree) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}','${submit_info[i].yr}',${submit_info[i].full_tch_num},${submit_info[i].ageblow25},${submit_info[i].age2535},
        ${submit_info[i].age3645},${submit_info[i].age4660},${submit_info[i].ageup60},${submit_info[i].senior},${submit_info[i].sub_senior},${submit_info[i].mid_grade},${submit_info[i].other_grade},${submit_info[i].phd},${submit_info[i].m_degree},${submit_info[i].b_degree})`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_2_3',1)`, function (err, result) {
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
 * 表3-2-4 博士后和科研助理数量 情况处理函数   pass
 * @param {*} req 
 * @param {*} res
 */
 exports.assistant_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_2_4
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_2_4' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO pdoc_ra(id, univ_code, discipline_code,user_fill_id,yr,in_postdoc_sum,in_postdoc_newinc,out_postdoc_sum,
        out_postdoc_newinc,univ_ra_sum,univ_ra_newinc,inst_ra_sum,inst_ra_newinc,task_ra_sum, task_ra_newinc) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}',${submit_info[i].yr},${submit_info[i].in_postdoc_sum},${submit_info[i].in_postdoc_newinc},${submit_info[i].out_postdoc_sum},${submit_info[i].out_postdoc_newinc},
        ${submit_info[i].univ_ra_sum},${submit_info[i].univ_ra_newinc},${submit_info[i].inst_ra_sum},${submit_info[i].inst_ra_newinc},${submit_info[i].task_ra_sum},${submit_info[i].task_ra_newinc})`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_2_4',1)`, function (err, result) {
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
 * 表3-2-5 外籍专任教师数量及结构 情况处理函数   pass
 * @param {*} req 
 * @param {*} res
 */
 exports.foreign_teacher_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_2_5
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_2_5' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO foreign_fulltch(id, univ_code, discipline_code,user_fill_id,yr, sum_full_ftch, sum_high_title, lang_full_ftch, lang_high_title, prof_full_ftch, prof_high_title) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}',${submit_info[i].yr},${submit_info[i].sum_full_ftch},${submit_info[i].sum_high_title},
        ${submit_info[i].lang_full_ftch},${submit_info[i].lang_high_title},${submit_info[i].prof_full_ftch},${submit_info[i].prof_high_title})`
        // console.log(sqls[i])
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_2_5',1)`, function (err, result) {
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
 * 表3-3-1 教师担任国内外重要期刊负责人清单 情况处理函数    NO
 * @param {*} req 
 * @param {*} res
 */
 exports.journal_director_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_3_1
    // console.log(req.body)
    console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_3_1' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO tch_head_jour(id, univ_code, discipline_code,user_fill_id,tch_name,jour_name,in_jour_code,out_jour_code,jour_collect,pos,tenure) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}','${submit_info[i].tch_name}','${submit_info[i].jour_name}','${submit_info[i].in_jour_code}',
        '${submit_info[i].out_jour_code}','${submit_info[i].jour_collect}','${submit_info[i].pos}','${submit_info[i].tenure}')`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_3_1',1)`, function (err, result) {
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
 * 表3-3-2 教师在国内外重要学术组织任职主要负责人清单 情况处理函数   pass
 * @param {*} req 
 * @param {*} res
 */
 exports.conference_director_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_3_2
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_3_2' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO tch_head_acorg(id, univ_code, discipline_code,user_fill_id,tch_name,ac_org,pos,tenure) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}','${submit_info[i].tch_name}',
        '${submit_info[i].ac_org}','${submit_info[i].pos}','${submit_info[i].tenure}')`
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
            client.query(`insert into user_fill(id, user_id, fill_id, flag) values('${user_fill_id}','${user.id}','3_3_2',1)`, function (err, result) {
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
 * 表3-3-3 学科主要方向、学科带头人及中青年学术骨干清单 情况处理函数
 * @param {*} req 
 * @param {*} res
 */
 exports.conference_report_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_3_3
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_3_3' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO tch_attdrpt_acconf(id, univ_code, discipline_code,user_fill_id,yr,tch_name,conf_name,rpt_title,
            rpt_yr_mth,rpt_place) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}',${submit_info[i].yr},'${submit_info[i].tch_name}',
        '${submit_info[i].conf_name}','${submit_info[i].rpt_title}','${submit_info[i].rpt_yr_mth}','${submit_info[i].rpt_place}')`
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
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','3_3_3')`, function (err, result) {
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
 * 表3-3-4 学科主要方向、学科带头人及中青年学术骨干清单 情况处理函数
 * @param {*} req 
 * @param {*} res
 */
 exports.judges_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_3_3_4
    // console.log(submit_info)
    user = req.user
    var user_fill_id = uuidv4().replace(/-/g, '')

    var sqls = []
    sqls.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '3_3_4' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls[i+1] = `INSERT INTO tch_judge_comp(id, univ_code, discipline_code,user_fill_id,tch_name, comp_name, comp_yr_mth,pos) 
        VALUES ('${strUUID2}','${user.univ_code}','${user.discipline_code}','${user_fill_id}','${submit_info[i].tch_name}',
        '${submit_info[i].comp_name}','${submit_info[i].comp_yr_mth}','${submit_info[i].pos}')`
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
            client.query(`insert into user_fill(id, user_id, fill_id) values('${user_fill_id}','${user.id}','3_3_4')`, function (err, result) {
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
 *  二级表格下的表格是否可以填报
 *  */ 
 exports.query_is_time = function(req,res){
    // 1. 在fill表内根据fill_id检查flag（1在填报周期，0不在填报周期）
    // 2. 根据fill_id、user_id去user_fill表内查找flag，若为1则已经填报，若为0或者null则未填报
    // 接收表单数据
    const submit_info = req.body.id
    // console.log(submit_info)
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
                    // console.log(item);
                    client.query(item, function(err,results) {
                            count++
                            if (err) {
                                callback(err)
                            } else {
                                // 非NULL
                                if(results.rows.length!==0){
                                    // console.log(results.rows);
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
                        // console.log(err);
                        res.cc('系统繁忙，请稍后再试')
                    } else {
                        // console.log("======================");
                        // console.log(count);
                        // console.log(all_fill_period);
                        res.send({
                            menus: all_fill_period,
                        })
                    }
                }
            )
        }
    });
}
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
