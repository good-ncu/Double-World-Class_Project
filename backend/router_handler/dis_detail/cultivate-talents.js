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




// 教学成果奖 情况（2-2-1全部）      即 2-2-1-0到2-2-1-3
exports.gov_detail_2_award = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
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
		teaching_achv.award_ltype AS level, 	--教学成果奖类别
		COUNT(teaching_achv.award_ltype) AS num 	--教学成果数量
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
	INNER JOIN teaching_achv 
		ON a.univ_code = teaching_achv.univ_code AND a.discipline_code = teaching_achv.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = teaching_achv.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND teaching_achv.is_delete = '0' 
		AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		teaching_achv.award_ltype
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name,
	b.level
ORDER BY level ASC`
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示           ========= 修改 标题上的注释抄下来
            // res.cc("该校学科无教学成果奖的信息")
            res.send({
                status: 0,
                data: []
            })
        } else {
            //   调试阶段可以 ============修改  gov_detail_2_award 
            console.log("========教学成果奖 情况（2-2-1全部）   results_to_data: =========");
            console.log(results.rows);
            var name = []
            var value = []
            for (let i = 0, len = results.rows.length; i < len; i++) {
                name.push(results.rows[i]["level"])
                value.push(results.rows[i]["num"])
            }
            res.send({
                status: 0,
                name: name,
                value: value
            })
        }
    });

}


// 课程建设情况
exports.gov_detail_2_build = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
    sql = `SELECT 
   concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
   b.level AS name,
   SUM(b.num) AS value
FROM
(
SELECT
       a.univ_code,
       a.discipline_code,
       a.univ_name,
       a.discipline_name,
       firstclass_course_const.cour_level AS level,	--课程级别
       COUNT(firstclass_course_const.cour_level) AS num 	--课程数量
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
   INNER JOIN firstclass_course_const 
       ON a.univ_code = firstclass_course_const.univ_code AND a.discipline_code = firstclass_course_const.discipline_code
   INNER JOIN user_fill 
       ON user_fill.id = firstclass_course_const.user_fill_id
   WHERE 
       user_fill.is_delete = '0' 
       AND firstclass_course_const.is_delete = '0' 
       AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
   GROUP BY
       a.univ_code,
       a.discipline_code,
       a.univ_name,
       a.discipline_name,
       firstclass_course_const.cour_level
   ) AS b
GROUP BY 
   b.univ_name,
   b.discipline_name,
   b.level
ORDER BY level ASC`
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示           ========= 修改 标题上的注释抄下来
            // res.cc("该校学科无教学成果奖的信息")
            res.send({
                status: 0,
                data: []
            })
        } else {
            //   调试阶段可以 ============修改  gov_detail_2_award 
            console.log("========1-1-2   results_to_data: =========");
            console.log(results.rows);
            for (let i = 0, len = results.rows.length; i < len; i++) {
                if (results.rows[i]["name"] == "国家级") {

                    results.rows[i]["name"] = "国家级一流课程建设数"
                }
                if (results.rows[i]["name"] == "省级") {

                    results.rows[i]["name"] = "省级一流课程建设数"
                }
            }
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });

}


// 人才培养基地  2-2-3的全部   即 2-2-3-0到2-2-3-2
exports.gov_detail_2_platform = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
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
		talent_platbase_const.plat_base_level AS level, 	--平台级别
		COUNT(talent_platbase_const.plat_base_level) AS num 	--平台数量
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
	INNER JOIN talent_platbase_const 
		ON a.univ_code = talent_platbase_const.univ_code AND a.discipline_code = talent_platbase_const.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = talent_platbase_const.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND talent_platbase_const.is_delete = '0' 
		AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		talent_platbase_const.plat_base_level
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name,
	b.level
ORDER BY level ASC`
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示           ========= 修改 标题上的注释抄下来
            // res.cc("该校学科无教学成果奖的信息")
            res.send({
                status: 0,
                data: []
            })
        } else {
            //   调试阶段可以 ============修改  gov_detail_2_award 
            console.log("========人才培养基地    results_to_data: =========");
            console.log(results.rows);
            var name = []
            var value = []
            for (let i = 0, len = results.rows.length; i < len; i++) {
                if (results.rows[i]["level"] == "国家级") {

                    results.rows[i]["level"] = "国家级人才培养平台/基地"
                }
                if (results.rows[i]["level"] == "省部级") {

                    results.rows[i]["level"] = "省部级人才培养平台/基地"
                }
            }
            for (let i = 0, len = results.rows.length; i < len; i++) {
                name.push(results.rows[i]["level"])
                value.push(results.rows[i]["num"])
            }
            res.send({
                status: 0,
                name: name,
                value: value
            })
        }
    });

}

// 硕博导师情况  2-2-4
exports.gov_detail_2_teacher = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.master_tutor_num) AS master_tutor_num,
	SUM(b.doc_tutor_num) AS doc_tutor_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		mphd_tutor_const.master_tutor_num ,	--硕士生导师数量
		mphd_tutor_const.doc_tutor_num	--博士生导师数量
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
	INNER JOIN mphd_tutor_const 
		ON a.univ_code = mphd_tutor_const.univ_code AND a.discipline_code = mphd_tutor_const.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = mphd_tutor_const.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND mphd_tutor_const.is_delete = '0' 
		AND mphd_tutor_const.yr = '2020-2021'	--传参数
		AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name`
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示           ========= 修改 标题上的注释抄下来
            // res.cc("该校学科无教学成果奖的信息")
            res.send({
                status: 0,
                data: []
            })
        } else {
            //   调试阶段可以 ============修改  gov_detail_2_award 
            console.log("========硕博导师情况   results_to_data: =========");
            console.log(results.rows);
            results_data = [{
                "value": 24,
                "name": "硕士生导师数"
            },
            {
                "value": 7,
                "name": "博士生导师数"
            }]
            results_data[0].value = results.rows[0].master_tutor_num
            results_data[1].value = results.rows[0].doc_tutor_num
            res.send({
                status: 0,
                data: results_data
            })
        }
    });
}


// 学生国内外竞赛获奖情况  2-2-6
exports.gov_detail_2_contest = function (req, res) {

}


// 学生发表代表性论文情况  2-2-7
exports.gov_detail_2_paper = function (req, res) {

}


// 学科毕业生结构  2-3-1
exports.gov_detail_2_graduate = function (req, res) {

}


// 学科留学生结构  2-4-1
exports.gov_detail_2_exchange = function (req, res) {

}



// 三个数字  "正教授","突出毕业生","学术报告人     2-4-2  ,  2-2-5  ,2-3-2 
exports.gov_detail_2_number = function (req, res) {

}


