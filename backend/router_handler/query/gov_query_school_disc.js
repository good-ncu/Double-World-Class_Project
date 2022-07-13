
// 导入数据库操作模块
const client = require('../../db/index')
// 省厅查看 第四、五、六学科评估情况 （柱状图对比数据）
exports.gov_query_school_disc = function(req,res) {
    userinfo = req.user
    sql = `SELECT tag.subtag_name,univ_discipline.univ_code,univ_discipline.univ_name,univ_discipline.discipline_code,univ_discipline.discipline_name
    FROM univ_discipline
    INNER JOIN tag ON univ_discipline.tag_id = tag.tag_id
    WHERE tag.tag_id IN (1,2,3,4,5,6,7,8,9)
    ORDER BY tag.tag_id ASC,tag.subtag_name ASC`
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
                message: "该图标无信息"
            })
        } else {
            for (let i = 0, len = results.rows.length; i < len; i++) { 
                if (results.rows[i]["univ_code"] == 10403){
                    results.rows[i]["一流大学"] = "一流大学6个学科群"
                }
            }
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });

}

