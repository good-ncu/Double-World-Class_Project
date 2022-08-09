
// 导入数据库操作模块
const client = require('../../db/index')
// 省厅 一流大学，一流学科  下拉菜单的内容
exports.gov_query_school_disc = function (req, res) {
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
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });

}



//  省厅 获取指定学校  对应的所有学科
exports.province_subjects_of_school = function (req, res) {
    userinfo = req.user
    school_name = req.body.school
    if (school_name == '南昌大学') {
        sql = `SELECT ROW_NUMBER () OVER (ORDER BY  subtag_name  DESC) AS  id,subtag_name AS name
            FROM tag
            WHERE tag_id<7`
    } else {
        sql = `SELECT ROW_NUMBER () OVER (ORDER BY  discipline_name  DESC) AS  id,univ_discipline.univ_code,univ_name,discipline_code,discipline_name AS name
            FROM univ_discipline
		    where univ_name ='${school_name}'`
    }
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
                message: "您选择的学校无相关学科信息"
            })
        } else {
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });

}

