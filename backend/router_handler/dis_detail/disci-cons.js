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


// 1-1-2
exports.gov_detail_1_evaluation = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
    sql = `SELECT 
  concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
  b.turn,
  b.result AS result
FROM
(
SELECT
      a.univ_code,
      a.discipline_code,
      a.univ_name,
      a.discipline_name,
      discipline_eval.discipline_eval_turn AS turn,	--学科评估轮次
      discipline_eval.discipline_eval_result AS result 	--学科评估结果
  FROM
  ((
  SELECT
      univ_discipline.univ_code,
      univ_discipline.discipline_code,
      univ_discipline.univ_name,
      univ_discipline.subtag1 AS discipline_name
  FROM univ_discipline
  WHERE univ_discipline.tag1='学科群' AND univ_discipline.subsubtag1='主干'	--只查主干 
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
  INNER JOIN discipline_eval 
      ON a.univ_code = discipline_eval.univ_code AND a.discipline_code = discipline_eval.discipline_code
  INNER JOIN user_fill 
      ON user_fill.id = discipline_eval.user_fill_id
  WHERE 
      user_fill.is_delete = '0' 
      AND discipline_eval.is_delete = '0' 
      AND discipline_eval.discipline_eval_turn IN (4,5)	--第四、五轮学科评估，根据需要可以加入6
      AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--参数
  ) AS b
ORDER BY turn ASC`
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
            var results_data = []
            for (let i = 0, len = results.rows.length; i < len; i++) {
                if (results.rows[i]["turn"] == 4) {

                    results_data.push(results.rows[i]["result"])
                }
            }
            if (results_data.length == 1) {
                results_data.push("无")
            }
            res.send({
                status: 0,
                data: results_data
            })
        }
    });
}

//1-1-3
exports.gov_detail_1_influence = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
    sql = `SELECT 
 concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
 b.yr AS year,
 b.rank_type AS title,
 b.result AS rank
FROM
(
 SELECT
  a.univ_code,
  a.discipline_code,
  a.univ_name,
  a.discipline_name,
     discipline_influ.yr,
  discipline_influ.rank_type AS rank_type, --学科评估轮次
  discipline_influ.rank AS result  --学科评估结果
 FROM
 ((
 SELECT
  univ_discipline.univ_code,
  univ_discipline.discipline_code,
  univ_discipline.univ_name,
  univ_discipline.subtag1 AS discipline_name
 FROM univ_discipline
 WHERE univ_discipline.tag1='学科群' AND univ_discipline.subsubtag1='主干' --只查主干 
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
 INNER JOIN discipline_influ 
  ON a.univ_code = discipline_influ.univ_code AND a.discipline_code = discipline_influ.discipline_code
 INNER JOIN user_fill 
  ON user_fill.id = discipline_influ.user_fill_id
 WHERE 
  user_fill.is_delete = '0' 
  AND discipline_influ.is_delete = '0' 
    AND discipline_influ.yr = 2022
--   AND rank_type ='软科中国大学专业排名' --根据需要限定排名类型
  AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}' --参数
 ) AS b
ORDER BY rank_type ASC`
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
            console.log("========1-1-3   results_to_data: =========");
            console.log(results.rows);
            // 增加key属性
            results.rows.key = 'ave'
            for (let i = 0, len = results.rows.length; i < len; i++) {
                results.rows[i]["ave"] = i + 1
            }
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });
}

//1-1-4
exports.gov_detail_1_found = function (req, res) {
    // 验证token
    user = req.user
    // 接收参数
    subject = req.body.subject
    // sql填入          ======== 修改
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	b.yr,
	b.total_fund,
	b.ctr_budg_fund,
	b.ctr_receive_fund,
	b.ctr_expend_fund,
	b.lcl_budg_fund,
	b.lcl_receive_fund,
	b.lcl_expend_fund,
	b.self_budg_fund,
	b.self_receive_fund,
	b.self_expend_fund,
	b.other_budg_fund,
	b.other_receive_fund,
	b.other_expend_fund
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		yr,	--年度
		discipline_const_fund.total_fund,	--建设总经费
		discipline_const_fund.ctr_budg_fund,	--中央专项预算经费
		discipline_const_fund.ctr_receive_fund,	--中央专项实际到账
		discipline_const_fund.ctr_expend_fund,	--中央专项实际支出
		discipline_const_fund.lcl_budg_fund,	--地方专项预算经费
		discipline_const_fund.lcl_receive_fund,	--地方专项实际到账
		discipline_const_fund.lcl_expend_fund,	--地方专项实际支出
		discipline_const_fund.self_budg_fund,	--学科自筹预算经费
		discipline_const_fund.self_receive_fund,	--学科自筹实际到账
		discipline_const_fund.self_expend_fund,	--学科自筹实际支出
		discipline_const_fund.other_budg_fund,	--其他预算经费
		discipline_const_fund.other_receive_fund,	--其他实际到账
		discipline_const_fund.other_expend_fund	--其他实际支出
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
	INNER JOIN discipline_const_fund 
		ON a.univ_code = discipline_const_fund.univ_code AND a.discipline_code = discipline_const_fund.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = discipline_const_fund.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND discipline_const_fund.is_delete = '0' 
		AND discipline_const_fund.yr IN (2022,2021,2023,2024,2025,2026)	--传参数
		AND concat_ws('-',a.univ_name,a.discipline_name)='${subject}'	--传参数
	) AS b
ORDER BY yr DESC`
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
            console.log("========1-1-4   results_to_data: =========");
            console.log(results.rows);
            // 增加key属性
            results.rows.key = 'temp'
            for (let i = 0, len = results.rows.length; i < len; i++) {
                results.rows[i]["key"] = i + 1
            }
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });

}
