var fs = require('fs')

exports.preview_table = function(req,res){
    res.send({
        status: 0,
        data:req.body
    })
}

exports.preview_word = function(req,res){
    user = req.user
	const up_file = req.file
    
    orname =  up_file.originalname
    var index = orname .lastIndexOf(".");  
    orname  = orname .substring(index + 1, orname .length);
    var file_sava_name = user.id + '_'  + new Date().getTime() +  '.'  +orname

    a = up_file.destination+file_sava_name
    fs.renameSync(up_file.path, a)
    // req.body.file_sava_name = file_sava_name 
    // req.body.save_path = save_path 

    // req.file.path = req.file.destination + file_sava_name
    req.file.path = file_sava_name
    
    delete req.file.filename
    delete req.file.destination
    delete req.file.originalname
    delete req.file.size
    res.send({
        status: 0,
        data: req.file
    })
}
