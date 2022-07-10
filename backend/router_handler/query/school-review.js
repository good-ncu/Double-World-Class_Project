
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
 * 该function用于 学校对其下属学科填报用户初次填报后进行 审核
 * 
 *  任何一条数据 只有在 is_seen=1 ,is_delete=o 的状态下可用
 *  请注意：   填报用户初次提交的一组数据中，只要有一条数据有误，则全部打回重新填。 
 *          即 设置  is_seen=1 ,is_delete=1  flag=0  （其中flag是学校管理员当前打回的数据所在的表格记录置为0，意味着学科填报用户可再次填写该类型数据）
 * 
 * 最后，审核逻辑如下所示：
 * 学校管理员：1、先选择想要审批的学科；2、以填报的一组完整数据为单位，展示对应学科填报用户初次填报的数据
 * 
 * 
 */

/**
 * 第一步
 * 查找当前学校管理员所属学校拥有的所有学科
 * @param {*} req 
 * @param {*} res 
 */
exports.query_all_discipline = function (req,res){
    userinfo = req.user
    sql = `select * from univ_discipline where univ_code = '${userinfo.univ_code}'` 
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        }else if (results.rowCount == 0){
            // 当前sql查询为空，则返回填报提示
            res.send({
                status: 0,
                message: "还未录入您所在学校的学科信息"
            })
        }else{
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });
}

// /**
//  * 第二步
//  * 查询 学校管理员选择某一学科后，将当前周期下，该学科 所有已经填报了的表格，将其返回 处理函数
//  * @param {*} req 
//  * @param {*} res 
//  */ 
// exports.query_all_discipline_current = function(req,res){
    
//     userinfo = req.user
//     sql = `SELECT fill_id from user_fill where flag=1 and dic` 
//     client.query(sql, function (err, results) {
//         if (err) {
//             // 异常后调用callback并传入err
//             res.send({
//                 status: 1,
//                 message: err.message
//             })
//         }else if (results.rowCount == 0){
//             // 当前sql查询为空，则返回填报提示
//             res.send({
//                 status: 0,
//                 message: "当前周期下，您选择的学科还未录入任何有效信息。"
//             })
//         }else{
//             res.send({
//                 status: 0,
//                 data: results.rows
//             })
//         }
//     });
// }


/**
 * 第二步
 * 查询 学校管理员选择某一学科后，将当前周期下，该学科 所有已经填报了的表格，将其返回 处理函数
 * @param {*} req 
 * @param {*} res 
 */ 
 exports.query_all_discipline_current = function(req,res){
    
    userinfo = req.user
    discipline_code =req.body.discipline_code
    console.log(discipline_code)

    //  约束： 账户权限必须是3 ==> 学校id    拿到它选择的学科代码     
    sql = `SELECT user_fill.id,user_fill.fill_id,fill.fill_about,user_fill.is_seen from user_fill,fill 
    where user_fill.flag=1 and user_fill.fill_id=fill.id and 
    user_fill.user_id=(select user_info.id from user_info where 
        user_info.univ_code='${userinfo.univ_code}' and user_info.discipline_code='${discipline_code}' )`    //
    console.log(sql)
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        }else if (results.rowCount == 0){
            // 当前sql查询为空，则返回填报提示
            res.send({
                status: 0,
                message: "当前周期下，您选择的学科还未录入任何有效信息。"
            })
        }else{
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });
}


/**
 * 第三步
 * 查询 学校管理员选择某一学科当前周期下某个已经填报的表后，将该表的数据返回 处理函数
 * @param {*} req 
 * @param {*} res 
 */
exports.query_all_discipline_table = function(req,res){
    userinfo = req.user
    subinfo =req.body
    console.log(subinfo.id,subinfo.fill_id)

    var resultt=[]
    var sqls= []
    var to_dbtable
    sqls.push( `select to_dbtable from fill where id='${subinfo.fill_id}'`)
    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // 异常后调用callback并传入err
                callback(err);
            }else if (results.rowCount !== 1){
                // 当前sql影响不为1，则错误
                err = item+"查询失败"
                callback(err);
            }else{
                console.log(item + "执行成功");
                // 执行完成后也要调用callback，不需要参数   
                // 将查出的对应数据库表名进行保存
                resultt.push(results.rows[0])
                callback();
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            res.send({
                status: 1,
                message: err.message
            })
        } else {
            to_dbtable = resultt[0].to_dbtable
            sql2 = `select * from ${to_dbtable} where user_fill_id='${subinfo.id}'`
            client.query(sql2, function (err, results) {
                if (err) {
                    res.send({
                        status: 1,
                        message: err.message+"服务器错误，请稍后再试"
                    })
                }else if (results.rowCount == 0){
                    // 当前sql影响等于0，则错误
                    err = sql2+"查询失败"
                    res.send({
                        status: 1,
                        message: err
                    })
                }else{
                    console.log(sql2 + "执行成功")
                    // 将查询出的表的全部信息返回
                    res.send({
                        status: 0,
                        message: results.rows
                    })
                
                    // callback();
                }
            });
        }
    });



}