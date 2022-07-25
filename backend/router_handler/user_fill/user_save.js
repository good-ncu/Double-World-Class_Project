// 导入uuid包
const { v4: uuidv4 } = require('uuid');
// 导入数据库操作模块
const client = require('../../db/index')
var fs = require('fs'); // 引入fs模块
const path = require('path');

exports.user_save_sub = function(req,res){
    data = req.body.data
    fill_id = req.body.fill_id
    user = req.user
    var user_save_id = uuidv4().replace(/-/g, '')
    console.log(data);

    // 写入文件内容（如果文件不存在会创建一个文件）
    filename = user.id + '_'  + fill_id
    filepath = '/root/syl_backend/temp_save/'+filename+'.json'
    console.log(11111111111);
    fs.writeFileSync(filepath, JSON.stringify(data), function(err) {
        console.log(22222222222);
        if (err) {
            console.log(err);
            res.cc('系统繁忙，请稍后再试');
        }
        console.log(user.id+"暂存"+fill_id+"数据");
    }
    )

    // 记录sql
    client.query(`insert into user_save(id,user_id,fill_id,path) values ('${user_save_id}', '${user.id}', '${fill_id}', '${filepath}')`, function (err, result){
        if (err) {
            console.log(err.message);
            return res.cc('系统繁忙,请稍后再试')
        }
        res.send({
            status: 0,
            message: "暂存成功！！"
        })
    })
        
}