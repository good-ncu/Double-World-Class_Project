var fs = require('fs')
const { config } = require('process')

exports.preview_table = function (req, res) {
    res.send({
        status: 0,
        data: req.body
    })
}

// 多文档上传
exports.preview_word = function (req, res) {
    user = req.user
    // 注意这里变成了req.files，里面保存了上传的多个文件信息，用数组保存。  而之前当个文件是req.file
    const up_file = req.files
    var file_sava_name = []
    timenow = new Date().getTime()
    for (let i = 0, len = up_file.length; i < len; i++) {
        // 拼接新的文件名
        var orname = up_file[i].originalname
        var index = orname.lastIndexOf(".");
        orname = orname.substring(index + 1, orname.length);
        var str = user.id + '_' + i + '_' + timenow + '.' + orname;
        // 保存自定义规则生成的文件名
        file_sava_name[i] = str
        // console.log(file_sava_name[i])
        // 得到新的存放绝对路径     xxx/new.docx
        a = up_file[i].destination + file_sava_name[i]
        // 修改文件名    xxx/old.docx  ==>   xxx/new.docx
        fs.renameSync(up_file[i].path, a)
    }
    
    // 除去一些不需要返回前端的数据
    for (let i = 0, len = up_file.length; i < len; i++) {
        req.files[i].path = file_sava_name[i]
        delete req.files[i].filename
        delete req.files[i].destination
        delete req.files[i].originalname
        delete req.files[i].size
    }
    res.send({
        status: 0,
        data: req.files
    })
}

// 多附件上传
exports.preview_attachment = function (req, res) {
    user = req.user
    // 注意这里变成了req.files，里面保存了上传的多个文件信息，用数组保存。  而之前当个文件是req.file
    const up_file = req.files
    var file_sava_name = []
    timenow = new Date().getTime()
    for (let i = 0, len = up_file.length; i < len; i++) {
        // 拼接新的文件名
        var orname = up_file[i].originalname
        console.log(up_file[i].originalname);
        var str = user.id + '_' + i + '_'  + orname;
        // 保存自定义规则生成的文件名
        file_sava_name[i] = str
        console.log(str);
        // console.log(file_sava_name[i])
        // 得到新的存放绝对路径     xxx/new.docx
        a = up_file[i].destination + file_sava_name[i]
        // 修改文件名    xxx/old.docx  ==>   xxx/new.docx
        fs.renameSync(up_file[i].path, a)
    }
    
    // 除去一些不需要返回前端的数据
    for (let i = 0, len = up_file.length; i < len; i++) {
        req.files[i].path = file_sava_name[i]
        delete req.files[i].filename
        delete req.files[i].destination
        // delete req.files[i].originalname
        delete req.files[i].size
    }
    res.send({
        status: 0,
        data: req.files
    })
}

// 单文档上传
// exports.preview_word = function(req,res){
//      user = req.user
//      const up_file = req.file
     
//      orname = up_file.originalname
//      var index = orname .lastIndexOf(".");
//      orname = orname .substring(index + 1, orname .length);
//      var file_sava_name = user.id + '_' + new Date().getTime() + '.' +orname
    
//      a = up_file.destination+file_sava_name
//      fs.renameSync(up_file.path, a)
//      // req.body.file_sava_name = file_sava_name 
//      // req.body.save_path = save_path 
    
//      // req.file.path = req.file.destination + file_sava_name
//      req.file.path = file_sava_name
     
//      delete req.file.filename
//      delete req.file.destination
//      delete req.file.originalname
//      delete req.file.size
//      res.send({
//      status: 0,
//      data: req.file
//      })
// }