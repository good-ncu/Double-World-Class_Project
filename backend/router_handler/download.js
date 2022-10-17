// 导入数据库操作模块
const client = require('../db/index')
const fs = require('fs')
const urlencode = require('urlencode')
var URL = require('url').URL;
const expressJWT = require('express-jwt')

exports.download_excels = function (req, res) {
    console.log("=============下载模板================");
    console.log(req.url);
    console.log(req.query);
    var id = req.query.id
    // 根据表格id(1_1_1)去找它的中文名
    const sql = `select * from fill where id = '${id}'`
    console.log(sql);
    client.query(sql, function (err, results) {
        console.log(results.rows);
        if (err) {
            console.log(err.message);
            return res.cc('系统繁忙，请稍后再试！')
        }
        if (results.rows.length !== 1) {
            console.log("长度不为1");
            return res.cc('系统繁忙，请稍后再试！')
        }
        var filename = results.rows[0].fill_about
        var path = `/root/syl_backend/template/excels/${filename}.xlsx`
        console.log(path);

        // check if directory exists
        if (!fs.existsSync(path)) {
            console.log("没有该文件！");
            return res.cc('系统暂无此模板')
        }

        res.writeHead(200, {
            'Access-Control-Expose-Headers': 'Authorization',
            'Content-Type': 'application/octet-stream;charset=utf8',
            'Content-Disposition': "attachment;filename*=UTF-8''" + urlencode(filename) + '.xlsx'
        });
        var opt = {
            flags: 'r'
        };
        var stream = fs.createReadStream(path, opt);
        stream.pipe(res);
        stream.on('end', function () {
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




// 下载用户已经上传过的文档
exports.download_filled_word = function (req, res) {
    console.log("=============下载选中的文件================");
    // 表的id  如 1_1_1
    // user = req.user
    var filename = req.query.filename


    var path = `/root/syl_backend/upload/${filename}`
    console.log(path)

    // check if directory exists
    if (!fs.existsSync(path)) {
        console.log("没有该文件！");
        return res.cc('系统繁忙，请稍后再试！')
    }

    res.writeHead(200, {
        'Access-Control-Expose-Headers': 'Authorization',
        'Content-Type': 'application/octet-stream;charset=utf8',
        'Content-Disposition': "attachment;filename*=UTF-8''" + urlencode(filename)
    });
    var opt = {
        flags: 'r'
    };
    var stream = fs.createReadStream(path, opt);
    stream.pipe(res);
    stream.on('end', function () {
        res.end();
    });

}




//  查询某表已提交文档的文档名
exports.download_query_wordname = function (req, res) {
    console.log("=============查询某表已提交文档的文档名================");

    // 表的id  如 1_1_1
    user = req.user
    var fill_id = req.query.id
    console.log(fill_id);

    var filenameList = []
    // 根据表格id(1_1_1)去找它的中文名
    const sql = `select path from user_fill where user_id = '${user.id}' AND fill_id = '${fill_id}' AND flag = 1 AND is_delete = 0 AND path!=''`
    console.log(sql);
    client.query(sql, function (err, results) {
        console.log(results.rows);
        if (err) {
            console.log(err.message);
            return res.cc('系统繁忙，请稍后再试！')
        }
        if (results.rows.length !== 1) {
            console.log("长度不为1");
            return res.cc('您还未上传相关文档或文档已被学校管理员驳回！')
        }
        console.log(results.rows[0].path);
        let all_path = results.rows[0].path
        // 转化为数组
        let all_path_arr = all_path.split(',');


        for (let i = 0, len = all_path_arr.length; i < len; i++) {
            // 拿出所有文件名
            if (fs.existsSync(all_path_arr[i])) {
                var index = all_path_arr[i].lastIndexOf("/");
                filenameList.push(all_path_arr[i].substring(index + 1, all_path_arr[i].length))
            }
        }
        res.send({
            status: 0,
            filenameList: filenameList
        })

    })
}


/**
 * 下面这两个方法是用于6个文档给学校审核专门用的
 */
// 下载用户已经上传过的文档
exports.review_download_filled_word = function (req, res) {
    console.log("=============下载选中的文件================");
    // 表的id  如 1_1_1
    // user = req.user
    var filename = req.query.filename


    var path = `/root/syl_backend/upload/${filename}`
    console.log(path)

    // check if directory exists
    if (!fs.existsSync(path)) {
        console.log("没有该文件！");
        return res.cc('系统繁忙，请稍后再试！')
    }

    res.writeHead(200, {
        'Access-Control-Expose-Headers': 'Authorization',
        'Content-Type': 'application/octet-stream;charset=utf8',
        'Content-Disposition': "attachment;filename*=UTF-8''" + urlencode(filename)
    });
    var opt = {
        flags: 'r'
    };
    var stream = fs.createReadStream(path, opt);
    stream.pipe(res);
    stream.on('end', function () {
        res.end();
    });

}




//  查询某表已提交文档的文档名
exports.review_download_query_wordname = function (req, res) {
    console.log("=============查询某表已提交文档的文档名================");

    // 表的id  如 1_1_1
    // user = req.user
    var id = req.query.id
    console.log(id);

    var filenameList = []
    // 根据表格id(1_1_1)去找它的中文名
    const sql = `select path from user_fill where id = '${id}' AND flag = 1 AND is_delete = 0 AND path!=''`
    console.log(sql);
    client.query(sql, function (err, results) {
        console.log(results.rows);
        if (err) {
            console.log(err.message);
            return res.cc('系统繁忙，请稍后再试！')
        }
        if (results.rows.length !== 1) {
            console.log("长度不为1");
            return res.cc('您还未上传相关文档或文档已被学校管理员驳回！')
        }
        console.log(results.rows[0].path);
        let all_path = results.rows[0].path
        // 转化为数组
        let all_path_arr = all_path.split(',');


        for (let i = 0, len = all_path_arr.length; i < len; i++) {
            // 拿出所有文件名
            if (fs.existsSync(all_path_arr[i])) {
                var index = all_path_arr[i].lastIndexOf("/");
                filenameList.push(all_path_arr[i].substring(index + 1, all_path_arr[i].length))
            }
        }
        res.send({
            status: 0,
            filenameList: filenameList
        })

    })
}














exports.download_report = function (req, res) {
    console.log("=============下载报告================");
    console.log(req.url);
    console.log(req.query);
    var filename = '阶段性数据报告.docx'
    var path = `/root/syl_backend/template/${filename}`
    console.log(path);

    // check if directory exists
    if (!fs.existsSync(path)) {
        console.log("没有该文件！");
        return res.cc('系统繁忙，请稍后再试！')
    }

    res.writeHead(200, {
        'Access-Control-Expose-Headers': 'Authorization',
        'Content-Type': 'application/octet-stream;charset=utf8',
        'Content-Disposition': "attachment;filename*=UTF-8''" + urlencode(filename)
    });
    var opt = {
        flags: 'r'
    };
    var stream = fs.createReadStream(path, opt);
    stream.pipe(res);
    stream.on('end', function () {
        res.end();
    });

}


exports.download_allexcels = function (req, res) {
    console.log("=============下载报告================");
    console.log(req.url);
    console.log(req.query);
    var filename = '阶段性学科填报信息.xlsx'
    var path = `/root/syl_backend/template/${filename}`
    console.log(path);

    // check if directory exists
    if (!fs.existsSync(path)) {
        console.log("没有该文件！");
        return res.cc('系统繁忙，请稍后再试！')
    }

    res.writeHead(200, {
        'Access-Control-Expose-Headers': 'Authorization',
        'Content-Type': 'application/octet-stream;charset=utf8',
        'Content-Disposition': "attachment;filename*=UTF-8''" + urlencode(filename)
    });
    var opt = {
        flags: 'r'
    };
    var stream = fs.createReadStream(path, opt);
    stream.pipe(res);
    stream.on('end', function () {
        res.end();
    });

}
