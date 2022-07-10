// 导入数据库操作模块
const client = require('../db/index')
const fs = require('fs')

exports.download_excels = function(req,res) {
    console.log("=============下载模板================");
    var id = req.body.id
    // 根据表格id(1_1_1)去找它的中文名
    const sql = `select * from fill where id = '${id}'`
    console.log(sql);
    client.query(sql, function(err,results) {
        console.log(results.rows);
        if(err){
            console.log(err.message);
            res.cc('系统繁忙，请稍后再试！')
        }
        if(results.rows.length!==1){
            console.log("长度不为1");
            res.cc('系统繁忙，请稍后再试！')
        }
        var filename = results.rows[0].fill_about
        console.log(filename);
        var path = `excels/${filename}.xlsx`

        // fs.readFile(path, function(isErr, data){
        //     if (isErr) {
        //         // res.end("Read file failed!");
        //         console.log(isErr);
        //         res.end("系统繁忙，请稍后再试！");
        //         return;
        //     }
        //     filename = encodeURI(filename, "UTF-8")
        //     filename = filename.toString('iso8859-1')
        //     res.writeHead(200,{
        //         'Content-Type': 'application/octet-stream;', //告诉浏览器这是一个二进制文件
        //         'Content-Disposition': 'attachment; filename='+filename, //告诉浏览器这是一个需要下载的文件
        //     });
        //     res.end(data)
        // })
        res.download(path,"test.xslx")
    })
}