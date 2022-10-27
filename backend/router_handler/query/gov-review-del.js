
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
    console.log("test");
    var detail = req.body.detail
    var fill_id  = req.body.fill_id
    var row_id = req.body.row_id
    var detailinfo = []
    detailinfo = detail.split('-')
    // 参数：学校、学科、fill_id、row_id
    // 先根据学校学科名称找出univ_code，discipline_code，拼成user_id
    sql_univ_disci = `select univ_code,discipline_code from user_info where univ_name = '${detailinfo[0]}' and discipline_name = '${detailinfo[1]}'`
    client.query(sql_univ_disci, function(err, results){
        if(err){
            console.error(err);
            return res.cc('系统繁忙，请稍后再试')
        } 
        var univ_code = results.rows[0].univ_code
        var discipline_code = results.rows[0].discipline_code
        var user_id = univ_code+'_'+discipline_code
        console.log(user_id);
        // 再根据fill_id拿到对应的to_dbtable
        sql_to_dbtable = `SELECT to_dbtable from fill where id = '${fill_id}'`
        client.query(sql_to_dbtable, function(err,results){
            if(err){
                console.error(err);
                return res.cc('系统繁忙，请稍后再试')
            } 
            var to_dbtable = results.rows[0].to_dbtable
            
        })
    })
}

