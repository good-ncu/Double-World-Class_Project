
// 导入数据库操作模块
const client = require('../../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../../config')
// 导入uuid包
const { v4: uuidv4 } = require('uuid');
var async = require('async');

/**
 * 该function用于 学校对其下属学科填报用户初次填报后进行 审核
 * 
 *  任何一条数据 只有在 is_seen=1 ,is_delete=o 的状态下可用
 *  请注意：   填报用户初次提交的一组数据中，只要有一条数据有误，则全部打回重新填。 
 *          即 设置  is_seen=1 ,is_delete=1  flag=0  （其中flag是学校管理员当前打回的数据所在的表格记录置为0，意味着学科填报用户可再次填写该类型数据）
 * 
 * 最后，审核逻辑如下所示：
 * 学校管理员：1、先选择想要审批的学科；2、以填报的一组完整数据为单位，展示对应学科填报用户初次填报的数据
 * 
 * 
 */

/**
 * 第一步   修改zt   ==> 查所有的学科，并且带填报的记录
 * @param {*} req   univ_name（不用传）
 * @param {*} res   tag(学科群还是学科),discipline_name，already_fill_num , need_fill_num, percentage
 */
exports.query_all_discipline = function (req, res) {
    userinfo = req.user
    console.log(userinfo.univ_code);
    sql = `SELECT
	b.tag,
	b.discipline_name AS discipline_name,
	b.already_fill_num,
	COUNT( DISTINCT fill.id)* b.user_num AS need_fill_num
FROM
(
SELECT
	all_xk.tag1 AS tag,
	all_xk.univ_name,
	all_xk.discipline_name,
	COUNT(DISTINCT user_info.id) AS user_num,
	COUNT(a.user_id) AS already_fill_num
FROM
(
	(
		SELECT
			univ_discipline.univ_code,
			univ_discipline.discipline_code,
			univ_discipline.tag1,
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
			univ_discipline.tag1,
			univ_discipline.univ_name,
			univ_discipline.discipline_name
		FROM univ_discipline
		WHERE univ_discipline.tag1='一流学科建设名单'
	)
) AS all_xk 	
LEFT JOIN user_info 
	ON all_xk.discipline_code = user_info.discipline_code AND all_xk.univ_code = user_info.univ_code
LEFT JOIN 
(
	SELECT 
		user_fill.user_id
	FROM user_fill
	WHERE user_fill.fill_id IN (SELECT id FROM fill WHERE fill.flag=1)
		AND user_fill.is_delete = '0'
		AND user_fill.flag = 1
) AS a ON a.user_id = user_info.id
WHERE 
	all_xk.univ_name = '${userinfo.univ_name}' --传参数
GROUP BY
	all_xk.tag1,
	all_xk.univ_name,
	all_xk.discipline_name
) AS b
CROSS JOIN fill
WHERE fill.flag = 1
GROUP BY
	b.tag,
	b.discipline_name,
	b.user_num,
	b.already_fill_num`
    sqls = []
    sqls.push(sql)
    // 真正返回的数组
    return_data = []
    async.eachSeries(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                console.log(err.message);
                // 异常后调用callback并传入err
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else if (results.rowCount == 0) {
                err = "您所在学校未有学科供选择"
                callback(err)
            } else {
                for (let i = 0, len = results.rows.length; i < len; i++) {
                    results.rows[i].percentage = Math.ceil((results.rows[i].already_fill_num) / (results.rows[i].need_fill_num) * 100)
                    results.rows[i].percentage = results.rows[i].percentage + '%'
                    console.log(results.rows[i])
                }
                return_data = results.rows
                callback()
            }
        });
    }, function (err) {
        if (err) {
            console.log(err);
            return res.cc(err)
        } else {

            res.send({
                status: 0,
                data: return_data
            })

        }
    })
}



/**
 * 第一步中的特殊情况，南昌大学，则根据学科群，查出其对应的学科列表
 * @param {*} req  tag（第一步中的tag）
 * @param {*} res   discipline_name，already_fill_num , need_fill_num, percentage
 */
exports.query_ncu_all_discipline = function (req, res) {
    userinfo = req.user
    // console.log(userinfo.univ_code);
    tag = req.body.tag
    sql = `SELECT
	b.discipline_name,
	b.already_fill_num,
	COUNT( DISTINCT fill.id)* b.user_num AS need_fill_num
FROM
(
SELECT
	all_xk.univ_name,
	all_xk.discipline_name AS discipline_name,
	COUNT(DISTINCT user_info.id) AS user_num,
	COUNT(a.user_id) AS already_fill_num
FROM
(
	SELECT
		univ_discipline.univ_code,
		univ_discipline.discipline_code,
		univ_discipline.univ_name,
		univ_discipline.discipline_name,
		univ_discipline.subtag1
	FROM
	  univ_discipline
	WHERE univ_discipline.tag1='学科群' 
	) AS all_xk 	
LEFT JOIN user_info 
	ON all_xk.discipline_code = user_info.discipline_code AND all_xk.univ_code = user_info.univ_code
LEFT JOIN 
(
	SELECT 
		user_fill.user_id
	FROM user_fill
	WHERE user_fill.fill_id IN (SELECT id FROM fill WHERE fill.flag=1)
		AND user_fill.is_delete = '0'
		AND user_fill.flag = 1
) AS a ON a.user_id = user_info.id
WHERE 
	all_xk.subtag1 = '${tag}' --传参数
GROUP BY
	all_xk.univ_name,
	all_xk.discipline_name
) AS b
CROSS JOIN fill
WHERE fill.flag = 1
GROUP BY
	b.discipline_name,
	b.user_num,
	b.already_fill_num`
    sqls = []
    sqls.push(sql)
    // 真正返回的数组
    return_data = []
    async.eachSeries(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                console.log(err.message);
                // 异常后调用callback并传入err
                err = "系统错误，请刷新页面后重试"
                callback(err);
            } else if (results.rowCount == 0) {
                err = "您选择的学科群未有学科供选择"
                callback(err)
            } else {
                for (let i = 0, len = results.rows.length; i < len; i++) {
                    results.rows[i].percentage = Math.ceil((results.rows[i].already_fill_num) / (results.rows[i].need_fill_num) * 100)
                    results.rows[i].percentage = results.rows[i].percentage + '%'
                    console.log(results.rows[i])
                }
                return_data = results.rows
                callback()
            }
        });
    }, function (err) {
        if (err) {
            console.log(err);
            return res.cc(err)
        } else {

            res.send({
                status: 0,
                data: return_data
            })

        }
    })
}




/**
 * 第二步
 * 查询 学校管理员选择某一学科后，将当前周期下该学科需要填的表都展示  
 * @param {*} req  univ_code（无需传），discipline_name
 * @param {*} res  id（uuid）， fill_id（表的id），fill_cycle（填报频次），is_seen（是否审核），fill_about（表名），填报对象
 */
exports.query_all_discipline_current = function (req, res) {

    userinfo = req.user
    discipline_name = req.body.discipline_name
    console.log(discipline_code)

    //  约束： 账户权限必须是3 ==> 学校id    拿到它选择的学科代码        
    sql = `select
        user_fill.id,
        user_fill.fill_id,
        fill.fill_about,
        user_fill.is_seen,
        fill.fill_cycle 
    from user_fill
    inner join fill on user_fill.fill_id=fill.id 
    where user_fill.flag=1 
        and user_fill.is_delete=0
        and fill.flag=1 
        and user_fill.user_id=(select user_info.id from user_info where user_info.univ_code='${userinfo.univ_code}' and user_info.discipline_name='${discipline_name}' )
    order by user_fill.fill_id asc`    //
    console.log(sql)
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
                message: "当前周期下，您选择的学科还未录入任何有效信息。"
            })
        } else {
            for (let i = 0, len = results.rows.length; i < len; i++) {
                results.rows[i]["填报对象"] = "学科填报"
            }
            res.send({
                status: 0,
                data: results.rows
            })
        }
    });
}



/**
 * 第二步之后可做的操作1，  通过（查阅）功能     ==> 这个是单个的  一键审核也是这个
 * @param {data_id (第二步中的id),即uuid} req 
 * @param {*} res  成功
 */
exports.check_all_discipline_current = function (req, res) {
    userinfo = req.user
    // 第二步中的id  ，即uuid
    subinfo = req.body.data_id
    console.log(subinfo)
    console.log(subinfo.length)
    var sqls = []
    // var to_dbtable
    for (let i = 0, len = subinfo.length; i < len; i++) {
        sqls[i] = `update user_fill set is_seen = 1 where id = '${subinfo[i].id}'`
    }
    console.log(sqls)
    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // 异常后调用callback并传入err
                callback(err);
            } else if (results.rowCount !== 1) {
                // 当前sql影响不为1，则错误
                err = "审核失败,请刷新页面，重新操作"
                callback(err);
            } else {
                console.log(item + "执行成功");
                // 执行完成后也要调用callback，不需要参数
                callback();
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            res.send({
                status: 1,
                message: err
            })
        } else {
            res.send({
                status: 0,
                message: "已审阅！"
            })
        }
    });
}


/**
 * 第三步
 * 查询 学校管理员  查看某学科的某张表的数据
 * @param {*} req 
 * @param {*} res 
 */
exports.query_all_discipline_table = function (req, res) {
    userinfo = req.user
    subinfo = req.body
    console.log(subinfo.id, subinfo.fill_id)

    var resultt = []
    var sqls = []
    var to_dbtable
    sqls.push(`select to_dbtable from fill where id='${subinfo.fill_id}'`)
    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // 异常后调用callback并传入err
                callback(err);
            } else if (results.rowCount !== 1) {
                // 当前sql影响不为1，则错误
                err = item + "查询失败"
                callback(err);
            } else {
                console.log(item + "执行成功");
                // 执行完成后也要调用callback，不需要参数   
                // 将查出的对应数据库表名进行保存
                resultt.push(results.rows[0])
                callback();
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            res.send({
                status: 1,
                message: err.message
            })
        } else {
            to_dbtable = resultt[0].to_dbtable
            sql2 = `select * from ${to_dbtable} where user_fill_id='${subinfo.id}'`
            client.query(sql2, function (err, results) {
                if (err) {
                    console.log(err.message)
                    res.cc('服务器错误，请稍后再试')
                } else if (results.rowCount == 0) {
                    // 当前sql影响等于0，则错误
                    err = sql2 + "查询失败"
                    res.cc(err)
                } else {
                    console.log(sql2 + "执行成功")
                    // 将查询出的表的全部信息返回
                    res.send({
                        status: 0,
                        message: results.rows
                    })

                }
            });
        }
    });

}



/**
 * 第三步之后可做的操作，   驳回功能
 * @param {*} req 
 * @param {*} res 
 */
exports.delete_single_discipline_table = function (req, res) {
    userinfo = req.user
    subinfo = req.body.user_fill_id
    console.log(subinfo)
    var sqls = []
    // var to_dbtable
    for (let i = 0, len = subinfo.length; i < len; i++) {
        sqls[i] = `update user_fill set flag = 0 , is_delete = 1 where id = '${subinfo[i].id}'`
    }
    async.each(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        client.query(item, function (err, results) {
            if (err) {
                // 异常后调用callback并传入err
                callback(err);
            } else if (results.rowCount !== 1) {
                // 当前sql影响不为1，则错误
                err = "驳回失败,请刷新页面，重新操作"
                callback(err);
            } else {
                console.log(item + "执行成功");
                // 执行完成后也要调用callback，不需要参数
                callback();
            }
        });
    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            res.send({
                status: 1,
                message: err
            })
        } else {
            res.send({
                status: 0,
                message: "驳回成功！"
            })
        }
    });
}
