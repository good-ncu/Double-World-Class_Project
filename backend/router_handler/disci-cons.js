// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入全局的配置文件
const config = require('../config')
// 导入uuid包
const { v4: uuidv4 } = require('uuid');

const expressJWT = require('express-jwt')

const async = require('async')

// 学科填报的处理函数
exports.disci_eval_situation_sub = function(req, res){

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
            return res.send({ status: 1, message: '填报失败，请稍后再试！' })
        }
        // 填报成功
        
        })

    }
    res.send({ status: 0, message: '填报成功' })
}   

// 学科影响力情况处理函数 1-1-3
exports.disci_influence_sub = function(req,res){
    // 接收表单数据
    const submit_info = req.body.data_1_1_3
    console.log(submit_info);
    // 获取token中的user信息
    user=req.user
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const sql = "INSERT INTO discipline_influ(id, univ_code, discipline_code, year, rank_type, rank, flag, path) VALUES ($1, $2, $3, $4, $5, $6, NULL, NULL)"
        const strUUID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const strUUID2 = strUUID.replace(/-/g, '');       // 去掉-字符

            // 执行SQL
        client.query(sql,[strUUID2,user.univ_code, user.discipline_code, submit_info[i].year, submit_info[i].rank_type, submit_info[i].rank],(err,results)=>{
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
            console.log("disci_influence_sub sql执行成功");
            // SQL 语句执行成功，但影响行数不为 1
            // console.log(results.rowCount)
        if (results.rowCount !== 1) {
            return res.send({ status: 1, message: '填报失败，请稍后再试！' })
        }
        // 填报成功

        })

    }
    res.send({ status: 0, message: '填报成功' })
}

exports.query_is_time=function(req,res){
    // 接收表单数据
    const submit_info = req.body.id
    // console.log(submit_info[0])
    // console.log(submit_info.length)
    var resultt=[]
    
    
    for(let i=0,len=submit_info.length;i<len;i++){ 
        const sql = `select flag,fill_cicle from fill_cicle where id = '${submit_info[i]}'`
        client.query(sql,(err,results)=>{
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
            
            console.log("sql执行成功");
            // SQL 语句执行成功，但影响行数不为 1
            console.log(results.rowCount)
            
            if (results.rows.length ==0) {
                return res.send({ status: 1, message: '填报周期查询失败，请稍后再试！' })
            }
            resultt[i]=results.rows[0]  
        })
    }

    // queries =[`select flag,fill_cicle from fill_cicle where id = '1-1-2'`,`select flag,fill_cicle from fill_cicle where id = '1-1-3'`]
    // async.forEach(queries, function(query, callback) {
    //     console.log(query)
    //     client.query(query, function(err, row, fields){
    //         resultt.push(row.rows[0]);
    //         console.log(resultt)
    //         callback(); // this signals async that you're done with this item
    //     });
    // }, function(err) {
    //     if (err) return next(err);
     
    //     // all queries are done here
    // });


    setTimeout(function() {
        res.send({
            result : resultt
        })
    }, 3000)

    // console.log(resultt)

    // res.send({
    //     result : resultt
    // })

}

  
  
