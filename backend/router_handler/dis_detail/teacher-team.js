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


// 3-2的全部    专任教师队伍  
exports.gov_detail_3_teacher = function (req, res) {
	// 验证token
	user = req.user
	// 接收参数
	subject = req.body.subject
	// sql填入          ======== 修改
	sql = `SElECT
	concat_ws('-',all_xk.univ_name,all_xk.discipline_name) AS dis_name,
	concat_ws('-',COALESCE(a4.yr,'0000-0000'),COALESCE(a5.yr,0),COALESCE(a6.yr,'0000-0000')) AS yr,
	sum(COALESCE(a1.num,0)) AS rc_num,	--高层次人才及团队
	sum(COALESCE(a2.num,0)) AS grc_num,	--国家级团队和学术领军人才
	sum(COALESCE(a3.num,0)) AS src_num,	--省重点人才
	sum(COALESCE(a4.num,0)) AS tch_num,	--学科专任教师
	sum(COALESCE(a5.num,0)) AS postdoc_num,	--博士后和科研助理数量
	sum(COALESCE(a6.num,0)) AS ftch_num	--外籍专任教师数量
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
		talent_team.univ_code,
		talent_team.discipline_code,
		count(talent_team.id) AS num
	FROM
		talent_team
	INNER JOIN user_fill 
		ON user_fill.id = talent_team.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND talent_team.is_delete = '0'
	GROUP BY
		talent_team.univ_code,
		talent_team.discipline_code
	) AS a1 ON all_xk.univ_code = a1.univ_code AND all_xk.discipline_code = a1.discipline_code	
LEFT JOIN
(
	SELECT
		talent_team.univ_code,
		talent_team.discipline_code,
		count(talent_team.id) AS num
	FROM
		talent_team
	INNER JOIN user_fill 
		ON user_fill.id = talent_team.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND talent_team.is_delete = '0'
		AND talent_team.level = '国家级'
	GROUP BY
		talent_team.univ_code,
		talent_team.discipline_code
	) AS a2 ON all_xk.univ_code = a2.univ_code AND all_xk.discipline_code = a2.discipline_code	
LEFT JOIN
(
	SELECT
		talent_team.univ_code,
		talent_team.discipline_code,
		count(talent_team.id) AS num
	FROM
		talent_team
	INNER JOIN user_fill 
		ON user_fill.id = talent_team.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND talent_team.is_delete = '0'
		AND talent_team.level = '省级'
	GROUP BY
		talent_team.univ_code,
		talent_team.discipline_code
	) AS a3 ON all_xk.univ_code = a3.univ_code AND all_xk.discipline_code = a3.discipline_code
LEFT JOIN
(
	SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		fulltch.yr,
		fulltch.full_tch_num AS num
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
	INNER JOIN fulltch
		ON a.univ_code = fulltch.univ_code AND a.discipline_code = fulltch.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = fulltch.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND fulltch.is_delete = '0'
	)  AS a4 ON all_xk.univ_code = a4.univ_code AND all_xk.discipline_code = a4.discipline_code
LEFT JOIN
(
	(
	SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		pdoc_ra.yr,
		COALESCE(pdoc_ra.in_postdoc_sum,0) + COALESCE(pdoc_ra.out_postdoc_sum,0) + 
		COALESCE(pdoc_ra.univ_ra_sum,0) + COALESCE(pdoc_ra.inst_ra_sum,0) + 
		COALESCE(task_ra_sum,0) AS num
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
	INNER JOIN pdoc_ra
		ON a.univ_code = pdoc_ra.univ_code AND a.discipline_code = pdoc_ra.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = pdoc_ra.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND pdoc_ra.is_delete = '0'
	)
	)  AS a5 ON all_xk.univ_code = a5.univ_code AND all_xk.discipline_code = a5.discipline_code
LEFT JOIN
(
	SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		foreign_fulltch.yr,
		foreign_fulltch.sum_full_ftch AS num
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
	INNER JOIN foreign_fulltch
		ON a.univ_code = foreign_fulltch.univ_code AND a.discipline_code = foreign_fulltch.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = foreign_fulltch.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND foreign_fulltch.is_delete = '0'
	)  AS a6 ON all_xk.univ_code = a6.univ_code AND all_xk.discipline_code = a6.discipline_code
WHERE concat_ws('-',all_xk.univ_name,all_xk.discipline_name)='${subject}'	--传参数
GROUP BY
	all_xk.univ_name,
	all_xk.discipline_name,
	a4.yr,
	a5.yr,
	a6.yr
ORDER BY yr DESC
LIMIT 1`
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
			console.log("========专任教师队伍     results_to_data: =========");
			console.log(results.rows);

			var results_data = [{
				"title": "高层次人才及团队",
				"number": 200
			},
			{
				"title": "国家级团队和学术领军人才",
				"number": 2000
			},
			{
				"title": "省重点人才",
				"number": 2001
			},
			{
				"title": "学科专任教师",
				"number": 2022
			},
			{
				"title": "博士后和科研助理",
				"number": 211
			},
			{
				"title": "外籍专任教师数量",
				"number": 20
			}]
			results_data[0].number = results.rows[0].rc_num
			results_data[1].number = results.rows[0].grc_num
			results_data[2].number = results.rows[0].src_num
			results_data[3].number = results.rows[0].tch_num
			results_data[4].number = results.rows[0].postdoc_num
			results_data[5].number = results.rows[0].ftch_num

			res.send({
				status: 0,
				data: results_data
			})
		}
	});
}


// 师资队伍国际水平     3-3 的全部
exports.gov_detail_3_level = function (req, res) {
	// 验证token
	user = req.user
	// 接收参数
	subject = req.body.subject
	// sql填入          ======== 修改
	sql = `SElECT
	concat_ws('-',all_xk.univ_name,all_xk.discipline_name) AS dis_name,
	sum(COALESCE(a1.num,0)) AS tch_jour_num,	--担任国内外重要期刊负责人
	sum(COALESCE(a2.num,0)) AS tch_org_num,	--在国内重要学术组织任职
	sum(COALESCE(a3.num,0)) AS tch_rpt_num,	--参加本领域重要学术会议做报告人
	sum(COALESCE(a4.num,0)) AS tch_judge_num	--担任国际比赛负责人
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
		tch_head_jour.univ_code,
		tch_head_jour.discipline_code,
		count(tch_head_jour.id) AS num
	FROM
		tch_head_jour
	INNER JOIN user_fill 
		ON user_fill.id = tch_head_jour.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND tch_head_jour.is_delete = '0'
	GROUP BY
		tch_head_jour.univ_code,
		tch_head_jour.discipline_code
	) AS a1 ON all_xk.univ_code = a1.univ_code AND all_xk.discipline_code = a1.discipline_code	
LEFT JOIN
(
	SELECT
		tch_head_acorg.univ_code,
		tch_head_acorg.discipline_code,
		count(tch_head_acorg.id) AS num
	FROM
		tch_head_acorg
	INNER JOIN user_fill 
		ON user_fill.id = tch_head_acorg.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND tch_head_acorg.is_delete = '0'
	GROUP BY
		tch_head_acorg.univ_code,
		tch_head_acorg.discipline_code
	)  AS a2 ON all_xk.univ_code = a2.univ_code AND all_xk.discipline_code = a2.discipline_code	
LEFT JOIN
(
	SELECT
		tch_attdrpt_acconf.univ_code,
		tch_attdrpt_acconf.discipline_code,
		count(tch_attdrpt_acconf.id) AS num
	FROM
		tch_attdrpt_acconf
	INNER JOIN user_fill 
		ON user_fill.id = tch_attdrpt_acconf.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND tch_attdrpt_acconf.is_delete = '0'
	GROUP BY
		tch_attdrpt_acconf.univ_code,
		tch_attdrpt_acconf.discipline_code
	)  AS a3 ON all_xk.univ_code = a3.univ_code AND all_xk.discipline_code = a3.discipline_code
LEFT JOIN
(
	SELECT
		tch_judge_comp.univ_code,
		tch_judge_comp.discipline_code,
		count(tch_judge_comp.id) AS num
	FROM
		tch_judge_comp
	INNER JOIN user_fill 
		ON user_fill.id = tch_judge_comp.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND user_fill.is_seen = '1'
		AND tch_judge_comp.is_delete = '0'
	GROUP BY
		tch_judge_comp.univ_code,
		tch_judge_comp.discipline_code
	)   AS a4 ON all_xk.univ_code = a4.univ_code AND all_xk.discipline_code = a4.discipline_code
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
			console.log("========专任教师队伍     results_to_data: =========");
			console.log(results.rows);

			var results_data = [
				{
					"value": 10,
					"name": "担任国内外重要期刊负责人"
				},
				{
					"value": 10,
					"name": "在国内重要学术组织任职"
				},
				{
					"value": 5,
					"name": "参加本领域重要学术会议做报告人"
				},
				{
					"value": 5,
					"name": "担任国际比赛负责人"
				}
			]
			results_data[0].value = results.rows[0].tch_jour_num
			results_data[1].value = results.rows[0].tch_org_num
			results_data[2].value = results.rows[0].tch_rpt_num
			results_data[3].value = results.rows[0].tch_judge_num

			res.send({
				status: 0,
				data: results_data
			})
		}
	});
}