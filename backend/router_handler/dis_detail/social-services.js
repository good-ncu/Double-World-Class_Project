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

// 成果转化    5-1 成果转化xxxx万元    
exports.gov_detail_5_earn = function (req, res) {
	subject = req.body.subject
	sql = `SElECT
	concat_ws('-',all_xk.univ_name,all_xk.discipline_name) AS dis_name,
	sum(COALESCE(a1.achv_to_univfund,0)) AS achv_to_univfund	--成果转化到校金额累加
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
		achv_to_univfund.univ_code,
		achv_to_univfund.discipline_code,
		achv_to_univfund.yr,
		achv_to_univfund.achv_to_univfund	--成果转化到校金额
	FROM
		achv_to_univfund
	INNER JOIN user_fill 
		ON user_fill.id = achv_to_univfund.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND achv_to_univfund.is_delete = '0'
	GROUP BY
		achv_to_univfund.univ_code,
		achv_to_univfund.discipline_code,
		achv_to_univfund.yr,
		achv_to_univfund.achv_to_univfund
	)  AS a1 ON all_xk.univ_code = a1.univ_code AND all_xk.discipline_code = a1.discipline_code	
WHERE
	concat_ws('-',all_xk.univ_name,all_xk.discipline_name)='${subject}'	--传参数
GROUP BY
	all_xk.univ_name,
	all_xk.discipline_name`
	client.query(sql, function (err, results) {
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
				data: ""
			})
		} else {
			console.log(results.rows);
			var count = 0
			results.rows.map(function (item) {
				count += item.achv_to_univfund
			})
			return res.send({
				status: 0,
				data: count
			})
		}
	})
}


// 智库建设  5-2
exports.gov_detail_5_intelligent = function (req, res) {
	subject = req.body.subject
	sql = `SElECT
	concat_ws('-',all_xk.univ_name,all_xk.discipline_name) AS dis_name,
	sum(COALESCE(a1.prodedu_plat_num,0)) AS gcj_num,	--国家级产教融合平台数，为null则置为0
	sum(COALESCE(a2.prodedu_plat_num,0)) AS scj_plat_num,	--省部级产教融合平台数，为null则置为0
	sum(COALESCE(a3.consult_plat_num,0)) AS gzz_plat_num,	--咨政研究获国家领导人肯定性批示数，为null则置为0
	sum(COALESCE(a4.consult_plat_num,0)) AS zz_plat_num	--咨政研究获省部级领导人肯定性批示数，为null则置为0
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
		prodedu_plat.univ_code,
		prodedu_plat.discipline_code,
		count(prodedu_plat.id) AS prodedu_plat_num
	FROM
		prodedu_plat
	INNER JOIN user_fill 
		ON user_fill.id = prodedu_plat.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND prodedu_plat.is_delete = '0'
		AND prodedu_plat.plat_level = '国家级'
	GROUP BY
		prodedu_plat.univ_code,
		prodedu_plat.discipline_code,
		prodedu_plat.plat_level
	) AS a1 ON all_xk.univ_code = a1.univ_code AND all_xk.discipline_code = a1.discipline_code	
LEFT JOIN
(
	SELECT
		prodedu_plat.univ_code,
		prodedu_plat.discipline_code,
		count(prodedu_plat.id) AS prodedu_plat_num
	FROM
		prodedu_plat
	INNER JOIN user_fill 
		ON user_fill.id = prodedu_plat.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND prodedu_plat.is_delete = '0'
		AND prodedu_plat.plat_level = '省级'
	GROUP BY
		prodedu_plat.univ_code,
		prodedu_plat.discipline_code,
		prodedu_plat.plat_level
	) AS a2 ON all_xk.univ_code = a2.univ_code AND all_xk.discipline_code = a2.discipline_code	
LEFT JOIN
(
	SELECT
		consult_policy.univ_code,
		consult_policy.discipline_code,
		count(consult_policy.id) AS consult_plat_num
	FROM
		consult_policy
	INNER JOIN user_fill 
		ON user_fill.id = consult_policy.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND consult_policy.is_delete = '0'
		AND consult_policy.level = '国家级'
	GROUP BY
		consult_policy.univ_code,
		consult_policy.discipline_code,
		consult_policy.level
	) AS a3 ON all_xk.univ_code = a3.univ_code AND all_xk.discipline_code = a3.discipline_code
LEFT JOIN
(
	SELECT
		consult_policy.univ_code,
		consult_policy.discipline_code,
		count(consult_policy.id) AS consult_plat_num
	FROM
		consult_policy
	INNER JOIN user_fill 
		ON user_fill.id = consult_policy.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND consult_policy.is_delete = '0'
		AND consult_policy.level = '省级'
	GROUP BY
		consult_policy.univ_code,
		consult_policy.discipline_code,
		consult_policy.level
	) AS a4 ON all_xk.univ_code = a4.univ_code AND all_xk.discipline_code = a4.discipline_code		
WHERE concat_ws('-',all_xk.univ_name,all_xk.discipline_name)='${subject}'	--传参数
GROUP BY
	all_xk.univ_name,
	all_xk.discipline_name`
	client.query(sql, function (err, results) {
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
				data: []
			})
		} else {
			console.log(results.rows);
			var data = [{
				"title": "国家级产教融合平台数",
				"number": 0,
				"old_number": -1
			},
			{
				"title": "省部级产教融合平台数",
				"number": 0,
				"old_number": -1
			},
			{
				"title": "咨政研究获国家领导人肯定性批示数",
				"number": 0,
				"old_number": -1
			},
			{
				"title": "咨政研究获省部级领导人肯定性批示数",
				"number": 0,
				"old_number": -1
			}]
			results.rows.map(function (item) {
				data[0].number = item.gcj_num
				data[1].number = item.scj_plat_num
				data[2].number = item.gzz_plat_num
				data[3].number = item.zz_plat_num
			})
			return res.send({
				status: 0,
				data: data
			})
		}
	})
}