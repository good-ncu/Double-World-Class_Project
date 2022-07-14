// 导入数据库操作模块
const client = require('../../db/index')
const async = require('async');

exports.show_tables = function(req,res) {
    /**
     * 1. 先去fill表内找出 flag=1的所有表
     * 2. 根据这些表去 user_fill表内 结合user_id检查是否填报
     */
    user = req.user
    client.query('select * from fill where flag = 1', function(err,results){
        if(err){
            console.log(err);
            return res.cc('系统繁忙，请稍后重试')
        }
        if(results.rowCount == 0) {
            return res.cc('系统繁忙，请稍后重试')
        }
        // all_tables：打开填报周期的表
        var all_tables = results.rows.map(function(item) {
            return {
                id: item.id,
                name: item.fill_about,
                cicle: item.fill_cycle,
                target: item.fill_means,
                is_period: 1,
                // 先赋值默认都是0，之后如果查到了就都是0
                is_filled: 0
            }
        })
        // 根据这些表去 user_fill表内 结合user_id检查是否填报
        var sqls = []
        for (let i = 0, len = all_tables.length; i < len; i++) {
            sqls[i] = `select * from user_fill where fill_id = '${all_tables[i].id}' and user_id = '${user.id}'`
        }
        var return_tables = all_tables
        var count = 0
        console.log(sqls);
        async.each(sqls, function(item, callback){
            client.query(item,function(err, result){
                if (err) {
                    console.log(err.message);
                    // 异常后调用callback并传入err
                    callback(err);
                } 
                // console.log(result);
                if(result.rows.length == 0){
                    // 说明还没有该记录，可能没有还没有填报
                    return_tables[count++].is_filled = 0   
                } else {
                    return_tables[count++].is_filled = results.rows[0].flag
                }
                callback()
            })
        }, function (err){
            if (err) {
                console.log(3);
                return res.cc('系统繁忙,请稍后再试')
            } else {
                console.log(return_tables);
                return res.send({
                    status: 0,
                    tables: return_tables
                })
            }
        })
    })
}