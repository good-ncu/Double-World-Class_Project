// 导入uuid包
const { v4: uuidv4 } = require('uuid');
// 导入数据库操作模块
const client = require('../../db/index')
var fs = require('fs'); // 引入fs模块
const path = require('path');

exports.user_save_sub = function(req,res){
    var data = req.body.data
    var fill_id = req.body.fill_id
    var user = req.user
    var user_save_id = uuidv4().replace(/-/g, '')
    // console.log(data);

    // 写入文件内容（如果文件不存在会创建一个文件）
    var filename = user.id + '_'  + fill_id
    var filepath = '/root/syl_backend/temp_save/'+filename+'.json'
    fs.writeFileSync(filepath, JSON.stringify(data), function(err) {
        if (err) {
            console.error(err);
            res.cc('系统繁忙，请稍后再试');
        }
    }
    )
    console.log(user.id+"暂存"+fill_id+"数据");

    // 记录sql
    client.query(`insert into user_save(id,user_id,fill_id,path) values ('${user_save_id}', '${user.id}', '${fill_id}', '${filepath}')`, function (err, result){
        if (err) {
            console.error(err);
            return res.cc('系统繁忙,请稍后再试')
        }
        return res.send({
            status: 0,
            message: "暂存成功！！"
        })
    })
        
}

exports.user_save_show = function(req,res){
    var fill_id = req.body.fill_id
    var user = req.user
    client.query(`select * from user_save where user_id = '${user.id}' and fill_id = '${fill_id}' order by create_time desc limit 1`, function(err, results){
        if(err){
            console.error(err);
            return res.cc('系统繁忙,请稍后再试')
        }
        if (results.rowCount == 0){
            console.log(user.id+"没有暂存"+fill_id+"数据");
            return res.send({
                status: 2,
                data: ""
            })
        }
        var filepath = results.rows[0].path
        console.log(filepath);
        fs.readFile(filepath, 'utf-8', (err,content)=>{
            if(err){
                console.error(err);
                return res.cc('系统繁忙,请稍后再试')
            }     
            var json_data = JSON.parse(content.toString())
            // console.log(json_data);
            return res.send({
                status: 0,
                data: json_data
            })
        })
    })
}