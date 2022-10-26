// 导入数据库操作模块
const client = require('../../db/index')
const async = require('async');

// 省厅查看 突击队学科 （柱状图对比数据）
exports.gov_compare_subject = function (req, res) {
	var userinfo = req.user
	var params = req.body.params
	console.log(params)
	// 字符串转array
	// params = JSON.parse(params)
	// console.log(params)
	var arr = []
	var sqls = []
	for (let i = 0, len = params.length; i < len; i++) {
		arr[i] = params[i].split('-')
		arr[i][0] = '\'' + arr[i][0] + '\''
		arr[i][1] = '\'' + arr[i][1] + '\''
	}
	console.log(arr)

	// subject的顺序 === arr内的顺序 === sql执行的顺序
	var subject = []
	for(var i = 0 ; i < arr.length; i++){
		var temp_json = {}
		temp_json.school = arr[i][0].substring(1, arr[i][0].length-1)
		temp_json.subject = arr[i][1].substring(1, arr[i][1].length-1)
		subject[i]=temp_json
	}
	console.log(subject);

	// 学科群和学科的sql代码前缀
	let sql_qun_prefix = `SELECT
	b.subtag1 AS dis_name,
	MIN(b.de_result) AS de_result,                                  ---该轮次评估结果
	MIN( cast(b.xk_rank as integer )) AS xk_rank,                                           ---学科排名
	SUM(b.t_f) AS t_f,                                                      ---学科建设年度总经费
	SUM(b.jxgj_count) AS jxgj_count,                                        ---学科国家级教学成果奖统计
	SUM(b.kcgj_count) AS kcgj_count,                                        ---学科国家级一流课程建设数统计
	SUM(b.ptgj_count) AS ptgj_count,                                        ---学科国家级人才培养平台/基地统计
	SUM(b.skjs_num) AS skjs_num,                                            ---某个年度某个学期给本科生上课的正教授人数
	SUM(b.phd_num) AS phd_num,                                              ---年度学科授予博士学位数
	SUM(b.tdgj_count) AS dgj_count,                                 ---学科国家级团队数量统计
	SUM(b.rcgj_count) AS rcgj_count,                                        ---学科国家级学术领军人才（含青年人才）数量
	SUM(b.ft_num) AS ft_num,                                                  ---年度学科专任教师数量
	SUM(b.pr_sum) AS pr_sum,                                                        ---学科博士后和科研助理数量
	SUM(b.ds_tf) AS ds_tf,                                            ---学科年度经费总额
	SUM(b.thj_count) AS thj_count,                            ---教师担任国内外重要期刊负责人数量统计
	SUM(b.tha_count) AS tha_count,                                  ---教师在国内外重要学术组织任职主要负责人数量统计
	SUM(b.taa_count) AS taa_count,                                  ---教师参加本领域重要学术会议并作报告人员数统计
	SUM(b.tjc_count) AS tjc_count,                                  ---教师参加本领域重要学术会议并作报告人员数量统计
	SUM(b.ta_count) AS ta_count,                                            ---教师获国家级奖项数量统计
	SUM(b.tp_count) AS tp_count,                                            ---国内外顶级期刊发表论文数量统计
	SUM(b.ud_count) AS ud_count,                                            ---承担国内外重大设计与展演任务数量统计
	SUM(b.hs_count) AS hs_count,                                            ---主持国家重点重大项目数量统计
	SUM(b.h_fund) AS h_fund,                                              ---指定年度横向经费数额总和
					SUM(b.z_fund) AS z_fund,  																						---指定年度纵向经费数额总和
	SUM(b.atu_fund) AS atu_fund,                                            ---年度成果转化到校经费数
	SUM(b.pp_count) AS pp_count,                                            ---国家级产教融合平台建设统计
	SUM(b.cp_count) AS cp_count                                     ---国家领导人肯定性批示统计
FROM
(
	SELECT
			all_xk.un_code,     ---院校代码
			all_xk.dis_code,                ---学科代码
			all_xk.un_name,                 ---院校名称
			all_xk.dis_name,                        ---学科名称
			tag1,                                                           ---一流学科建设名单还是学科群
			subtag1,                                                ---乱七八糟或者学科群名称
			subsubtag1,                                     ---学科群的话，是主干还是辅助
			de_turn,                                        ---学科评估轮次
			de_result,                                      ---该轮次评估结果
			xki_yr,                                                 ---学科影响力年份
			rk_type,                                                ---学科影响力类别
			xk_rank,                                                ---学科排名
			t_f,                                                    ---学科建设年度总经费
			jxgj_count,                                     ---学科国家级教学成果奖统计
			kcgj_count,                                     ---学科国家级一流课程建设数统计
			ptgj_count,                                     ---学科国家级人才培养平台/基地统计
			skjs_num,                                               ---某个年度某个学期给本科生上课的正教授人数
			phd_num,                                                ---年度学科授予博士学位数
			tdgj_count,                                     ---学科国家级团队数量统计
			rcgj_count,                                     ---学科国家级学术领军人才（含青年人才）数量
			ft_num,                                           ---年度学科专任教师数量
			pr_sum,                                                 ---学科博士后和科研助理数量
			ds_tf,                                            ---学科年度经费总额
			thj_count,                                ---教师担任国内外重要期刊负责人数量统计
			tha_count,                                      ---教师在国内外重要学术组织任职主要负责人数量统计
			taa_count,                                      ---教师参加本领域重要学术会议并作报告人员数统计
			tjc_count,                                      ---教师参加本领域重要学术会议并作报告人员数量统计
			ta_count,                                               ---教师获国家级奖项数量统计
			tp_count,                                               ---国内外顶级期刊发表论文数量统计
			ud_count,                                               ---承担国内外重大设计与展演任务数量统计
			hs_count,                                               ---主持国家重点重大项目数量统计
			h_fund,                                                ---指定年度纵横向经费数额总和
									z_fund,
			atu_fund,                                               ---年度成果转化到校经费数
			pp_count,                                               ---国家级产教融合平台建设统计
			cp_count                                                ---国家领导人肯定性批示统计
	FROM
	(
	SELECT
			univ_discipline.univ_code as un_code,
			univ_discipline.discipline_code as dis_code,
			univ_discipline.univ_name as un_name,
			univ_discipline.discipline_name as dis_name,
			tag1,
			subtag1,
			subsubtag1
	FROM
			univ_discipline
	) as all_xk
	LEFT JOIN (
	SELECT
			univ_code,
			discipline_code,
			discipline_eval_turn as de_turn,
			discipline_eval_result as de_result
	FROM
			discipline_eval
			INNER JOIN user_fill ON user_fill.ID = discipline_eval.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1'
			AND discipline_eval.is_delete = '0'
			AND discipline_eval.discipline_eval_turn = '4'  ---后端修改学科评估轮次
	) as a1 ON a1.univ_code = all_xk.un_code AND a1.discipline_code = all_xk.dis_code
	LEFT JOIN(
			SELECT
			univ_code,
			discipline_code,
			yr as xki_yr,  ----学科影响力年份
			rank_type as rk_type, ----学科影响力类别
			rank as xk_rank ----学科排名
	FROM
			discipline_influ
			INNER JOIN user_fill ON user_fill.ID = discipline_influ.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1'
			AND discipline_influ.is_delete = '0'
			AND rank_type = '软科'  --后端改参数
	) as a2 ON a2.univ_code = all_xk.un_code AND a2.discipline_code = all_xk.dis_code
	LEFT JOIN(
			SELECT
			univ_code,
			discipline_code,
			total_fund as t_f ---学科建设总经费
	FROM
			discipline_const_fund
			INNER JOIN user_fill ON user_fill.ID = discipline_const_fund.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND discipline_const_fund.is_delete = '0'
	) as a3 ON a3.univ_code = all_xk.un_code AND a3.discipline_code = all_xk.dis_code
	LEFT JOIN(
			SELECT
			univ_code,
			discipline_code,
			COUNT(teaching_achv.id) as jxgj_count ---学科国家级教学成果奖统计
	FROM
			teaching_achv
			INNER JOIN user_fill ON user_fill.ID = teaching_achv.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND teaching_achv.is_delete = '0'
			AND teaching_achv.award_ltype = '国家级教学成果奖'
	GROUP BY
			univ_code,
			discipline_code
	)as a4 ON a4.univ_code = all_xk.un_code AND a4.discipline_code = all_xk.dis_code
	LEFT JOIN (
	SELECT
			univ_code,
			discipline_code,
			COUNT(firstclass_course_const.id) as kcgj_count ---学科国家级一流课程建设数统计
	FROM
			firstclass_course_const
			INNER JOIN user_fill ON user_fill.ID = firstclass_course_const.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND firstclass_course_const.is_delete = '0'
			AND firstclass_course_const.cour_type = '国家级一流本科课程'
	GROUP BY
			univ_code,
			discipline_code
	)as a5 ON a5.univ_code = all_xk.un_code AND a5.discipline_code = all_xk.dis_code
	LEFT JOIN (
	SELECT
			univ_code,
			discipline_code,
			COUNT(talent_platbase_const.id) as ptgj_count ---学科国家级一流课程建设数统计
	FROM
			talent_platbase_const
			INNER JOIN user_fill ON user_fill.ID = talent_platbase_const.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND talent_platbase_const.is_delete = '0'
			AND talent_platbase_const.plat_base_type = '国家级人才培养平台'
	GROUP BY
			univ_code,
			discipline_code
	)as a6 ON a6.univ_code = all_xk.un_code AND a6.discipline_code = all_xk.dis_code
	LEFT JOIN (
	SELECT
			univ_code,
			discipline_code,
			fullprof_tch_underg.num_full_prof_teach_underg as skjs_num ---某个年度某个学期给本科生上课的正教授人数
	FROM
			fullprof_tch_underg
			INNER JOIN user_fill ON user_fill.ID = fullprof_tch_underg.2021-2user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND fullprof_tch_underg.is_delete = '0'
			AND fullprof_tch_underg.yr = '2021-2022'    ---改年度
			AND fullprof_tch_underg.sem = '2'           ---改学期
	)as a7 ON a7.univ_code = all_xk.un_code AND a7.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			ann_award_bdmdphd.yr as phd_yr,
			ann_award_bdmdphd.award_phd_num as phd_num  ---年度学科授予博士学位数
	FROM
			ann_award_bdmdphd
			INNER JOIN user_fill ON user_fill.ID = ann_award_bdmdphd.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND ann_award_bdmdphd.is_delete = '0'
			AND ann_award_bdmdphd.yr = '2021-2022' ---修改年度
	)as a8 ON a8.univ_code = all_xk.un_code AND a8.discipline_code = all_xk.dis_code
	LEFT JOIN (
	SELECT
			univ_code,
			discipline_code,
			COUNT(talent_team.id) as tdgj_count ---学科国家级团队数量统计
	FROM
			talent_team
			INNER JOIN user_fill ON user_fill.ID = talent_team.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND talent_team.is_delete = '0'
			AND talent_team.talent_or_team = '团队'
			AND talent_team."level" = '国家级'
	GROUP BY
			univ_code,
			discipline_code
	)as a9 ON a9.univ_code = all_xk.un_code AND a9.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(talent_team.id) as rcgj_count ---学科国家级团队数量统计
	FROM
			talent_team
			INNER JOIN user_fill ON user_fill.ID = talent_team.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND talent_team.is_delete = '0'
			AND talent_team.talent_or_team = '人才'
			AND talent_team."level" = '国家级'
	GROUP BY
			univ_code,
			discipline_code
	)as a10 ON a10.univ_code = all_xk.un_code AND a10.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			fulltch.yr as ft_yr,
			fulltch.full_tch_num as ft_num  ---年度学科专任教师数量
	FROM
			fulltch
			INNER JOIN user_fill ON user_fill.ID = fulltch.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND fulltch.is_delete = '0'
			AND fulltch.yr = '2021-2022' ---修改年度
	)as a11 ON a11.univ_code = all_xk.un_code AND a11.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			pdoc_ra.yr as pr_yr,
			in_postdoc_newinc + out_postdoc_newinc + univ_ra_newinc + inst_ra_newinc + task_ra_newinc as pr_sum ---博士后和科研助理数量
	FROM
			pdoc_ra
			INNER JOIN user_fill ON user_fill.ID = pdoc_ra.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND pdoc_ra.is_delete = '0'
			AND pdoc_ra.yr = '2021'
	)as a12 ON a12.univ_code = all_xk.un_code AND a12.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			discipline_const_fund.yr as dcf_yr,
			discipline_const_fund.total_fund as ds_tf ---学科年度经费总额
	FROM
			discipline_const_fund
			INNER JOIN user_fill ON user_fill.ID = discipline_const_fund.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND discipline_const_fund.is_delete = '0'
			AND discipline_const_fund.yr = '2022'
	)as a13 ON a13.univ_code = all_xk.un_code AND a13.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(tch_head_jour.id) as thj_count ---教师担任国内外重要期刊负责人数量统计
	FROM
			tch_head_jour
			INNER JOIN user_fill ON user_fill.ID = tch_head_jour.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_head_jour.is_delete = '0'
	GROUP BY
			univ_code,
			discipline_code
	)as a14 ON a14.univ_code = all_xk.un_code AND a14.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(tch_head_acorg.id) as tha_count ---教师在国内外重要学术组织任职主要负责人数量统计
	FROM
			tch_head_acorg
			INNER JOIN user_fill ON user_fill.ID = tch_head_acorg.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_head_acorg.is_delete = '0'
	GROUP BY
			univ_code,
			discipline_code
	)as a15 ON a15.univ_code = all_xk.un_code AND a15.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(tch_attdrpt_acconf.id) as taa_count ---教师参加本领域重要学术会议并作报告人员数统计
	FROM
			tch_attdrpt_acconf
			INNER JOIN user_fill ON user_fill.ID = tch_attdrpt_acconf.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_attdrpt_acconf.is_delete = '0'
			AND tch_attdrpt_acconf.yr = '2021'
	GROUP BY
			univ_code,
			discipline_code
	)as a16 ON a16.univ_code = all_xk.un_code AND a16.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(tch_judge_comp.id) as tjc_count ---教师参加本领域重要学术会议并作报告人员数量统计
	FROM
			tch_judge_comp
			INNER JOIN user_fill ON user_fill.ID = tch_judge_comp.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_judge_comp.is_delete = '0'
	GROUP BY
			univ_code,
			discipline_code
	)as a17 ON a17.univ_code = all_xk.un_code AND a17.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(tch_award.id) as ta_count ---教师获国家级奖项数量统计
	FROM
			tch_award
			INNER JOIN user_fill ON user_fill.ID = tch_award.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_award.is_delete = '0'
			AND tch_award."level" = '国家级'
	GROUP BY
			univ_code,
			discipline_code
	)as a18 ON a18.univ_code = all_xk.un_code AND a18.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(tch_paper.id) as tp_count ---国内外顶级期刊发表论文数量统计
	FROM
			tch_paper
			INNER JOIN user_fill ON user_fill.ID = tch_paper.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_paper.is_delete = '0'
			AND tch_paper.jour_level = '国内外顶级期刊'
	GROUP BY
			univ_code,
			discipline_code
	)as a19 ON a19.univ_code = all_xk.un_code AND a19.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(utk_desgshow.id) as ud_count ---承担国内外重大设计与展演任务数量统计
	FROM
			utk_desgshow
			INNER JOIN user_fill ON user_fill.ID = utk_desgshow.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND utk_desgshow.is_delete = '0'
	GROUP BY
			univ_code,
			discipline_code
	)as a20 ON a20.univ_code = all_xk.un_code AND a20.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(host_sciproj.id) as hs_count ---主持国家重点重大项目数量统计
	FROM
			host_sciproj
			INNER JOIN user_fill ON user_fill.ID = host_sciproj.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND host_sciproj.is_delete = '0'
			AND host_sciproj.proj_level = '国家重点重大项目'
	GROUP BY
			univ_code,
			discipline_code
	)as a21 ON a21.univ_code = all_xk.un_code AND a21.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			touniv_scifund.yr as zh_yr,
			SUM(total_fund) as h_fund ---年度纵横向经费总和
	FROM
			touniv_scifund
			INNER JOIN user_fill ON user_fill.ID = touniv_scifund.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND touniv_scifund.is_delete = '0' AND touniv_scifund.subj_type = '横向'
	GROUP BY
			univ_code,
			discipline_code,
			touniv_scifund.yr
	)as a22 ON a22.univ_code = all_xk.un_code AND a22.discipline_code = all_xk.dis_code
					LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			touniv_scifund.yr as zh_yr,
			SUM(total_fund) as z_fund ---年度纵横向经费总和
	FROM
			touniv_scifund
			INNER JOIN user_fill ON user_fill.ID = touniv_scifund.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND touniv_scifund.is_delete = '0'  AND touniv_scifund.subj_type = '纵向'							
	GROUP BY
			univ_code,
			discipline_code,
			touniv_scifund.yr
	)as a26 ON a26.univ_code = all_xk.un_code AND a26.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			achv_to_univfund.yr as atu_yr,
			SUM(achv_to_univfund.achv_to_univfund) as atu_fund ---年度成果转化到校经费数
	FROM
			achv_to_univfund
			INNER JOIN user_fill ON user_fill.ID = achv_to_univfund.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND achv_to_univfund.is_delete = '0' 		
	GROUP BY
			univ_code,
			discipline_code,
			atu_yr
	)as a23 ON a23.univ_code = all_xk.un_code AND a23.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(prodedu_plat.id) as pp_count ---国家级产教融合平台建设统计
	FROM
			prodedu_plat
			INNER JOIN user_fill ON user_fill.ID = prodedu_plat.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND prodedu_plat.is_delete = '0'
			AND prodedu_plat.plat_level = '国家级'
	GROUP BY
			univ_code,
			discipline_code
	)as a24 ON a24.univ_code = all_xk.un_code AND a24.discipline_code = all_xk.dis_code
	LEFT JOIN(
	SELECT
			univ_code,
			discipline_code,
			COUNT(consult_policy.id) as cp_count ---国家领导人肯定性批示统计
	FROM
			consult_policy
			INNER JOIN user_fill ON user_fill.ID = consult_policy.user_fill_id
	WHERE
			user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND consult_policy.is_delete = '0'
			AND consult_policy."level" = '国家级'
			AND consult_policy.adopt_sit = '已采纳'
	GROUP BY
			univ_code,
			discipline_code
	)as a25 ON a25.univ_code = all_xk.un_code AND a25.discipline_code = all_xk.dis_code
	WHERE`
	let sql_xueke_prefix = `SELECT
	all_xk.un_code,     ---院校代码
	all_xk.dis_code,		---学科代码
	all_xk.un_name,			---院校名称
	all_xk.dis_name,			---学科名称
	tag1,								---一流学科建设名单还是学科群
	subtag1,						---乱七八糟或者学科群名称
	subsubtag1,					---学科群的话，是主干还是辅助
	de_turn,  					---学科评估轮次
	de_result,					---该轮次评估结果
	xki_yr, 						---学科影响力年份
	rk_type,						---学科影响力类别
	xk_rank,						---学科排名
	t_f,							---学科建设年度总经费
	jxgj_count,					---学科国家级教学成果奖统计
	kcgj_count,					---学科国家级一流课程建设数统计
	ptgj_count,					---学科国家级人才培养平台/基地统计
	skjs_num,						---某个年度某个学期给本科生上课的正教授人数
	phd_num,						---年度学科授予博士学位数
	tdgj_count,					---学科国家级团队数量统计
	rcgj_count,					---学科国家级学术领军人才（含青年人才）数量
	ft_num,						  ---年度学科专任教师数量
	pr_sum,							---学科博士后和科研助理数量
	ds_tf,						  ---学科年度经费总额
	thj_count,				  ---教师担任国内外重要期刊负责人数量统计
	tha_count,					---教师在国内外重要学术组织任职主要负责人数量统计
	taa_count,					---教师参加本领域重要学术会议并作报告人员数统计
	tjc_count,					---教师参加本领域重要学术会议并作报告人员数量统计
	ta_count,						---教师获国家级奖项数量统计
	tp_count,						---国内外顶级期刊发表论文数量统计
	ud_count,						---承担国内外重大设计与展演任务数量统计
	hs_count,						---主持国家重点重大项目数量统计
	h_fund,						---指定年度纵横向经费数额总和
	z_fund,						---指定年度纵横向经费数额总和
	atu_fund,						---年度成果转化到校经费数
	pp_count,						---国家级产教融合平台建设统计
	cp_count						---国家领导人肯定性批示统计
FROM
(
SELECT
	univ_discipline.univ_code as un_code,
	univ_discipline.discipline_code as dis_code,
	univ_discipline.univ_name as un_name,
	univ_discipline.discipline_name as dis_name,
	tag1,
	subtag1,
	subsubtag1
FROM
	univ_discipline
) as all_xk
LEFT JOIN (
SELECT
	univ_code,
	discipline_code,
	discipline_eval_turn as de_turn,
	discipline_eval_result as de_result
FROM
	discipline_eval
	INNER JOIN user_fill ON user_fill.ID = discipline_eval.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND discipline_eval.is_delete = '0'
	AND discipline_eval.discipline_eval_turn = '4'  ---后端修改学科评估轮次
) as a1 ON a1.univ_code = all_xk.un_code AND a1.discipline_code = all_xk.dis_code
LEFT JOIN(
	SELECT
	univ_code,
	discipline_code,
	yr as xki_yr,  ----学科影响力年份
	rank_type as rk_type, ----学科影响力类别
	rank as xk_rank ----学科排名
FROM
	discipline_influ
	INNER JOIN user_fill ON user_fill.ID = discipline_influ.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND discipline_influ.is_delete = '0'
	AND rank_type = '软科'
) as a2 ON a2.univ_code = all_xk.un_code AND a2.discipline_code = all_xk.dis_code
LEFT JOIN(
	SELECT
	univ_code,
	discipline_code,
	total_fund as t_f ---学科建设总经费
FROM
	discipline_const_fund
	INNER JOIN user_fill ON user_fill.ID = discipline_const_fund.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND discipline_const_fund.is_delete = '0'
) as a3 ON a3.univ_code = all_xk.un_code AND a3.discipline_code = all_xk.dis_code
LEFT JOIN(
	SELECT
	univ_code,
	discipline_code,
	COUNT(teaching_achv.id) as jxgj_count ---学科国家级教学成果奖统计
FROM
	teaching_achv
	INNER JOIN user_fill ON user_fill.ID = teaching_achv.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND teaching_achv.is_delete = '0'
	AND teaching_achv.award_ltype = '国家级教学成果奖'
GROUP BY
	univ_code,
	discipline_code
)as a4 ON a4.univ_code = all_xk.un_code AND a4.discipline_code = all_xk.dis_code
LEFT JOIN (
SELECT
	univ_code,
	discipline_code,
	COUNT(firstclass_course_const.id) as kcgj_count ---学科国家级一流课程建设数统计
FROM
	firstclass_course_const
	INNER JOIN user_fill ON user_fill.ID = firstclass_course_const.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND firstclass_course_const.is_delete = '0'
	AND firstclass_course_const.cour_type = '国家级一流本科课程'
GROUP BY
	univ_code,
	discipline_code
)as a5 ON a5.univ_code = all_xk.un_code AND a5.discipline_code = all_xk.dis_code
LEFT JOIN (
SELECT
	univ_code,
	discipline_code,
	COUNT(talent_platbase_const.id) as ptgj_count ---学科国家级一流课程建设数统计
FROM
	talent_platbase_const
	INNER JOIN user_fill ON user_fill.ID = talent_platbase_const.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND talent_platbase_const.is_delete = '0'
	AND talent_platbase_const.plat_base_type = '国家级人才培养平台'
GROUP BY
	univ_code,
	discipline_code
)as a6 ON a6.univ_code = all_xk.un_code AND a6.discipline_code = all_xk.dis_code
LEFT JOIN (
SELECT
	univ_code,
	discipline_code,
	fullprof_tch_underg.num_full_prof_teach_underg as skjs_num ---某个年度某个学期给本科生上课的正教授人数
FROM
	fullprof_tch_underg
	INNER JOIN user_fill ON user_fill.ID = fullprof_tch_underg.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND fullprof_tch_underg.is_delete = '0'
	AND fullprof_tch_underg.yr = '2021-2022'    ---改年度
	AND fullprof_tch_underg.sem = '2'           ---改学期
)as a7 ON a7.univ_code = all_xk.un_code AND a7.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	ann_award_bdmdphd.yr as phd_yr,
	ann_award_bdmdphd.award_phd_num as phd_num  ---年度学科授予博士学位数
FROM
	ann_award_bdmdphd
	INNER JOIN user_fill ON user_fill.ID = ann_award_bdmdphd.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND ann_award_bdmdphd.is_delete = '0'
	AND ann_award_bdmdphd.yr = '2021-2022' ---修改年度
)as a8 ON a8.univ_code = all_xk.un_code AND a8.discipline_code = all_xk.dis_code
LEFT JOIN (
SELECT
	univ_code,
	discipline_code,
	COUNT(talent_team.id) as tdgj_count ---学科国家级团队数量统计
FROM
	talent_team
	INNER JOIN user_fill ON user_fill.ID = talent_team.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND talent_team.is_delete = '0'
	AND talent_team.talent_or_team = '团队'
	AND talent_team."level" = '国家级'
GROUP BY
	univ_code,
	discipline_code
)as a9 ON a9.univ_code = all_xk.un_code AND a9.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(talent_team.id) as rcgj_count ---学科国家级团队数量统计
FROM
	talent_team
	INNER JOIN user_fill ON user_fill.ID = talent_team.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND talent_team.is_delete = '0'
	AND talent_team.talent_or_team = '人才'
	AND talent_team."level" = '国家级'
GROUP BY
	univ_code,
	discipline_code
)as a10 ON a10.univ_code = all_xk.un_code AND a10.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	fulltch.yr as ft_yr,
	fulltch.full_tch_num as ft_num  ---年度学科专任教师数量
FROM
	fulltch
	INNER JOIN user_fill ON user_fill.ID = fulltch.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND fulltch.is_delete = '0'
	AND fulltch.yr = '2021-2022' ---修改年度
)as a11 ON a11.univ_code = all_xk.un_code AND a11.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	pdoc_ra.yr as pr_yr,
	in_postdoc_newinc + out_postdoc_newinc + univ_ra_newinc + inst_ra_newinc + task_ra_newinc as pr_sum ---博士后和科研助理数量
FROM
	pdoc_ra
	INNER JOIN user_fill ON user_fill.ID = pdoc_ra.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND pdoc_ra.is_delete = '0'
	AND pdoc_ra.yr = '2021'
)as a12 ON a12.univ_code = all_xk.un_code AND a12.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	discipline_const_fund.yr as dcf_yr,
	discipline_const_fund.total_fund as ds_tf ---学科年度经费总额
FROM
	discipline_const_fund
	INNER JOIN user_fill ON user_fill.ID = discipline_const_fund.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND discipline_const_fund.is_delete = '0'
	AND discipline_const_fund.yr = '2022'
)as a13 ON a13.univ_code = all_xk.un_code AND a13.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(tch_head_jour.id) as thj_count ---教师担任国内外重要期刊负责人数量统计
FROM
	tch_head_jour
	INNER JOIN user_fill ON user_fill.ID = tch_head_jour.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_head_jour.is_delete = '0'
GROUP BY
	univ_code,
	discipline_code
)as a14 ON a14.univ_code = all_xk.un_code AND a14.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(tch_head_acorg.id) as tha_count ---教师在国内外重要学术组织任职主要负责人数量统计
FROM
	tch_head_acorg
	INNER JOIN user_fill ON user_fill.ID = tch_head_acorg.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_head_acorg.is_delete = '0'
GROUP BY
	univ_code,
	discipline_code
)as a15 ON a15.univ_code = all_xk.un_code AND a15.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(tch_attdrpt_acconf.id) as taa_count ---教师参加本领域重要学术会议并作报告人员数统计
FROM
	tch_attdrpt_acconf
	INNER JOIN user_fill ON user_fill.ID = tch_attdrpt_acconf.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_attdrpt_acconf.is_delete = '0'
	AND tch_attdrpt_acconf.yr = '2021'
GROUP BY
	univ_code,
	discipline_code
)as a16 ON a16.univ_code = all_xk.un_code AND a16.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(tch_judge_comp.id) as tjc_count ---教师参加本领域重要学术会议并作报告人员数量统计
FROM
	tch_judge_comp
	INNER JOIN user_fill ON user_fill.ID = tch_judge_comp.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_judge_comp.is_delete = '0'
GROUP BY
	univ_code,
	discipline_code
)as a17 ON a17.univ_code = all_xk.un_code AND a17.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(tch_award.id) as ta_count ---教师获国家级奖项数量统计
FROM
	tch_award
	INNER JOIN user_fill ON user_fill.ID = tch_award.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_award.is_delete = '0'
	AND tch_award."level" = '国家级'
GROUP BY
	univ_code,
	discipline_code
)as a18 ON a18.univ_code = all_xk.un_code AND a18.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(tch_paper.id) as tp_count ---国内外顶级期刊发表论文数量统计
FROM
	tch_paper
	INNER JOIN user_fill ON user_fill.ID = tch_paper.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND tch_paper.is_delete = '0'
	AND tch_paper.jour_level = '国内外顶级期刊'
GROUP BY
	univ_code,
	discipline_code
)as a19 ON a19.univ_code = all_xk.un_code AND a19.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(utk_desgshow.id) as ud_count ---承担国内外重大设计与展演任务数量统计
FROM
	utk_desgshow
	INNER JOIN user_fill ON user_fill.ID = utk_desgshow.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND utk_desgshow.is_delete = '0'
GROUP BY
	univ_code,
	discipline_code
)as a20 ON a20.univ_code = all_xk.un_code AND a20.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(host_sciproj.id) as hs_count ---主持国家重点重大项目数量统计
FROM
	host_sciproj
	INNER JOIN user_fill ON user_fill.ID = host_sciproj.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND host_sciproj.is_delete = '0'
	AND host_sciproj.proj_level = '国家重点重大项目'
GROUP BY
	univ_code,
	discipline_code
)as a21 ON a21.univ_code = all_xk.un_code AND a21.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	touniv_scifund.yr as zh_yr,
	SUM(total_fund) as h_fund ---年度纵横向经费总和
FROM 
	touniv_scifund
	INNER JOIN user_fill ON user_fill.ID = touniv_scifund.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND touniv_scifund.is_delete = '0' AND subj_type ='横向'
GROUP BY
	univ_code,
	discipline_code,
	touniv_scifund.yr
)as a22 ON a22.univ_code = all_xk.un_code AND a22.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	touniv_scifund.yr as zh_yr,
	SUM(total_fund) as z_fund ---年度纵横向经费总和
FROM 
	touniv_scifund
	INNER JOIN user_fill ON user_fill.ID = touniv_scifund.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND touniv_scifund.is_delete = '0' AND subj_type ='纵向'
GROUP BY
	univ_code,
	discipline_code,
	touniv_scifund.yr
)as a26 ON a26.univ_code = all_xk.un_code AND a6.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	achv_to_univfund.yr as atu_yr,
	SUM(achv_to_univfund.achv_to_univfund) as atu_fund ---年度成果转化到校经费数
FROM
	achv_to_univfund
	INNER JOIN user_fill ON user_fill.ID = achv_to_univfund.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND achv_to_univfund.is_delete = '0'
GROUP BY
	univ_code,
	discipline_code,
	atu_yr
)as a23 ON a23.univ_code = all_xk.un_code AND a23.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(prodedu_plat.id) as pp_count ---国家级产教融合平台建设统计
FROM
	prodedu_plat
	INNER JOIN user_fill ON user_fill.ID = prodedu_plat.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND prodedu_plat.is_delete = '0'
	AND prodedu_plat.plat_level = '国家级'
GROUP BY
	univ_code,
	discipline_code
)as a24 ON a24.univ_code = all_xk.un_code AND a24.discipline_code = all_xk.dis_code
LEFT JOIN(
SELECT
	univ_code,
	discipline_code,
	COUNT(consult_policy.id) as cp_count ---国家领导人肯定性批示统计
FROM
	consult_policy
	INNER JOIN user_fill ON user_fill.ID = consult_policy.user_fill_id 
WHERE
	user_fill.is_delete = '0' 
			AND user_fill.is_seen = '1' AND consult_policy.is_delete = '0'
	AND consult_policy."level" = '国家级'
	AND consult_policy.adopt_sit = '已采纳'
GROUP BY
	univ_code,
	discipline_code
)as a25 ON a25.univ_code = all_xk.un_code AND a25.discipline_code = all_xk.dis_code
	WHERE`
	var sqls = []
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][0] == '\'南昌大学\'') {
			console.log("生成sql：学科群")
			sqls.push(sql_qun_prefix + '(' + 'subtag1=' + arr[i][1] + ' AND tag1=\'学科群\')' + ') AS b GROUP BY b.subtag1') 
		} else {
			console.log("生成sql：学科")
			sqls.push(sql_xueke_prefix + '(' + 'un_name=' + arr[i][0] + ' AND dis_name=' + arr[i][1] + ')') 
		}
	}
	// console.log(sqls[0]);
	var results_all = {}
	results_all.rows = []
	async.eachSeries(sqls, function(item, callback){
		 // 遍历每条SQL并执行
		 client.query(item, function (err, results) {
            if (err) {
                console.error(err.message);
                // 异常后调用callback并传入err
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else if (results.rowCount == 0) {
                err= "无学科/学科群信息"
                callback(err)
            } else {
				results_all.rows.push(results.rows[0])
				callback()
			}
        });
	}, function(err){
		if (err) {
            console.error(err);
            return res.cc(err)
        } else {
            return res.send({
				status: 0,
				// data: results.rows
				subjects: subject,
				data: results_to_front(results_all)
			})
        }
	})
}





// sql查询结果转为前端需要的结构
function results_to_front(results){
	var data = [	
		{
			name: "学科建设进展",
			datas: [["学科评估情况（第四轮）"],["学科影响力情况（软科）"],["本学科建设经费数额（万元）"]]
		},
		{
			name: "培养拔尖创新人才",
			datas: [
				["国家级教学成果奖数量（项）"],
				["国家级一流课程建设数（个）"],
				["国家级人才培养平台/基地（个）"],
				["给本科生上课的正教授数量（位）"],
				["年度授予博士学位数量"]
			]
		},
		{
			name: "建设一流师资队伍",
			datas: [
				["国家级团队数量（个）"],
				["国家级学术领军人才（含青年人才）数量（位）"],
				["学科专任教师数量（位）"],
				["博士后和科研助理数量（位）"],
				["本学科建设经费数额（万元）"],
				["教师担任国内外重要期刊负责人数量（位）"],
				["教师在国内外重要学术组织任职主要负责人数量（位）"],
				["教师参加本领域重要学术会议并作报告人员数量（位）"],
				["教师担任国际比赛评委、裁判人员数量（位）"],

			]
		},
		{
			name: "科学研究",
			datas: [
				["教师获国家级奖项数量（项）"],
				["国内外顶级期刊发表论文数量（篇）"],
				["承担国内外重大设计与展演任务数量（个）"],
				["主持国家重点重大项目数量（项）"],
				["纵向到校科研经费（万元）"],
				["横向到校科研经费（万元）"],
			]
		},
		{
			name: "社会服务",
			datas: [
				["成果到校金额（万元）"],
				["国家级产教融合平台建设（个）"],
				["国家领导人肯定性批示（条）"]
			]
		}
	]
	results.rows.map(function (item){
		//----------------- 学科建设进展
		// 学科评估情况
		data[0].datas[0].push({
			value: item.de_result,
			award: false
		})
		// 学科影响力情况 
		data[0].datas[1].push({
			value: item.xk_rank,
			award: false
		})
		// 本学科建设经费数额（万元）
		data[0].datas[2].push({
			value: item.t_f,
			award: false
		})
		
		//------------------ 培养拔尖创新人才
		// 国家级教学成果奖数量（项）
		data[1].datas[0].push({
			value: item.jxgj_count,
			award: false
		})
		// 国家级一流课程建设数（个）
		data[1].datas[1].push({
			value: item.kcgj_count,
			award: false
		})
		// 国家级人才培养平台/基地（个）
		data[1].datas[2].push({
			value: item.ptgj_count,
			award: false
		})
		// 给本科生上课的正教授数量（位）
		data[1].datas[3].push({
			value: item.skjs_num,
			award: false
		})
		// 年度授予博士学位数量
		data[1].datas[4].push({
			value: item.phd_num,
			award: false
		})

		//------------------ 建设一流师资队伍
		// 国家级团队数量（个）
		data[2].datas[0].push({
			value: item.dgj_count,
			award: false
		})
		// 国家级学术领军人才（含青年人才）数量（位）
		data[2].datas[1].push({
			value: item.rcgj_count,
			award: false
		})
		// 学科专任教师数量（位）
		data[2].datas[2].push({
			value: item.ft_num,
			award: false
		})
		// 博士后和科研助理数量（位）
		data[2].datas[3].push({
			value: item.pr_sum,
			award: false
		})
		// 本学科建设经费数额（万元）
		data[2].datas[4].push({
			value: item.ds_tf,
			award: false
		})
		// 教师担任国内外重要期刊负责人数量（位）
		data[2].datas[5].push({
			value: item.thj_count,
			award: false
		})
		// 教师在国内外重要学术组织任职主要负责人数量（位）
		data[2].datas[6].push({
			value: item.tha_count,
			award: false
		})
		// 教师参加本领域重要学术会议并作报告人员数量（位）
		data[2].datas[7].push({
			value: item.taa_count,
			award: false
		})
		// 教师担任国际比赛评委、裁判人员数量（位）
		data[2].datas[8].push({
			value: item.tjc_count,
			award: false
		})

		//------------------ 科学研究
		// 教师获国家级奖项数量（项）
		data[3].datas[0].push({
			value: item.ta_count,
			award: false
		})
		// 国内外顶级期刊发表论文数量（篇）
		data[3].datas[1].push({
			value: item.tp_count,
			award: false
		})
		// 承担国内外重大设计与展演任务数量（个）
		data[3].datas[2].push({
			value: item.ud_count,
			award: false
		})
		// 主持国家重点重大项目数量（项）
		data[3].datas[3].push({
			value: item.hs_count,
			award: false
		})
		// 纵向到校科研经费（万元）
		data[3].datas[4].push({
			value: item.z_fund,
			award: false
		})
		// 横向到校科研经费（万元）
		data[3].datas[5].push({
			value: item.h_fund,
			award: false
		})

		//------------------ 社会服务
		// 成果到校金额（万元）
		data[4].datas[0].push({
			value: item.atu_fund,
			award: false
		})
		// 国家级产教融合平台建设（个）
		data[4].datas[1].push({
			value: item.pp_count,
			award: false
		})
		// 国家领导人肯定性批示（条）
		data[4].datas[2].push({
			value: item.cp_count,
			award: false
		})
	})
	return data
}

