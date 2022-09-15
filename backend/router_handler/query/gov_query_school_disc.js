
// 导入数据库操作模块
const client = require('../../db/index')
const async = require('async');
// 省厅 一流大学，一流学科  下拉菜单的内容
exports.gov_query_school_disc = function (req, res) {
    // userinfo = req.user
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
                if (results.rows[i]["univ_code"] == 10403) {
                    results.rows[i]["univ_name"] = results.rows[i]["subtag_name"]
                    results.rows[i]["subtag_name"] = "一流大学"
                }
                if (results.rows[i]["univ_code"] != 10403) {
                    results.rows[results.rows.length - 1] = {
                        "subtag_name": "一流学科",
                        "univ_code": results.rows[i]["univ_code"],
                        "univ_name": results.rows[i]["subtag_name"],
                        // "discipline_code": results.rows[i]["discipline_code"],
                        "discipline_name": results.rows[i]["univ_name"]
                    }
                    results.rows.push(
                        results.rows[results.rows.length - 1]
                    )
                }
            }
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });

}



// 省厅 学校 及其对应 学科  的展示
exports.gov_query_school_disc_eval = function (req, res) {
    // userinfo = req.user
    sql = `SELECT
    univ_code,
    discipline_code,
    univ_name,
    discipline_name,
    tag 
   FROM
   ((
   SELECT
    univ_discipline.univ_code,
    univ_discipline.discipline_code,
    univ_discipline.univ_name,
    univ_discipline.subtag1 AS discipline_name,
    concat_ws('、',univ_discipline.tag3,univ_discipline.tag1,univ_discipline.tag2) AS tag
   FROM univ_discipline
   WHERE univ_discipline.tag1='学科群' AND univ_discipline.subsubtag1='主干'
   )
   UNION
   (
   SELECT
    univ_discipline.univ_code,
    univ_discipline.discipline_code,
    univ_discipline.univ_name,
    univ_discipline.discipline_name,
    concat_ws('、',univ_discipline.tag3,univ_discipline.subtag1,univ_discipline.tag2) AS tag
   FROM univ_discipline
   WHERE univ_discipline.tag1='一流学科建设名单'
   )) AS A
   ORDER BY univ_code,discipline_code ASC`
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
                status: 1,
                message: "无学科信息"
            })
        } else {
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });

}



//  省厅 获取指定学校  对应的所有学科  及其填报进度  （百分比）
exports.province_subjects_of_school = function (req, res) {
    // userinfo = req.user
    school_name = req.body.school
    sql = []
    sql.push(`SELECT
    b.discipline_name AS name,
    b.already_fill_num,
    COUNT( DISTINCT fill.id)* b.user_num AS need_fill_num
   FROM
   (
   SELECT
    all_xk.univ_name,
    all_xk.discipline_name,
    COUNT(DISTINCT user_info.id) AS user_num,
    COUNT(a.user_id) AS already_fill_num
   FROM
   (
    (
     SELECT
      univ_discipline.univ_code,
      univ_discipline.discipline_code,
      univ_discipline.univ_name,
      univ_discipline.subtag1 AS discipline_name
     FROM univ_discipline
     WHERE univ_discipline.tag1='学科群' 
    )
    UNION
    (
     SELECT
      univ_discipline.univ_code,
      univ_discipline.discipline_code,
      univ_discipline.univ_name,
      univ_discipline.discipline_name
     FROM univ_discipline
     WHERE univ_discipline.tag1='一流学科建设名单'
    )
   ) AS all_xk  
   LEFT JOIN user_info 
    ON all_xk.discipline_code = user_info.discipline_code AND all_xk.univ_code = user_info.univ_code
   LEFT JOIN 
   (
    SELECT 
     user_fill.user_id
    FROM user_fill
    WHERE user_fill.fill_id IN (SELECT id FROM fill WHERE fill.flag=1)
     AND user_fill.is_delete = '0'
     AND user_fill.flag = 1
   ) AS a ON a.user_id = user_info.id
   WHERE 
    all_xk.univ_name = '${school_name}' --传参数
   GROUP BY
    all_xk.univ_name,
    all_xk.discipline_name
   ) AS b
   CROSS JOIN fill
   WHERE fill.flag = 1
   GROUP BY
    b.discipline_name,
    b.user_num,
    b.already_fill_num`)
    return_data = []
    async.eachSeries(sql, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                console.log(err.message);
                // 异常后调用callback并传入err
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else if (results.rowCount == 0) {
                err = "您选择的学校无相关学科信息"
                callback(err)
            } else {
                for (let i = 0, len = results.rows.length; i < len; i++) {
                    results.rows[i].percentage = Math.ceil((results.rows[i].already_fill_num) / (results.rows[i].need_fill_num) * 100)
                    results.rows[i].percentage = results.rows[i].percentage + '%'
                    console.log(results.rows[i])
                }
                return_data = results.rows
                callback()
            }
        });
    }, function (err) {
        if (err) {
            console.log(err);
            return res.cc(err)
        } else {

            res.send({
                status: 0,
                data: return_data
            })

        }
    })
}








