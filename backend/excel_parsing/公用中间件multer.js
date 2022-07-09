const multer = require('multer')

exports.upload_file_callback = function(req,res,next){
    let upload=multer({dest: 'upload'}).single('file')
    upload(req,res,(err)=>{
		//打印结果看下面的截图
	    console.log(req.file);
		console.log("-==================================");
		console.log(req.body);
		if(err){
	        res.send("err:"+err);
	    }else{
	        //将文件信息赋值到req.body中，继续执行下一步
	        // req.body.photo=req.file.filename;
	        next();
	    }
	})
}