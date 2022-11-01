
// 导入数据库操作模块
const client = require('../../db/index')

// fill表的映射关系
// const fill_to_dbtable = {
//     "1_1_1":,
// "1_1_2":,
// "1_1_3":,
// "1_1_4":,
// "2_1_1":,
// "2_1_1docx":,
// "2_2_1_0":,
// "2_2_1_1":,
// "2_2_1_2":,
// "2_2_1_3":,
// "2_2_2_1":,
// "2_2_2_2":,
// "2_2_2_3":,
// "2_2_2_4":,
// "2_2_3_0":,
// "2_2_3_1":,
// "2_2_3_2":,
// "2_2_4":,
// "2_2_5":,
// "2_2_6":,
// "2_2_7":,
// "2_3_1":,
// "2_3_2":,
// "2_4_1":,
// "2_4_2":,
// "3_1_1":,
// "3_1_1docx":,
// "3_2_1":,
// "3_2_2_0":,
// "3_2_2_1":,
// "3_2_2_2":,
// "3_2_2_3":,
// "3_2_2_4":,
// "3_2_3":,
// "3_2_4":,
// "3_2_5":,
// "3_3_1":,
// "3_3_2":,
// "3_3_3":,
// "3_3_4":,
// "4_1_1_0":,
// "4_1_1_1":,
// "4_1_1_2":,
// "4_1_2":,
// "4_1_3_0":,
// "4_1_3_1":,
// "4_1_3_2":,
// "4_1_3_3":,
// "4_1_4":,
// "4_2_1_0":,
// "4_2_1_1":,
// "4_2_1_3":,
// "4_2_2_0":,
// "4_2_2_1":,
// "4_2_2_2":,
// "4_2_2_3":,
// "4_2_3_1":,
// "4_2_3_2":,
// "4_2_4":,
// "4_3_1":,
// "4_3_2":,
// "5_1_1":,
// "5_2_1_1":,
// "5_2_1_2":,
// "5_2_2_1":,
// "5_2_2_2":,
// "5_4_1":,
// "5_4_2":,
// }

// 省厅删除四大信息
exports.delete_school_data = function(req, res){
    var school_descipline = req.body.school_descipline
    var fill_id  = req.body.fill_id
    var row_id = req.body.row_id
    // 参数：fill_id、row_id
    // 再根据fill_id拿到对应的to_dbtable
    var temp = school_descipline.split('-')
    var school = temp[0]
    var descipline = temp[1]
    // console.log(school,descipline);
    sql_to_dbtable = `SELECT to_dbtable from fill where id = '${fill_id}'`
    client.query(sql_to_dbtable, function(err,results){
        if(err){
            console.error(err);
            return res.cc('系统繁忙，请稍后再试')
        } 
        var to_dbtable = results.rows[0].to_dbtable
        // sql_del_rows（删除行） 的拼接子串
        var sub_sql_del_rows = ''
        // sql_del_record（记录删除操作） 的拼接子串
        var sub_sql_del_record = ''
        for(let i = 0;i<row_id.length;i++){
            sub_sql_del_rows = sub_sql_del_rows+"'"+row_id[i]+"'"
            sub_sql_del_record +=`(`+ `'${row_id[i]}',` + `'${fill_id}',` + `'${school}',` + `'${to_dbtable}',` + `'${descipline}'` + `)`
            if(i!=row_id.length-1){
                sub_sql_del_rows+=","
                sub_sql_del_record +=","
            }
        }
        // 删除行
        var sql_del_rows = `UPDATE ${to_dbtable} SET is_delete = 1 WHERE 
        "id" in (${sub_sql_del_rows})`
        // 记录删除记录
        var sql_del_record = `insert into delete_record (id, fill_id, univ_name, to_dbtable, discipline_name) values ${sub_sql_del_record}`
        client.query('BEGIN', function(err){
            if (shouldAbort(err)){
                console.error(err);
                return res.cc('系统繁忙，请稍后再试')
            }
            client.query(sql_del_rows, function(err,results){
                if(shouldAbort(err)){
                    console.error(err);
                    return res.cc('系统繁忙，请稍后再试')
                } 
                client.query(sql_del_record, function(err,results){
                    if(shouldAbort(err)){
                        console.error(err);
                        return res.cc('系统繁忙，请稍后再试')
                    }
                    client.query('COMMIT', function(err){
                        if(shouldAbort(err)){
                            console.error(err);
                            return res.cc('系统繁忙，请稍后再试')
                        }
                        return res.send({
                            status: 0,
                            message: "删除成功！"
                        }) 
                    })
                })
            })
        })
    })
}

var shouldAbort = function(err){
    if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', err => {
          if (err) {
            console.error('Error rolling back client', err.stack)
          }
          console.log('回滚成功');
        })
      }
      return !!err
}

