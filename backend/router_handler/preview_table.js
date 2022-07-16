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
    var file_sava_name = user.id + '_'  + new Date().getTime() + '_'+ up_file.originalname 
    fs.renameSync(up_file.path, `${up_file.destination}\\${file_sava_name}`)
    // req.body.file_sava_name = file_sava_name 
    // req.body.save_path = save_path 

    // req.file.path = req.file.destination +'/'+ file_sava_name
    req.file.path = req.file.destination +'\\'+ file_sava_name 
    
    delete req.file.filename
    res.send({
        status: 0,
        data: req.file
    })
}