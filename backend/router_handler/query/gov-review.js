// 导入数据库操作模块
const client = require('../../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../../config')
// 导入uuid包
const { v4: uuidv4 } = require('uuid');
var async = require('async');

var Excel = require('exceljs'); // 引入模块
const { text } = require('express');
const fs = require('fs');
const urlencode = require('urlencode');
const { forEach } = require('jszip');


/**
 *
 * 省厅导出总表
 * @param {*} req   fill_id 表的id，   id （uuid）
 * @param {*} res 
 */
exports.export_all_discipline_table = function (req, res, next) {

    // var fill_id = req.body.fill_id
    // console.log('省厅导出的总表中包含几个表： ' + fill_id.length)
    // 存放 uuid  每个元素都是一个uuid数组
    var result_table_info = []
    fill_id = ["1_1_2", "1_1_3", "1_1_4", "2_1_1", "2_2_1_0",
        "2_2_1_1", "2_2_1_2", "2_2_1_3", "2_2_2_1", "2_2_2_3",
        "2_2_2_4", "2_2_3_0", "2_2_3_1", "2_2_3_2", "2_2_4", "2_2_5",
        "2_2_6", "2_2_7", "2_3_1", "2_3_2", "2_4_1", "2_4_2",
        "3_1_1", "3_2_1", "3_2_2_0", "3_2_2_1", "3_2_2_2", "3_2_2_3",
        "3_2_2_4", "3_2_3", "3_2_4", "3_2_5", "3_3_1", "3_3_2", "3_3_3",
        "3_3_4", "4_1_1_0", "4_1_1_1", "4_1_1_2", "4_1_2", "4_1_3_0",
        "4_1_3_1", "4_1_3_2", "4_1_3_3", "4_1_4", "4_2_1_0", "4_2_1_1",
        "4_2_1_2", "4_2_1_3", "4_2_2_0", "4_2_2_1", "4_2_2_2", "4_2_2_3",
        "4_2_3_1", "4_2_3_2", "4_2_4", "4_3_2", "4_3_1", "5_1_1", "5_2_1_1", "5_2_1_2",
        "5_2_2_1", "5_2_2_2"]
    //  sql_query 内放所有的查询语句
    var sql_query = []

    // var univ_name = []
    // var discipline_name = []

    var result_all_table_data = {}
    var sqls = []

    var univ_disc_index = 0

    fill_id.forEach(element => {
        sqls.push(`select 
        user_fill.id,
        fill_id,
        to_dbtable,
        user_info.univ_name,
        user_info.discipline_name,
        is_none
       from 
        user_fill 
       inner join fill 
        on user_fill.fill_id = fill.id
       inner join user_info 
        on user_fill.user_id = user_info.id
       where 
        user_fill.fill_id = '${element}' --参数

        and fill.fill_means != '文档'
        and user_fill.flag = 1
        and user_fill.is_delete = 0
        and user_fill.is_seen = 1    
        and user_info.univ_code !='99999'`)
    });
    //         and fill.flag = 0 --当前周期

    // 考虑and user_fill.is_seen = 1    是不是要加！

    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // 异常后调用callback并传入err
                callback(err);
            } else if (results.rowCount == 0) {
                // 当前sql影响不为1，则错误
                // err = item + `当前表格无数据可导出`
                // callback(err);
                callback()
            } else {
                console.log(item + "执行成功");
                // 执行完成后也要调用callback，不需要参数   

                // 将查出某个fill_id的对应数据库表名和拥有的id进行保存
                result_table_info.push(results.rows)

                // // 保存学校名
                // results.rows.forEach(element => {
                //     univ_name.push(element.univ_name)
                // })

                // // 保存学科名
                // results.rows.forEach(element => {
                //     discipline_name.push(element.discipline_name)
                // })


                var temp_fill_id = ''
                results.rows.forEach(element => {
                    temp_fill_id = temp_fill_id + `'${element.id}',`
                });
                temp_fill_id = temp_fill_id + `'zt_good'`
                sql_query.push(`select * from ${results.rows[0].to_dbtable} where user_fill_id in (${temp_fill_id}) and is_delete=0 ORDER BY univ_code,discipline_code ASC`)
                console.log("成功保存了sql_query~~~~~")
                callback();
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            console.error(err)
            res.cc(err)
        } else {
            // res.send({
            //     status: 0,
            //     message: result_table_info
            // })

            // result_table_info.forEach(element => {
            //     console.log(element)
            // });

            // 这个是作为指针 移动result_table_info的   给结果加上 1_1_1 这种作为key
            var index = 0
            async.each(sql_query, function (item, callback) {
                // 遍历每条SQL并执行
                client.query(item, function (err, results) {
                    if (err) {
                        // 异常后调用callback并传入err
                        callback(err);
                    }
                    else {
                        if (result_table_info[index][0].fill_id == "3_2_2_2") {
                            for (var i = 0; i < results.rows.length; i++) {
                                delete results.rows[i]["talent_or_team"]
                            }
                        }


                        // 给每条记录加上学校和学科名
                        // for (var i = 0; i < results.rows.length; i++) {
                        //     // console.log(index)
                        //     // console.log(result_table_info[0][0])
                        //     console.log(result_table_info[index][tem_index].univ_name)
                        //     results.rows[i].univ_name = result_table_info[index].univ_name
                        //     results.rows[i].discipline_name = result_table_info[index].discipline_name
                        //     tem_index = tem_index + 1
                        // }

                        // 给不同的key 添加 value    ,一一对应将每个表的数据都加入result_all_table_data数组中
                        result_all_table_data[result_table_info[index][0].fill_id] = results.rows

                        index = index + 1
                        callback();

                    }
                });
            }, function (err) {
                console.error(err)
                req.xx = result_all_table_data
                next()
            });
        }
    });
}


/**
 *
 * 省厅导出总表   下载excel
 * @param {*} req   fill_id 表的id，   id （uuid）
 * @param {*} res 
 */
exports.download_all_data = function (req, res) {
    nn1 = req.xx

    // res.send({
    //     status: 0,
    //     message: nn1
    // })

    // 读映射字典
    let rawdata = fs.readFileSync('/root/syl_backend/Double-World-Class_Project/backend/router_handler/query/dict.json');
    // 转json
    let dict = JSON.parse(rawdata);

    let univ_code = fs.readFileSync('/root/syl_backend/Double-World-Class_Project/backend/router_handler/query/univ_code.json');
    univ_code = JSON.parse(univ_code)[0];

    let discipline_code = fs.readFileSync('/root/syl_backend/Double-World-Class_Project/backend/router_handler/query/discipline_code.json');
    discipline_code = JSON.parse(discipline_code)[0];

    var workbook = new Excel.Workbook(); // 实例化Excel对象



    // 拿到数据的key
    nn_keys = Object.keys(nn1)
    for (var i = 0; i < nn_keys.length; i++) {
        // console.log(nn[keys[i]]); //keys[i]=1-1-2等表,data[keys[i]]为[]内容
        test(nn1[nn_keys[i]], nn_keys[i], dict, workbook, univ_code, discipline_code)
    }
    var temp_filename = uuidv4().replace(/-/g, '')
    temp_filename = '所有学校数据总表' + temp_filename
    path_n = `/root/syl_backend/taizhang/` + temp_filename + `.xlsx`
    workbook.xlsx.writeFile(path_n)
        .then(function () {

            res.writeHead(200, {
                'Access-Control-Expose-Headers': 'Authorization',
                'Content-Type': 'application/octet-stream;charset=utf8',
                'Content-Disposition': "attachment;filename*=UTF-8''" + urlencode(temp_filename + `.xlsx`)
            });
            var opt = {
                flags: 'r'
            };
            var stream = fs.createReadStream(path_n, opt);
            stream.pipe(res);
            stream.on('end', function () {
                res.end();
            });
            // res.send({
            //     status: 0,
            //     message: nn1
            // })

        });


}


function deal_data(data) {
    for (var i = 0; i < data.length; i++) {
        delete data[i].id
        // delete data[i].univ_code
        // delete data[i].discipline_code
        delete data[i].is_seen
        delete data[i].is_delete
        delete data[i].op_time
        delete data[i].user_fill_id
        delete data[i].path
    }
}
function test(data, head, dict, workbook, univ_code, discipline_code) {
    deal_data(data)         //删除json中多余的字段
    var headTitle
    var headData = []
    if (data.length != 0) {
        //中英文转换
        keys = Object.keys(data[0])     //拿到json数据对key值
        for (var i = 0; i < dict.length; i++) {
            if (dict[i]['table'] == head) {
                for (var key in dict[i]) {
                    if (key == 'table') {
                        continue
                    }
                    if (key == 'title') {
                        headTitle = dict[i][key]
                    }
                    else {
                        headData.push(dict[i][key])
                    }

                }
            }
        }
        let sheetName = workbook.addWorksheet(headTitle);  // 添加一个工作薄并命名为name参数
        // 之后调整页面设置配置
        sheetName.addRow(headData).alignment = {
            vertical: 'middle', horizontal: 'center'               //居中显示
        }; // 添加首行数据

        // 循环添加每行数据，将数据添加到Excel对各个工作薄中。
        for (let index = 0, valAry = []; index < data.length; index++) {
            val = data[index];
            valAry = [];
            keys.map(function (params) {
                if (typeof val[params] != "undefined") {
                    valAry.push(val[params]);
                } else {
                    valAry.push("");
                };
            });

            //这里修改,将学科、学校和代号对应
            valAry[0] = univ_code[valAry[0]]
            valAry[1] = discipline_code[valAry[1]]
            sheetName.addRow(valAry).alignment = {
                vertical: 'middle', horizontal: 'center'
            };
        };
    }
}






/**
 * 该handler用于 省厅查看！！！   当个表的  如1_1_1 当前周期的  
 * 需要传入该张表的信息  fill_id
 * @param {*} req 
 * @param {*} res 
 */
exports.query_single_table_info = function (req, res) {
    var userinfo = req.user
    var fill_id = req.body.fill_id
    var univ_name = req.body.univ_name
    var discipline_name = req.body.discipline_name

    console.log(fill_id)
    console.log(univ_name)
    console.log(discipline_name)

    // 拿到具体的数据库表名to_dbtable 以及 表中对应数据的  id  (改成user_fill_id)
    var sql1 = `select user_fill.id AS user_fill_id , fill.to_dbtable AS to_dbtable
    from user_fill,fill
    where user_fill.fill_id = ${fill_id} AND fill.id=${fill_id} AND user_fill.flag = 1 AND user_fill.is_delete = 0  AND user_fill.user_id = (SELECT user_info.id from user_info where user_info.univ_name = '${univ_name}' AND user_info.discipline_name = '${discipline_name}') `
    client.query(sql1, function (err, results) {
        if (err) {
            console.err(err)
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else if (results.rowCount == 0) {

            // 当前sql查询为空，则返回填报提示
            res.send({
                status: 1,
                message: "该表格本周期您还未填报数据!!"
            })
        } else {
            console.log(sql1)
            var user_fill_id = results.rows[0].user_fill_id
            var to_dbtable = results.rows[0].to_dbtable
            console.log(user_fill_id)
            console.log(to_dbtable)
            var sql2 = `select * from ${to_dbtable} where user_fill_id = '${user_fill_id}' AND is_delete = 0`
            client.query(sql2, function (err, results2) {
                if (err) {
                    console.log(err.message)
                    // 异常后调用callback并传入err
                    res.send({
                        status: 1,
                        message: '系统繁忙，请稍后再试'
                    })
                } else if (results.rowCount == 0) {
                    // 当前sql查询为空，则返回填报提示
                    return res.cc('该表格下无填报的数据')
                } else {
                    console.log(results2.rows);
                    for (var i = 0; i < results2.rows.length; i++) {
                        if (results2.rows[i]["adopt_date"] == 'undefined') {
                            results2.rows[i]["adopt_date"] = ""
                        }
                        // results2.rows[i]["is_seen"] = null
                        // results2.rows[i]["is_delete"] = null
                        // results2.rows[i]["path"] = null
                        delete results2.rows[i]["is_seen"]
                        delete results2.rows[i]["is_delete"]
                        delete results2.rows[i]["path"]
                        // delete results2.rows[i]["id"]
                        delete results2.rows[i]["op_time"]
                        delete results2.rows[i]["user_fill_id"]
                    }
                    res.send({
                        status: 0,
                        data: results2.rows
                    })
                }

            })
        }
    });


}









/**
 * 该handler用于 省厅查看！！！   各学科建设里面的查看所有累加！     最新的用query_single_table_info
 * 需要传入该张表的信息  fill_id
 * @param {*} req 
 * @param {*} res 
 */
exports.query_table_detail_info = function (req, res) {
    var userinfo = req.user
    var fill_id = req.body.fill_id
    var univ_name = req.body.univ_name
    var discipline_name = req.body.discipline_name

    console.log(fill_id)
    console.log(univ_name)
    console.log(discipline_name)


    // 拿到具体的数据库表名to_dbtable 以及 表中对应数据的  id  (改成user_fill_id)
    var sql1 = `SELECT 
    user_fill.id AS user_fill_id , 
    fill.to_dbtable AS to_dbtable
   FROM user_fill
   INNER JOIN fill
    ON fill.id = user_fill.fill_id
   WHERE fill.id IN (${fill_id}) 
    AND user_fill.is_delete = 0
    AND user_fill.is_seen = 1 
    AND user_fill.user_id = (SELECT user_info.id FROM user_info WHERE user_info.univ_name = '${univ_name}' AND user_info.discipline_name = '${discipline_name}')`

    client.query(sql1, function (err, results) {
        if (err) {
            console.err(err)
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: '系统繁忙，请稍后再试'
            })
        } else if (results.rowCount == 0) {

            // 当前sql查询为空，则返回填报提示
            res.send({
                status: 1,
                message: "该表格无相关填报记录!!"
            })
        } else {
            console.log(sql1)
            // var user_fill_id = results.rows[0].user_fill_id
            var temp_fill_id = ''
            results.rows.forEach(element => {
                temp_fill_id = temp_fill_id + `'${element.user_fill_id}',`
            });
            temp_fill_id = temp_fill_id + `'zt_good'`

            var to_dbtable = results.rows[0].to_dbtable
            // var to_dbtable = ''
            // results.rows.forEach(element => {
            //     to_dbtable = to_dbtable + `${element.id},`
            // });
            // to_dbtable = to_dbtable.substring(0, to_dbtable.length - 1);  // 去掉最后一个 , 
            console.log(temp_fill_id)
            console.log(to_dbtable)
            if (fill_id == "'3_2_2_0','3_2_2_1','3_2_2_3','3_2_2_4'") {
                var sql2 = `SELECT
                talent_team.talent_or_team,
                talent_team.talent_team_name,
                talent_team.level,
                talent_team.honor_name,
                talent_team.yr
            FROM
                talent_team
            INNER JOIN user_fill
                ON talent_team.user_fill_id = user_fill.id
            INNER JOIN user_info
                ON talent_team.univ_code = user_info.univ_code
                AND talent_team.discipline_code = user_info.discipline_code
            WHERE
                user_fill.is_seen = 1
                AND user_fill.is_delete = 0
                AND talent_team.is_delete = 0
                AND talent_team.level = '国家级'
                AND user_info.univ_name= '${univ_name}'  --参数
                AND user_info.discipline_name='${discipline_name}' --参数
            ORDER BY talent_or_team ASC, yr DESC`
            } else if (fill_id == "'3_2_2_2','3_2_2_3'") {
                var sql2 = `SELECT
                talent_team.talent_team_name,
                talent_team.level,
                talent_team.honor_name,
                talent_team.yr
            FROM
                talent_team
            INNER JOIN user_fill
                ON talent_team.user_fill_id = user_fill.id
            INNER JOIN user_info
                ON talent_team.univ_code = user_info.univ_code
                AND talent_team.discipline_code = user_info.discipline_code
            WHERE
                user_fill.is_seen = 1
                AND user_fill.is_delete = 0
                AND talent_team.is_delete = 0
                AND talent_team.talent_or_team = '人才'
                AND talent_team.level = '省级'
                AND user_info.univ_name= '${univ_name}'  --参数
                AND user_info.discipline_name='${discipline_name}' --参数
            ORDER BY talent_or_team ASC, yr DESC`
            } else if (fill_id == "'5_2_2_1'") {
                var sql2 = `SELECT
                consult_policy.yr,
                consult_policy.level,
                consult_policy.topic,
                consult_policy.adopt_leader,
                consult_policy.adopt_sit,
                consult_policy.adopt_date
            FROM
                consult_policy
            INNER JOIN user_fill
                ON consult_policy.user_fill_id = user_fill.id
            INNER JOIN user_info
                ON consult_policy.univ_code = user_info.univ_code
                AND consult_policy.discipline_code = user_info.discipline_code
            WHERE
                user_fill.is_seen = 1
                AND user_fill.is_delete = 0
                AND consult_policy.is_delete = 0
                AND consult_policy.adopt_sit = '已采纳'
                AND consult_policy.level = '国家级'
                AND user_info.univ_name= '${univ_name}'  --参数
                AND user_info.discipline_name='${discipline_name}' --参数
            ORDER BY yr DESC`
            } else if (fill_id == "'5_2_2_2'") {
                var sql2 = `SELECT
                consult_policy.yr,
                consult_policy.level,
                consult_policy.topic,
                consult_policy.adopt_leader,
                consult_policy.adopt_sit,
                consult_policy.adopt_date
            FROM
                consult_policy
            INNER JOIN user_fill
                ON consult_policy.user_fill_id = user_fill.id
            INNER JOIN user_info
                ON consult_policy.univ_code = user_info.univ_code
                AND consult_policy.discipline_code = user_info.discipline_code
            WHERE
                user_fill.is_seen = 1
                AND user_fill.is_delete = 0
                AND consult_policy.is_delete = 0
                AND consult_policy.adopt_sit = '已采纳'
                AND consult_policy.level = '省部级'
                AND user_info.univ_name= '${univ_name}'  --参数
                AND user_info.discipline_name='${discipline_name}' --参数
            ORDER BY yr DESC`
            } else {
                var sql2 = `SELECT * FROM ${to_dbtable}
                INNER JOIN user_fill
                 ON ${to_dbtable}.user_fill_id = user_fill.id
                WHERE ${to_dbtable}.user_fill_id in(${temp_fill_id})
                 AND ${to_dbtable}.is_delete = 0`
            }
            console.log(sql2)
            client.query(sql2, function (err, results2) {
                if (err) {
                    console.log(err.message)
                    // 异常后调用callback并传入err
                    res.send({
                        status: 1,
                        message: '系统繁忙，请稍后再试'
                    })
                } else if (results.rowCount == 0) {
                    // 空则返回空数组
                    res.send({
                        status: 0,
                        data: []
                    })
                } else {
                    console.log(results2.rows);
                    for (var i = 0; i < results2.rows.length; i++) {
                        if (results2.rows[i]["adopt_date"] == 'undefined') {
                            results2.rows[i]["adopt_date"] = ""
                        }
                        // results2.rows[i]["is_seen"] = null
                        // results2.rows[i]["is_delete"] = null
                        // results2.rows[i]["path"] = null
                        delete results2.rows[i]["is_seen"]
                        delete results2.rows[i]["is_delete"]
                        delete results2.rows[i]["path"]
                        // delete results2.rows[i]["id"]
                        delete results2.rows[i]["op_time"]
                        delete results2.rows[i]["user_fill_id"]
                    }
                    res.send({
                        status: 0,
                        data: results2.rows
                    })
                }

            })
        }
    });


}