// 导入数据库操作模块
const client = require('../../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../../config')
// 导入uuid包
const { v4: uuidv4 } = require('uuid');
var async = require('async');
var fs = require('fs');


// 教师获国内外重要奖项情况  4-1-1  '国家级奖项', '省部级奖项'
exports.gov_detail_4_award = function (req, res) {
    subject = req.body.subject
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	b.level,
	SUM(b.num) AS num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		tch_award.level AS level, 	--奖项级别
		COUNT(tch_award.level) AS num 	--奖项数量
	FROM
	((
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
	)) AS a
	INNER JOIN tch_award 
		ON a.univ_code = tch_award.univ_code AND a.discipline_code = tch_award.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = tch_award.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND tch_award.is_delete = '0' 
		AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		tch_award.level
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name,
	b.level
ORDER BY level ASC`
    client.query(sql, function (err, results){
        if (err) {
            // 异常后调用callback并传入err
            return res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示           ========= 修改 标题上的注释抄下来
            return res.send({
                status: 0,
                name: [],
                value: []
            })
        } else {
            console.log(results.rows);
            var name = []
            var value = []
            results.rows.map(function (item){
                name.push(item.level)
                value.push(item.num)
            })
            return res.send({
                status: 0,
                name: name,
                value: value
            })
        }
    })
}


// 教师在国内外重要期刊发表论文  4-1-3   "['国内外顶级期刊', '国内外重要期刊', '其他重要期刊'],",
exports.gov_detail_4_paper = function (req, res) {
    subject = req.body.subject
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	b.level,
	SUM(b.num) AS num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		tch_paper.jour_level AS level, 	--论文级别
		COUNT(tch_paper.jour_level) AS num 	--论文数量
	FROM
	((
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
	)) AS a
	INNER JOIN tch_paper 
		ON a.univ_code = tch_paper.univ_code AND a.discipline_code = tch_paper.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = tch_paper.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND tch_paper.is_delete = '0' 
		AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		tch_paper.jour_level
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name,
	b.level
ORDER BY level ASC`
    client.query(sql, function (err, results){
        if (err) {
            // 异常后调用callback并传入err
            return res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示           ========= 修改 标题上的注释抄下来
            return res.send({
                status: 0,
                name: [],
                value: []
            })
        } else {
            console.log(results.rows);
            var name = []
            var value = []
            results.rows.map(function (item){
                name.push(item.level)
                value.push(item.num)
            })
            return res.send({
                status: 0,
                name: name,
                value: value
            })
        }
    })
}

// 科研创新平台建设情况  4-2-1   ['国家级平台', '省部级平台']
exports.gov_detail_4_platform = function (req, res) {
    subject = req.body.subject
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	b.level,
	SUM(b.num) AS num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		sci_innova_plat.palt_level AS level, 	--科研平台类型
		COUNT(sci_innova_plat.palt_level) AS num 	--科研平台数量
	FROM
	((
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
	)) AS a
	INNER JOIN sci_innova_plat 
		ON a.univ_code = sci_innova_plat.univ_code AND a.discipline_code = sci_innova_plat.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = sci_innova_plat.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND sci_innova_plat.is_delete = '0' 
		AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		sci_innova_plat.palt_level
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name,
	b.level
ORDER BY level ASC`
    client.query(sql, function (err, results){
        if (err) {
            // 异常后调用callback并传入err
            return res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示           ========= 修改 标题上的注释抄下来
            return res.send({
                status: 0,
                name: [],
                value: []
            })
        } else {
            console.log(results.rows);
            var name = []
            var value = []
            results.rows.map(function (item){
                name.push(item.level)
                value.push(item.num)
            })
            return res.send({
                status: 0,
                name: name,
                value: value
            })
        }
    })
}

// 学科主持科研项目情况  4-2-2   ['国家重点重大项目', '国家一般项目', '省级重点重大项目']
exports.gov_detail_4_hold = function (req, res) {

}

// 参与国内外标准指定项目数  4-3-1   ['2021年第一季度', '2021年第二季度', '2021年第三季度', '2021年第四季度']
exports.gov_detail_4_project = function (req, res) {

}

// 参与国际论文合作数量  4-3-2   ['2021年第一季度', '2021年第二季度', '2021年第三季度', '2021年第四季度']
exports.gov_detail_4_copaper = function (req, res) {

}

// 3个数字  4-1-2   4-1-4  4-2-4   ['开出版专著', '承担国内外重大设计', '主办学术期刊']
exports.gov_detail_4_number = function (req, res) {

}
