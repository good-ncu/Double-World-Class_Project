exports.new_disci_eval_situation_sub = function (req, res) {
    // 接收表单数据
    const submit_info = req.body.data_1_1_2
    // 获取token中的user信息
    user = req.user
    // 插入所有的数据都用同一个，与user_fill表的id相匹配
    var user_fill_id = uuidv4().replace(/-/g, '')
    var sqls_insert = []
    sqls_insert.push(`SELECT * FROM user_fill WHERE user_id='${user.id}' AND fill_id = '1_1_2' AND flag=1`)
    for (let i = 0, len = submit_info.length; i < len; i++) {
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符
        sqls_insert[i + 1] = (`insert into discipline_eval(id,discipline_code,univ_code,discipline_eval_turn,discipline_eval_result,user_fill_id) values('${strUUID2}','${user.discipline_code}','${user.univ_code}',${submit_info[i].discipline_eval_turn},'${submit_info[i].discipline_eval_result}','${user_fill_id}')`)
    }
    //  ============================================================ 分界线=========================================================

    // function数组，需要执行的任务列表，每个function都有一个参数callback函数并且要调用
    var tasks = [function (callback) {
        // 开启事务
        connection.beginTransaction(function (err) {
            callback(err);
        });
    }, function (callback) {
        async.eachSeries(sqls_insert, function (item, callback) {
            // 遍历每条SQL并执行
            client.query(item, function (err, results) {
                console.log(results.rows.length)
                if (err) {
                    // 异常后调用callback并传入err
                    err = "系统错误，请刷新页面后重试"
                    callback(err);
                } else {

                    if (results.rows.length !== 0 && results.rows[0].flag == 1) {
                        err = "请勿重复提交"
                    }
                    // 执行完成后也要调用callback，不需要参数
                    if (err == "请勿重复提交") {
                        callback(err)
                    } else {
                        callback();
                    }
                }
            });
        }, function (err) {
            // 所有SQL执行完成后回调
            if (err) {
                return res.cc(err)
            }
        });
    }, function (callback) {

        connection.query('insert into user_fill(id, user_id, fill_id) values(?,?,?)', [user_fill_id, user.id, '1_1_2'], function (err, result) {
            callback(err);
        });
    }, function (callback) {
        // 提交事务
        connection.commit(function (err) {
            callback(err);
        });
    }];

    async.series(tasks, function (err, results) {
        if (err) {
            console.log(err);
            connection.rollback(); // 发生错误事务回滚
        }
        connection.end();
    });


}

