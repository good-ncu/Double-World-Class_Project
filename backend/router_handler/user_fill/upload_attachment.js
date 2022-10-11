// 导入数据库操作模块
const client = require('../../db/index')
var fs = require('fs'); // 引入fs模块


exports.upload_sub = function(req, res) {
    user = req.user
    fill_id = req.body.fill_id
    path_temp = req.body.path
    if (path_temp.length == 0) {
        return res.send({
            status: 1,
            message: "无附件上传"
        })
    }
    var path_ora = []
    var path = []
    timenow = new Date().getTime()
    // 附件所属的文件夹名称
    file_dir = user.id+'-'+fill_id+'-'+timenow
    if (!(fs.existsSync('/root/syl_backend/temp_upload/' + path_temp[0]) && path_temp[0] != '')){
        return res.cc("无待提交附件")
    }
    // 创建文件夹
    fs.mkdir(`/root/syl_backend/attachment_upload/${file_dir}`, function(error){
        if(error){
            console.error(error);
            return res.cc('系统错误请稍后再试');
        }
        console.log('创建目录成功：',`/root/syl_backend/attachment_upload/${file_dir}`);
    })
    // for循环， 每一个循环都是移动一个文件从temp_upload 到 upload文件
    for (let i = 0, len = path_temp.length; i < len; i++) {
        // path_ora[i] = '/root/syl_backend/temp_upload/' + path_temp[i]
        // path_ora[i] = 'D:\\project\\temp_upload\\' + path_temp[i]
        path_ora[i] = '/root/syl_backend/temp_upload/' + path_temp[i]
        try {
            if (fs.existsSync(path_ora[i]) && path_temp[i] != '') {
                path.push(path_ora[i].replace("temp_upload", `attachment_upload/${file_dir}`))
                // path.push(path_ora[i].replace("temp_", "temp2222_"))
                console.log(path[i]);
                fs.renameSync(path_ora[i], path[i], function (err) {
                    if (path_ora[i])
                        if (err) err = '文件上传失败，请稍后再试'
                    fs.stat(path[i], function (err, stats) {
                        console.log('stats: ' + JSON.stringify(stats));
                        if (err) err = '文件上传失败，请稍后再试'
                    });
                });

            } else {
                if(i==0){
                    // 避免多次点击提交附件按钮
                    return res.cc("无待提交附件")
                }
                return res.cc("您提交的第" + (i + 1) + "个文件不存在，请稍后再试")
            }
        } catch (err) {
            return res.cc('第' + (i + 1) + '个文件上传失败，请稍后再试')
        }
    }

    sql = `insert into attachment(id, user_id, fill_id, path) values('${file_dir}','${user.id}','${fill_id}','/root/syl_backend/attachment_upload/${file_dir}/')`
    console.log(sql);
    client.query(sql, function (err, result) {
        if (err) {
            console.error(err);
            return res.cc('上传附件错误,请稍后再试')
        }
        res.send({
            status: 0,
            message: "提交附件成功！！"
        })
    })
}