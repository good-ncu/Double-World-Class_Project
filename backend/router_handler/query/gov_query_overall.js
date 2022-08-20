// 导入数据库操作模块
const client = require('../../db/index')

// 整体 - 01学科建设进展情况
exports.gov_overview_listen_01 = function(req,res){
    userinfo = req.user
    sql = `select * from user_fill`
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
          console.log("========gov_overview_listen_01 =========");
          res.send({
            status: 0,
            // data: results.rows
            evaluationData: [
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "江西财经大学",
                  "subject": "应用经济学"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "江西农业大学",
                  "subject": "畜牧学"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "华东交通大学",
                  "subject": "交通运输工程"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌航空大学",
                  "subject": "环境科学与工程"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "东华理工大学",
                  "subject": "地质资源与地质工程"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "江西中医药大学",
                  "subject": "中药学"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌大学",
                  "subject": "绿色食品学科群"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌大学",
                  "subject": "临床医学"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                }
              ],
              rankData: [
                {
                  "title": "ESI",
                  "rank": 102,
                  "year": 2021,
                  "ave": 100,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "ESI",
                  "rank": 102,
                  "year": 2021,
                  "ave": 101,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "武书连",
                  "rank": 102,
                  "year": 2021,
                  "ave": 102,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "武书连",
                  "rank": 102,
                  "year": 2021,
                  "ave": 103,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "武书连",
                  "rank": 102,
                  "year": 2021,
                  "ave": 104,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "软科",
                  "rank": 102,
                  "year": 2021,
                  "ave": 105,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "软科",
                  "rank": 102,
                  "year": 2021,
                  "ave": 106,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "软科",
                  "rank": 102,
                  "year": 2021,
                  "ave": 107,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "ESI",
                  "rank": 102,
                  "year": 2021,
                  "ave": 108,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "ESI",
                  "rank": 102,
                  "year": 2021,
                  "ave": 109,
                  "school": "南昌大学",
                  "subject": "软件工程"
                }
              ],
              findData:[
                {
                  "key": 1,
                  "yr": 2015,
                  "total_fund": 888,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 2,
                  "yr": 2015,
                  "total_fund": 889,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 3,
                  "yr": 2015,
                  "total_fund": 890,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 4,
                  "yr": 2015,
                  "total_fund": 891,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 5,
                  "yr": 2015,
                  "total_fund": 892,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 6,
                  "yr": 2015,
                  "total_fund": 893,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 7,
                  "yr": 2015,
                  "total_fund": 894,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 8,
                  "yr": 2015,
                  "total_fund": 895,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 9,
                  "yr": 2015,
                  "total_fund": 896,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 10,
                  "yr": 2015,
                  "total_fund": 897,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                }
              ]
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