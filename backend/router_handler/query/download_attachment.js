// 导入数据库操作模块
const client = require('../../db/index')
var fs = require('fs'); // 引入fs模块
var path = require("path");
const urlencode = require('urlencode')

exports.attach_query_download = function(req,res){
    id = req.body.id
    univ_code = req.user.univ_code
    console.log(univ_code);
    discipline_name = req.body.name
    // 查询 拼装用户的user_id
    sql1 = `select * from univ_discipline where univ_code = '${univ_code}' and discipline_name = '${discipline_name}'`
    client.query(sql1,function(err,results){
        if(err){
            console.error(err);
            return res.cc("系统繁忙，请稍后再试")
        } else {
            if (results.rowCount==0){
                return res.cc('无该学校学科信息')
            }
            discipline_code = results.rows[0].discipline_code
            user_id = univ_code+'_'+discipline_code
            // 查询sql，以最新的记录为准
            sql2 = `select * from attachment where user_id = '${user_id}' and fill_id = '${id}' order by create_time desc limit 1`
            client.query(sql2, function(err, results){
                if(err){
                    console.error(err);
                    return res.cc("系统繁忙，请稍后再试")
                } else {
                    if (results.rowCount==0){
                        return res.send({
                            status: 0,
                            filenameList: []
                        })
                    }
                    path_dir = results.rows[0].path
                    // path_dir = 'D:\\temp_upload'
                    // dirs: path_dir下的所有文件
                    dirs = fs.readdirSync(path_dir)
                    return res.send({
                        status: 0,
                        filenameList: dirs
                    })
                }
            })
        }
    })
}


exports.attach_filled_download = function(req,res){
    filename = req.body.filename
    id = req.body.id
    user = req.user
    console.log(user);
    sql = `select * from attachment where user_id = '${user.id}' and fill_id = '${id}' order by create_time desc limit 1`
    console.log(sql);
    client.query(sql,function(err,results){
        if(err){
            console.error(err);
            return res.cc("系统繁忙，请稍后再试")
        } else {
            if (results.rowCount==0){
                return res.cc("该用户未上传过该表格的附件")
            }
            path_dir = results.rows[0].path+filename
            // path_dir = 'D:\\temp_upload\\'+filename
            // dirs: path_dir下的所有文件
              // check if directory exists
            if (!fs.existsSync(path_dir)) {
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
            var stream = fs.createReadStream(path_dir, opt);
            stream.pipe(res);
            stream.on('end', function () {
                res.end();
            });
            }
    })
}