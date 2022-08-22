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
    sql = `SElECT
	concat_ws('-',all_xk.univ_name,all_xk.discipline_name) AS dis_name,
	sum(COALESCE(a1.master_tutor_num,0)) AS master_tutor_num,	--硕士生导师数量
	sum(COALESCE(a1.doc_tutor_num,0)) AS doc_tutor_num	--博士生导师数量
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
LEFT JOIN
(
	SELECT
		mphd_tutor_const.univ_code,
		mphd_tutor_const.discipline_code,
		mphd_tutor_const.yr,
		mphd_tutor_const.master_tutor_num ,	--硕士生导师数量
		mphd_tutor_const.doc_tutor_num	--博士生导师数量
	FROM
		mphd_tutor_const
	INNER JOIN user_fill 
		ON user_fill.id = mphd_tutor_const.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND mphd_tutor_const.is_delete = '0'
	GROUP BY
		mphd_tutor_const.univ_code,
		mphd_tutor_const.discipline_code,
		mphd_tutor_const.yr,
		mphd_tutor_const.master_tutor_num ,	--硕士生导师数量
		mphd_tutor_const.doc_tutor_num	
	ORDER BY
		mphd_tutor_const.yr DESC
	LIMIT 1
	)  AS a1 ON all_xk.univ_code = a1.univ_code AND all_xk.discipline_code = a1.discipline_code	
WHERE concat_ws('-',all_xk.univ_name,all_xk.discipline_name)='${subject}'	--传参数
GROUP BY
	all_xk.univ_name,
	all_xk.discipline_name`
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
     stu_award_comp.award_level AS level, 	--获奖级别
     COUNT(stu_award_comp.award_level) AS num 	--获奖数量
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
 INNER JOIN stu_award_comp 
     ON a.univ_code = stu_award_comp.univ_code AND a.discipline_code = stu_award_comp.discipline_code
 INNER JOIN user_fill 
     ON user_fill.id = stu_award_comp.user_fill_id
 WHERE 
     user_fill.is_delete = '0' 
     AND stu_award_comp.is_delete = '0' 
     AND stu_award_comp.award_level != '其他'	--不统计其他级别奖项
     AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
 GROUP BY
     a.univ_code,
     a.discipline_code,
     a.univ_name,
     a.discipline_name,
     stu_award_comp.award_level
 ) AS b
GROUP BY 
 b.univ_name,
 b.discipline_name,
 b.level
ORDER BY 
 case
 when b.level = '特等奖' then 1
 when b.level = '一等奖' then 2
 when b.level = '二等奖' then 3
 when b.level = '团队奖' then 4
 end`
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
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });
}


// 学生发表代表性论文情况  2-2-7
exports.gov_detail_2_paper = function (req, res) {
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
		stu_publish_rep_paper.stu_type AS level, 	--学生类型：博士研究生、硕士研究生、本科生
		COUNT(stu_publish_rep_paper.stu_type) AS num 	--学生数量
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
	INNER JOIN stu_publish_rep_paper 
		ON a.univ_code = stu_publish_rep_paper.univ_code AND a.discipline_code = stu_publish_rep_paper.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = stu_publish_rep_paper.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND stu_publish_rep_paper.is_delete = '0' 
		AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		stu_publish_rep_paper.stu_type
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name,
	b.level
ORDER BY 
	case
	when b.level = '博士研究生' then 1
	when b.level = '硕士研究生' then 2
	when b.level = '本科生' then 3
	end`
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
            for (let i = 0, len = results.rows.length; i < len; i++) {
                if (results.rows[i].name == '博士研究生') {
                    results.rows[i].name == '博士生发表'
                }
                if (results.rows[i].name == '硕士研究生') {
                    results.rows[i].name == '硕士生发表'
                }
                if (results.rows[i].name == '本科生') {
                    results.rows[i].name == '本科生发表'
                }
            }
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });
}


// 学科毕业生结构  2-3-1      
exports.gov_detail_2_graduate = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
    sql = `SElECT
	concat_ws('-',all_xk.univ_name,all_xk.discipline_name) AS dis_name,
	sum(COALESCE(a1.award_bd_num,0)) AS award_bd_num,	--授予学士学位数量
	sum(COALESCE(a1.award_md_num,0)) AS award_md_num,	--授予硕士学位数量
	sum(COALESCE(a1.award_phd_num,0)) AS award_phd_num	--授予博士学位数量
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
LEFT JOIN
(
	SELECT
		ann_award_bdmdphd.univ_code,
		ann_award_bdmdphd.discipline_code,
		ann_award_bdmdphd.yr,
		ann_award_bdmdphd.award_bd_num,	--授予学士学位数量
		ann_award_bdmdphd.award_md_num,	--授予硕士学位数量
		ann_award_bdmdphd.award_phd_num	--授予博士学位数量
	FROM
		ann_award_bdmdphd
	INNER JOIN user_fill 
		ON user_fill.id = ann_award_bdmdphd.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND ann_award_bdmdphd.is_delete = '0'
	GROUP BY
		ann_award_bdmdphd.univ_code,
		ann_award_bdmdphd.discipline_code,
		ann_award_bdmdphd.yr,
		ann_award_bdmdphd.award_bd_num,
		ann_award_bdmdphd.award_md_num,
		ann_award_bdmdphd.award_phd_num
	ORDER BY
		ann_award_bdmdphd.yr DESC
	LIMIT 1
	) AS a1 ON all_xk.univ_code = a1.univ_code AND all_xk.discipline_code = a1.discipline_code	
WHERE concat_ws('-',all_xk.univ_name,all_xk.discipline_name)='${subject}'	--传参数
GROUP BY
	all_xk.univ_name,
	all_xk.discipline_name`
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
            results_data = [{
                "value": 0,
                "name": "毕业本科生"
            },
            {
                "value": 0,
                "name": "毕业硕士生"
            },
            {
                "value": 0,
                "name": "毕业博士生"
            }
            ]
            // for (let i = 0, len = results.rows.length; i < len; i++) {
            results_data[0].value = results.rows[0].award_bd_num
            if (results.rows[0].award_md_num == '') {
                results_data[1].value = 0
            }
            if (results.rows[0].award_phd_num == '') {
                results_data[2].value = 0
            }
            results_data[1].value = results.rows[0].award_md_num
            results_data[2].value = results.rows[0].award_phd_num

            // }
            res.send({
                status: 0,
                data: results_data
            })
        }
    });
}


// 学科留学生结构  2-4-1   
exports.gov_detail_2_exchange = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
    sql = `SElECT
	concat_ws('-',all_xk.univ_name,all_xk.discipline_name) AS dis_name,
	sum(COALESCE(a1.b_cur_num,0)) AS b_cur_num,	--本科留学生
	sum(COALESCE(a1.m_cur_num,0)) AS m_cur_num,	--硕士留学生
	sum(COALESCE(a1.phd_cur_num,0)) AS phd_cur_num	--博士留学生
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
LEFT JOIN
(
	SELECT
		intna_exch_stu.univ_code,
		intna_exch_stu.discipline_code,
		intna_exch_stu.yr,
		intna_exch_stu.b_cur_num,	--本科留学生
		intna_exch_stu.m_cur_num,	--硕士留学生
		intna_exch_stu.phd_cur_num	--博士留学生
	FROM
		intna_exch_stu
	INNER JOIN user_fill 
		ON user_fill.id = intna_exch_stu.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND intna_exch_stu.is_delete = '0'
	GROUP BY
		intna_exch_stu.univ_code,
		intna_exch_stu.discipline_code,
		intna_exch_stu.yr,
		intna_exch_stu.b_cur_num,
		intna_exch_stu.m_cur_num,
		intna_exch_stu.phd_cur_num
	ORDER BY
		intna_exch_stu.yr DESC
	LIMIT 1
	)  AS a1 ON all_xk.univ_code = a1.univ_code AND all_xk.discipline_code = a1.discipline_code	
WHERE concat_ws('-',all_xk.univ_name,all_xk.discipline_name)='${subject}'	--传参数
GROUP BY
	all_xk.univ_name,
	all_xk.discipline_name`
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
            results_data = [{
                "value": 0,
                "name": "本科留学生"
            },
            {
                "value": 0,
                "name": "硕士留学生"
            },
            {
                "value": 0,
                "name": "博士留学生"
            }
            ]
            // for (let i = 0, len = results.rows.length; i < len; i++) {
            results_data[0].value = results.rows[0].b_cur_num
            if (results.rows[0].m_cur_num == '') {
                results_data[1].value = 0
            } else {
                results_data[1].value = results.rows[0].m_cur_num
            }

            if (results.rows[0].phd_cur_num == '') {
                results_data[2].value = 0
            } else {
                results_data[2].value = results.rows[0].phd_cur_num
            }

            // }
            res.send({
                status: 0,
                data: results_data
            })
        }
    });
}



// 三个数字  "正教授","突出毕业生","学术报告人     2-4-2  ,  2-2-5  ,2-3-2      
exports.gov_detail_2_number = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
    sql = `SElECT
        concat_ws('-',all_xk.univ_name,all_xk.discipline_name) AS dis_name,
        sum(COALESCE(a1.num,0)) AS full_prof_num,	--正教授
        sum(COALESCE(a2.num,0)) AS nbstu_num,	--突出毕业生:学科领域突出贡献者情况
        sum(COALESCE(a3.num,0)) AS stu_rpt_num	--学术报告人:学术报告人参加本领域重要学术会议做报告人
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
    LEFT JOIN
    (
        SELECT
            fullprof_tch_underg.univ_code,
            fullprof_tch_underg.discipline_code,
            fullprof_tch_underg.yr,
            fullprof_tch_underg.sem,
            fullprof_tch_underg.num_full_prof AS num
        FROM
            fullprof_tch_underg
        INNER JOIN user_fill 
            ON user_fill.id = fullprof_tch_underg.user_fill_id
        WHERE 
            user_fill.is_delete = '0' 
            AND fullprof_tch_underg.is_delete = '0'
        GROUP BY
            fullprof_tch_underg.univ_code,
            fullprof_tch_underg.discipline_code,
            fullprof_tch_underg.yr,
            fullprof_tch_underg.sem,
            fullprof_tch_underg.num_full_prof 
        ORDER BY
            fullprof_tch_underg.yr,fullprof_tch_underg.sem DESC
        LIMIT 1
        )  AS a1 ON all_xk.univ_code = a1.univ_code AND all_xk.discipline_code = a1.discipline_code	
    LEFT JOIN
    (
        SELECT
            stu_attdrpt_imptacconf.univ_code,
            stu_attdrpt_imptacconf.discipline_code,
            count(stu_attdrpt_imptacconf.id) AS num
        FROM
            stu_attdrpt_imptacconf
        INNER JOIN user_fill 
            ON user_fill.id = stu_attdrpt_imptacconf.user_fill_id
        WHERE 
            user_fill.is_delete = '0' 
            AND stu_attdrpt_imptacconf.is_delete = '0'
        GROUP BY
            stu_attdrpt_imptacconf.univ_code,
            stu_attdrpt_imptacconf.discipline_code
        ) AS a2 ON all_xk.univ_code = a2.univ_code AND all_xk.discipline_code = a2.discipline_code	
    LEFT JOIN
    (
        SELECT
            graduate_is_procontrib.univ_code,
            graduate_is_procontrib.discipline_code,
            count(graduate_is_procontrib.id) AS num
        FROM
            graduate_is_procontrib
        INNER JOIN user_fill 
            ON user_fill.id = graduate_is_procontrib.user_fill_id
        WHERE 
            user_fill.is_delete = '0' 
            AND graduate_is_procontrib.is_delete = '0'
        GROUP BY
            graduate_is_procontrib.univ_code,
            graduate_is_procontrib.discipline_code
        ) AS a3 ON all_xk.univ_code = a3.univ_code AND all_xk.discipline_code = a3.discipline_code
    WHERE concat_ws('-',all_xk.univ_name,all_xk.discipline_name)='${subject}'	--传参数
    GROUP BY
        all_xk.univ_name,
        all_xk.discipline_name`
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
            var name = ["正教授",
                "突出毕业生",
                "学术报告人"
            ]
            var results_data = []
            results_data.push(results.rows[0].full_prof_num)
            results_data.push(results.rows[0].nbstu_num)
            results_data.push(results.rows[0].stu_rpt_num)
            res.send({
                status: 0,
                name: name,
                data: results_data
            })
        }
    });

}


