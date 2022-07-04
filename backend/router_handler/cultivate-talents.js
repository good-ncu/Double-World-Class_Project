// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../config')
// 导入uuid包
const { v4: uuidv4 } = require('uuid');

// 2-1下的表格是否可以填报
exports.query_can_write_education = function(req,res){

}

// 思想政治教育特色与成效（2-1-1）
exports.political_edu_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_2_1_1
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const sql = "insert into think_edu_proj(id, proj_type, proj_person, proj_year, univ_code, discipline_code, flag, path) values($1,$2,$3,$4,$5,$6,NULL,NULL)"
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符，使用空格代替
        
        // 执行SQL
        client.query(sql,[strUUID2, submit_info[i].project_type, submit_info[i].project_person, submit_info[i].project_year, user.univ_code, user.discipline_code],(err,results)=>{
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                console.log("political_edu_sub sql执行成功");
                // SQL 语句执行成功，但影响行数不为 1
                console.log(results.rowCount)
            if (results.rowCount !== 1) {
                return res.send({ status: 1, message: '填报失败，请稍后再试！' })
            }
        })

    }
    res.send({ status: 0, message: '填报成功' })
}

// 2-2下的表格是否可以填报
exports.query_can_write_progress = function(req,res){


}

// 教学成果奖存量情况（2-2-1-0）
exports.edu_awards_num_counts_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_2_2_1_0
    console.log(req.body);
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const sql = "INSERT INTO teaching_achv(id, award_level, award_type, award_date, tch_name, univ_code, discipline_code, flag, path) values($1,$2,$3,$4,$5,$6,$7,NULL,NULL)"
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符，使用空格代替
        
        // 执行SQL
        client.query(sql,[strUUID2, submit_info[i].award_level, submit_info[i].award_type, submit_info[i].award_date, submit_info[i].tch_name, user.univ_code, user.discipline_code],(err,results)=>{
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                console.log("edu_awards_num_counts sql执行成功");
                // SQL 语句执行成功，但影响行数不为 1
                console.log(results.rowCount)
            if (results.rowCount !== 1) {
                return res.send({ status: 1, message: '填报失败，请稍后再试！' })
            }
        })

    }
    res.send({ status: 0, message: '填报成功' })
}

// 国家级教学成果奖情况
exports.edu_awards_num_nation_counts_sub = function(req,res){

}