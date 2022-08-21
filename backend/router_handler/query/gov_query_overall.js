// 导入数据库操作模块
const client = require('../../db/index')

// 整体 - 01学科建设进展情况
exports.gov_overview_listen_01 = function(req,res){
    userinfo = req.user
    sql = `SELECT 
    b1.univ_name AS school,
    b1.discipline_name AS subject,
    b1.result4 AS rank ,
    b2.result5 AS evaluation
  FROM
  (
    SELECT
      a.univ_code,
      a.discipline_code,
      a.univ_name,
      a.discipline_name,
      discipline_eval.discipline_eval_result AS result4 	--学科评估结果
    FROM
    ((
    SELECT
      univ_discipline.univ_code,
      univ_discipline.discipline_code,
      univ_discipline.univ_name,
      univ_discipline.subtag1 AS discipline_name
    FROM univ_discipline
    WHERE univ_discipline.tag1='学科群' AND univ_discipline.subsubtag1='主干' 
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
      AND discipline_eval.discipline_eval_turn = 4	--参数
    ) AS b1
    LEFT JOIN
  (
    SELECT
      a.univ_code,
      a.discipline_code,
      a.univ_name,
      a.discipline_name,
      discipline_eval.discipline_eval_result AS result5 	--学科评估结果
    FROM
    ((
    SELECT
      univ_discipline.univ_code,
      univ_discipline.discipline_code,
      univ_discipline.univ_name,
      univ_discipline.subtag1 AS discipline_name
    FROM univ_discipline
    WHERE univ_discipline.tag1='学科群' AND univ_discipline.subsubtag1='主干' 
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
      AND discipline_eval.discipline_eval_turn = 5	--参数
    ) AS b2 ON b1.univ_code = b2.univ_code AND b1.discipline_code = b2.discipline_code
    
    ORDER BY
    case
    when b1.result4 = 'A+' then 1
    when b1.result4 = 'A' then 2
    when b1.result4 = 'A-' then 3
    when b1.result4 = 'B+' then 4
    when b1.result4 = 'B' then 5
    when b1.result4 = 'B-' then 6
    when b1.result4 = 'C+' then 7
    when b1.result4 = 'C' then 8
    when b1.result4 = 'C-' then 9
    when b1.result4 = '无' then 10
    end
  LIMIT 10`
    client.query(sql, function (err, results) {
        if (err) {
          // 异常后调用callback并传入err
          return res.send({
            status: 1,
            message: err.message
          })
        } else if (results.rowCount == 0) {
          // 当前sql查询为空，则返回填报提示
          evaluationData = []
        } else {
          evaluationData = results.rows.map(function (item) {
            var data = {}
            data.title = "第四轮学科评估"
            if(item.evaluation==undefined){
              data.evaluation = "无"
            }
            data.school = item.school
            data.subject = item.subject
            data.rank = item.rank
            return data
        }).filter(Boolean)
          console.log("========gov_overview_listen_01- evaluation data =========");
          sql2 = `SELECT 
          b.univ_name AS school,
          b.discipline_name AS subject,
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
           yr, --年度
           discipline_const_fund.total_fund, --建设总经费
           discipline_const_fund.ctr_budg_fund, --中央专项预算经费
           discipline_const_fund.ctr_receive_fund, --中央专项实际到账
           discipline_const_fund.ctr_expend_fund, --中央专项实际支出
           discipline_const_fund.lcl_budg_fund, --地方专项预算经费
           discipline_const_fund.lcl_receive_fund, --地方专项实际到账
           discipline_const_fund.lcl_expend_fund, --地方专项实际支出
           discipline_const_fund.self_budg_fund, --学科自筹预算经费
           discipline_const_fund.self_receive_fund, --学科自筹实际到账
           discipline_const_fund.self_expend_fund, --学科自筹实际支出
           discipline_const_fund.other_budg_fund, --其他预算经费
           discipline_const_fund.other_receive_fund, --其他实际到账
           discipline_const_fund.other_expend_fund --其他实际支出
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
           AND discipline_const_fund.yr IN (2022) --传年份参数
          ) AS b
         ORDER BY total_fund DESC
         LIMIT 10`
        console.log("========gov_overview_listen_01- find data =========");
        client.query(sql2, function(err, results){
            if (err) {
              // 异常后调用callback并传入err
              return res.send({
                status: 1,
                message: err.message
              })
            } else if (results.rowCount == 0) {
              // 当前sql查询为空，则返回填报提示
              findData = []
            } else {
              findData = results.rows
              res.send({
                status: 0,
                // data: results.rows
                evaluationData: evaluationData,
                rankData: [],
                findData: findData
              })
            }
          })
        }
      });
}

// 整体 - 02 - 国家级教学成果奖数量
exports.gov_overview_listen_02_awards = function(req,res){
    userinfo = req.user
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.achv_num) AS rc_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		COUNT(teaching_achv.id) AS achv_num 	--教学成果数量
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
		AND teaching_achv.award_ltype = '国家级教学成果奖'
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
            data: []
        })
        } else {
          console.log("========gov_overview_listen_02_awards =========");
          res.send({
            status: 0,
            data: results.rows
          })
        }
      });
}
// 整体 - 02 - 人才培养基地
exports.gov_overview_listen_02_platform = function(req,res){
    userinfo = req.user
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.plat_num) AS rc_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		COUNT(talent_platbase_const.id) AS plat_num 	--平台数量
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
		AND talent_platbase_const.plat_base_level = '国家级'
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
            data: []
        })
        } else {
          console.log("========gov_overview_listen_02_platform =========");
          res.send({
            status: 0,
            data: results.rows
          })
        }
      });
}

// 整体 - 03 - 国家级团队数量
exports.gov_overview_listen_03_leader = function(req,res){
    userinfo = req.user
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.team_num) AS rc_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		COUNT(talent_team.id) AS team_num 	--团队数量
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
	INNER JOIN talent_team 
		ON a.univ_code = talent_team.univ_code AND a.discipline_code = talent_team.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = talent_team.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND talent_team.is_delete = '0' 
		AND talent_team.talent_or_team = '团队'
		AND talent_team.level = '国家级'
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
                data: []
            })
        } else {
            var results_to_data = results.rows.map(function (item) {
                if(item.rc_num!=0){
                    return {
                        dis_name: item.dis_name,
                        rc_num: item.rc_num
                    }
                }
            }).filter(Boolean)
          console.log("========gov_overview_listen_03_leader =========");
          res.send({
            status: 0,
            data: results_to_data
          })
        }
      });
}
// 整体 - 03 - 国家级学术领军人才
exports.gov_overview_listen_03_leadernum = function(req,res){
    userinfo = req.user
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.team_num) AS rc_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		COUNT(talent_team.id) AS team_num 	--团队数量
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
	INNER JOIN talent_team 
		ON a.univ_code = talent_team.univ_code AND a.discipline_code = talent_team.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = talent_team.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND talent_team.is_delete = '0' 
		AND talent_team.talent_or_team = '人才'
		AND talent_team.level = '国家级'
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
                data: []
            })
        } else {
            var results_to_data = results.rows.map(function (item) {
                if(item.rc_num!=0){
                    return {
                        dis_name: item.dis_name,
                        rc_num: item.rc_num
                    }
                }
            }).filter(Boolean)
          console.log("========gov_overview_listen_03_leadernum =========");
          res.send({
            status: 0,
            data: results_to_data
          })
        }
      });
}
// 整体 - 03 - 外籍专任教师数量
exports.gov_overview_listen_03_foreign = function(req,res){
    userinfo = req.user
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.ftch_num) AS rc_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		foreign_fulltch.sum_full_ftch AS ftch_num 	--外教数量
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
		AND foreign_fulltch.is_delete = '0' 
		AND foreign_fulltch.yr = '2021-2022'	--学年参数，为YYYY-YYYY格式
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		foreign_fulltch.sum_full_ftch
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
            data: []
        })
        } else {
            var results_to_data = results.rows.map(function (item) {
                    if(item.rc_num!=0){
                        return {
                            dis_name: item.dis_name,
                            rc_num: item.rc_num
                        }
                    }
                }).filter(Boolean)
            console.log("========gov_overview_listen_03_foreign =========");
            res.send({
                status: 0,
                data: results_to_data
            })
        }
      });
}
// 整体 - 03 - 担任重要期刊负责人
exports.gov_overview_listen_03_response = function(req,res){
    userinfo = req.user
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.head_num) AS rc_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		COUNT(tch_head_jour.id) AS head_num 	--担任国内外重要期刊负责人情况数量
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
	INNER JOIN tch_head_jour 
		ON a.univ_code = tch_head_jour.univ_code AND a.discipline_code = tch_head_jour.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = tch_head_jour.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND tch_head_jour.is_delete = '0' 
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
            data: []
        })
        } else {
            var results_to_data = results.rows.map(function (item) {
                    if(item.rc_num!=0){
                        return {
                            dis_name: item.dis_name,
                            rc_num: item.rc_num
                        }
                    }
                }).filter(Boolean)
            console.log("========gov_overview_listen_03_foreign =========");
            res.send({
                status: 0,
                data: results_to_data
            })
        }
      });
}
// 整体 - 03 - 担任国际比赛负责人
exports.gov_overview_listen_03_contest = function(req,res){
    userinfo = req.user
    sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.head_num) AS rc_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		COUNT(tch_judge_comp.id) AS head_num 	--教师担任国际比赛评委、裁判人员清单情况数量
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
	INNER JOIN tch_judge_comp 
		ON a.univ_code = tch_judge_comp.univ_code AND a.discipline_code = tch_judge_comp.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = tch_judge_comp.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND tch_judge_comp.is_delete = '0' 
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
            data: []
        })
        } else {
            var results_to_data = results.rows.map(function (item) {
                    if(item.rc_num!=0){
                        return {
                            dis_name: item.dis_name,
                            rc_num: item.rc_num
                        }
                    }
                }).filter(Boolean)
            console.log("========gov_overview_listen_03_contest =========");
            res.send({
                status: 0,
                data: results_to_data
            })
        }
      });
}


// 整体 - 04 - 国内外发表顶级期刊
exports.gov_overview_listen_04_top = function(req,res){
  userinfo = req.user
  sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.paper_num) AS rc_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		COUNT(tch_paper.id) AS paper_num 	--教师担任国际比赛评委、裁判人员清单情况数量
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
		AND tch_paper.jour_level = '国内外顶级期刊' 
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
          data: []
      })
      } else {
          var results_to_data = results.rows.map(function (item) {
                  if(item.rc_num!=0){
                      return {
                          dis_name: item.dis_name,
                          rc_num: item.rc_num
                      }
                  }
              }).filter(Boolean)
          console.log("========gov_overview_listen_04_top =========");
          res.send({
              status: 0,
              data: results_to_data
          })
      }
    });
}
// 整体 - 04 - 国家级科研平台数量
exports.gov_overview_listen_04_research = function(req,res){
  userinfo = req.user
  sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.plat_num) AS rc_num
FROM
(
SELECT
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name,
		COUNT(sci_innova_plat.id) AS plat_num 	--教师担任国际比赛评委、裁判人员清单情况数量
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
		AND sci_innova_plat.palt_level = '国家级' 
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	) AS b
GROUP BY 
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
          data: []
      })
      } else {
          var results_to_data = results.rows.map(function (item) {
                  if(item.rc_num!=0){
                      return {
                          dis_name: item.dis_name,
                          rc_num: item.rc_num
                      }
                  }
              }).filter(Boolean)
          console.log("========gov_overview_listen_04_research =========");
          res.send({
              status: 0,
              data: results_to_data
          })
      }
    });
}
// 整体 - 04 - 学科主持国家重点重大项目数量
exports.gov_overview_listen_04_hold = function(req,res){
  userinfo = req.user
  sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.xm_num) AS rc_num
FROM
(
	SELECT
		a.univ_name,
		a.discipline_name,
		COUNT(host_sciproj.id) AS xm_num	--项目数量
	FROM
	((
	SELECT
		univ_discipline.univ_code,
		univ_discipline.discipline_code,
		univ_discipline.univ_name,
		univ_discipline.subtag1 AS discipline_name
	FROM univ_discipline
	WHERE univ_discipline.tag1='学科群' AND univ_discipline.tag2='突击队'
	)
	UNION
	(
	SELECT
		univ_discipline.univ_code,
		univ_discipline.discipline_code,
		univ_discipline.univ_name,
		univ_discipline.discipline_name
	FROM univ_discipline
	WHERE univ_discipline.tag1='一流学科建设名单' AND univ_discipline.tag2='突击队'
	)) AS a
	INNER JOIN host_sciproj 
		ON a.univ_code = host_sciproj.univ_code AND a.discipline_code = host_sciproj.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = host_sciproj.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND host_sciproj.is_delete = '0' 
		AND host_sciproj.proj_level = '国家重点重大项目'
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	)AS b
GROUP BY
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
          data: []
      })
      } else {
          var results_to_data = results.rows.map(function (item) {
                  if(item.rc_num!=0){
                      return {
                          dis_name: item.dis_name,
                          rc_num: item.rc_num
                      }
                  }
              }).filter(Boolean)
          console.log("========gov_overview_listen_04_hold =========");
          res.send({
              status: 0,
              data: results_to_data
          })
      }
    });
}


// 整体 - 05 - 国家级产教融合平台数
exports.gov_overview_listen_05_platform = function(req,res){
  userinfo = req.user
  sql = `SELECT 
	concat_ws('-',b.univ_name,b.discipline_name) AS dis_name,
	SUM(b.plat_num) AS rc_num
FROM
(
	SELECT
		a.univ_name,
		a.discipline_name,
		COUNT(prodedu_plat.id) AS plat_num	--项目数量
	FROM
	((
	SELECT
		univ_discipline.univ_code,
		univ_discipline.discipline_code,
		univ_discipline.univ_name,
		univ_discipline.subtag1 AS discipline_name
	FROM univ_discipline
	WHERE univ_discipline.tag1='学科群' AND univ_discipline.tag2='突击队'
	)
	UNION
	(
	SELECT
		univ_discipline.univ_code,
		univ_discipline.discipline_code,
		univ_discipline.univ_name,
		univ_discipline.discipline_name
	FROM univ_discipline
	WHERE univ_discipline.tag1='一流学科建设名单' AND univ_discipline.tag2='突击队'
	)) AS a
	INNER JOIN prodedu_plat 
		ON a.univ_code = prodedu_plat.univ_code AND a.discipline_code = prodedu_plat.discipline_code
	INNER JOIN user_fill 
		ON user_fill.id = prodedu_plat.user_fill_id
	WHERE 
		user_fill.is_delete = '0' 
		AND prodedu_plat.is_delete = '0' 
		AND prodedu_plat.plat_level = '国家级'
	GROUP BY
		a.univ_code,
		a.discipline_code,
		a.univ_name,
		a.discipline_name
	)AS b
GROUP BY
	b.univ_name,
	b.discipline_name
ORDER BY rc_num DESC
LIMIT 10`
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
          data: []
      })
      } else {
          var results_to_data = results.rows.map(function (item) {
                  if(item.rc_num!=0){
                      return {
                          dis_name: item.dis_name,
                          rc_num: item.rc_num
                      }
                  }
              }).filter(Boolean)
          console.log("========gov_overview_listen_05_platform =========");
          res.send({
              status: 0,
              data: results_to_data
          })
      }
    });
}