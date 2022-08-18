// 导入数据库操作模块
const client = require('../../db/index')


/**
 * 该handler用于学科用户填报完某张表后的  查看功能，
 * 需要传入该张表的信息  fill_id
 * @param {*} req 
 * @param {*} res 
 */
exports.query_single_table_info = function (req, res) {
    userinfo = req.user
    subinfo = req.body
    console.log(subinfo.fill_id)
    console.log(userinfo.id);

    // 拿到具体的数据库表名to_dbtable 以及 表中对应数据的  id  (改成user_fill_id)
    sql1 = `select user_fill.id AS user_fill_id , fill.to_dbtable AS to_dbtable
    from user_fill,fill 
    where user_fill.user_id = '${userinfo.id}' AND user_fill.fill_id = '${subinfo.fill_id}' AND fill.id='${subinfo.fill_id}' AND user_fill.flag = 1 AND user_fill.is_delete = 0`
    client.query(sql1, function (err, results) {
        if (err) {
            console.log(err.message)
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
            user_fill_id = results.rows[0].user_fill_id
            to_dbtable = results.rows[0].to_dbtable
            console.log(user_fill_id)
            console.log(to_dbtable)
            sql2 = `select * from ${to_dbtable} where user_fill_id = '${user_fill_id}' AND is_delete = 0`
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
                    res.send({
                        status: 1,
                        message: "该表格本周期您还未填报数据"
                    })
                } else {
                    for (var i = 0; i < results2.rows.length; i++) {
                        // results2.rows[i]["is_seen"] = null
                        // results2.rows[i]["is_delete"] = null
                        // results2.rows[i]["path"] = null
                        delete results2.rows[i]["is_seen"]
                        delete results2.rows[i]["is_delete"]
                        delete results2.rows[i]["path"]
                        delete results2.rows[i]["id"]
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