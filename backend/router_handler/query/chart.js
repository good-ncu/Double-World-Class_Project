// 导入数据库操作模块
const client = require('../../db/index')
// 省厅查看 学科评估情况
exports.discipline_eval_gov = function(req,res) {
    userinfo = req.user
    sql = `select discipline_eval_turn,discipline_eval_result,count(discipline_eval_result) from discipline_eval group by discipline_eval_result ,discipline_eval_turn`
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示
            res.send({
                status: 0,
                message: "该表格无信息"
            })
        } else {
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });

}

// 学校查看 学科评估情况
exports.discipline_eval_school = function(req,res) {
    res.send({
        mes:"03"
    })
}

// 学校查看 学科评估情况
exports.discipline_eval_discipline = function(req,res) {
    res.send({
        mes:"04"
    })
}