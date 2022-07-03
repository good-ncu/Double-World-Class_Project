// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../config')
// 导入uuid包
const { v4: uuidv4 } = require('uuid');

const expressJWT = require('express-jwt')

// 学科填报的处理函数
exports.sub = function(req, res){

    // 接收表单数据
    const submit_info = req.body.data
    // 获取token中的user信息
    user=req.user
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const sql = "insert into discipline_eval(id,discipline_code,univ_code,discipline_eval_turn,discipline_eval_result) values($1,$2,$3,$4,$5)"
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符，使用空格代替
        
            // 执行SQL
        client.query(sql,[strUUID2,user.discipline_code, user.univ_code, submit_info[i].discipline_eval_turn, submit_info[i].discipline_eval_result],(err,results)=>{
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
            console.log("sql执行成功");
            // SQL 语句执行成功，但影响行数不为 1
            console.log(results.rowCount)
        if (results.rowCount !== 1) {
            return res.send({ status: 1, message: '填报成功失败，请稍后再试！' })
        }
        // 填报成功
        
        })

    }
    res.send({ status: 0, message: '填报成功' })
   
   
   

  
  
}