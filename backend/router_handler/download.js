// 导入数据库操作模块
const client = require('../db/index')
const fs = require('fs')
const urlencode = require('urlencode')
var URL = require('url').URL;


exports.download_excels = function(req,res) {
    console.log("=============下载模板================");
    console.log(req.url);
    console.log(req.query);
    var id = req.query.id
    // 根据表格id(1_1_1)去找它的中文名
    const sql = `select * from fill where id = '${id}'`
    console.log(sql);
    client.query(sql, function(err,results) {
        console.log(results.rows);
        if(err){
            console.log(err.message);
            return res.cc('系统繁忙，请稍后再试！')
        }
        if(results.rows.length!==1){
            console.log("长度不为1");
            return res.cc('系统繁忙，请稍后再试！')
        }
        var filename = results.rows[0].fill_about
        var path = `../../template/excels/${filename}.xlsx`
        console.log(path);

        // check if directory exists
        if (!fs.existsSync(path)) {
            console.log("没有该文件！");
           return res.cc('系统繁忙，请稍后再试！')
        }
        
        res.writeHead(200,{
            'Access-Control-Expose-Headers' : 'Authorization',
            'Content-Type':'application/octet-stream;charset=utf8',
            'Content-Disposition': "attachment;filename*=UTF-8''"+urlencode(filename)+'.xlsx'
        });
        var opt = {
            flags:'r'
        };
        var stream = fs.createReadStream(path, opt);
        stream.pipe(res);
        stream.on('end', function(){
            res.end();
        });
        // fs.readFile(path, function(isErr, data){
        //     if (isErr) {
        //         // res.end("Read file failed!");
        //         console.log(isErr);
        //         res.end("系统繁忙，请稍后再试！");
        //         return;
        //     }
        //     // filename = encodeURI(filename, "UTF-8")
        //     // filename = filename.toString('iso8859-1')
        //     res.writeHead(200,{
        //         'Content-Type': 'application/octet-stream;', //告诉浏览器这是一个二进制文件
        //         'Content-Disposition': 'attachment; filename='+ encodeURIComponent(filename), //告诉浏览器这是一个需要下载的文件
        //     });
        //     res.end(data)
        // })
        // res.download(path,"test.xslx")
    })
}

exports.download_report = function(req,res) {
    console.log("=============下载报告================");
    console.log(req.url);
    console.log(req.query);
    var filename = '阶段性数据报告.docx'
    var path = `../../template/${filename}`
    console.log(path);

    // check if directory exists
    if (!fs.existsSync(path)) {
        console.log("没有该文件！");
        return res.cc('系统繁忙，请稍后再试！')
    }
    
    res.writeHead(200,{
        'Access-Control-Expose-Headers' : 'Authorization',
        'Content-Type':'application/octet-stream;charset=utf8',
        'Content-Disposition': "attachment;filename*=UTF-8''"+urlencode(filename)
    });
    var opt = {
        flags:'r'
    };
    var stream = fs.createReadStream(path, opt);
    stream.pipe(res);
    stream.on('end', function(){
        res.end();
    });
    
}