const multer = require('multer')


// dest 值为文件存储的路径  ;  single方法,表示上传单个文件,参数为前端表单数据对应的key
exports.upload_file_callback = function(req,res,next){
    let upload=multer({dest: 'upload'}).single('file')
    upload(req,res,(err)=>{
		if(err){
	        res.send("err:"+err);
	    }else{
	        //将文件信息赋值到req.body中，继续执行下一步
	        // req.body.photo=req.file.filename;
	        next();
	    }
	})
}


exports.upload_word_file_callback = function(req,res,next){
	
	// let upload=multer({dest: '/root/syl_backend/upload'}).single('file')

    let upload=multer({dest: 'D:\\project\\upload'}).single('file')
    upload(req,res,(err)=>{
		if(err){
	        res.send("err:"+err);
	    }else{
	        //将文件信息赋值到req.body中，继续执行下一步
	        // req.body.photo=req.file.filename;
	        next();
	    }
	})
}