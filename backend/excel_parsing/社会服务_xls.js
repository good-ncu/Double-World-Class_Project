const nodeXlsx = require('node-xlsx')	//引用node-xlsx模块
var fs = require('fs');
const { table } = require('console');
//deal_table_5_1_1()
exports.deal_table_5_1_1=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let achv_to_univfund = 'achv_to_univfund' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for (let i = 0, len = excel_content.length; i < len; i++) {
        data[i] = {}
        if (excel_content[i].length == 0) {
            try {
                fs.unlinkSync(`upload/${up_file.originalname}`)
                //file removed
            } catch (err) {
                console.error(err)
            }         //筛选掉末尾空数据
            return res.cc("填报内容不能存在空行！")
        }
        data[i][yr]=excel_content[i][0];
        data[i][quarter]=excel_content[i][1];
        data[i][achv_to_univfund]=excel_content[i][2];
    }
    var nn={}
    for(let i=0,len=data.length;i<len;i++){
        let arr_keys=Object.keys(data[i])
        arr_keys.forEach(item=>{
            if (data[i][item]==undefined){
                data[i][item]=''
            }
        })
    }
    nn.data_5_1_1=data
    req.body = nn
    console.log(nn)
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}
//deal_table_5_2_1_1()
exports.deal_table_5_2_1_1=function(req,res,next){    
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let plat_name = 'plat_name' ;
    let plat_level = 'plat_level' ;
    let appro_date = 'appro_date' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for (let i = 0, len = excel_content.length; i < len; i++) {
        data[i] = {}
        if (excel_content[i].length == 0) {
            try {
                fs.unlinkSync(`upload/${up_file.originalname}`)
                //file removed
            } catch (err) {
                console.error(err)
            }         //筛选掉末尾空数据
            return res.cc("填报内容不能存在空行！")
        }
        data[i][yr]=excel_content[i][0];
        data[i][plat_name]=excel_content[i][1];
        data[i][plat_level]=excel_content[i][2];
        data[i][appro_date]=excel_content[i][3];
    }
    var nn={}
    for(let i=0,len=data.length;i<len;i++){
        let arr_keys=Object.keys(data[i])
        arr_keys.forEach(item=>{
            if (data[i][item]==undefined){
                data[i][item]=''
            }
        })
    }
    nn.data_5_2_1_1=data
    req.body = nn
    console.log(nn)
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}
//deal_table_5_2_1_2()
exports.deal_table_5_2_1_2=function(req,res,next){    
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let plat_name = 'plat_name' ;
    let plat_level = 'plat_level' ;
    let appro_date = 'appro_date' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for (let i = 0, len = excel_content.length; i < len; i++) {
        data[i] = {}
        if (excel_content[i].length == 0) {
            try {
                fs.unlinkSync(`upload/${up_file.originalname}`)
                //file removed
            } catch (err) {
                console.error(err)
            }         //筛选掉末尾空数据
            return res.cc("填报内容不能存在空行！")
        }
        data[i][yr]=excel_content[i][0];
        data[i][plat_name]=excel_content[i][1];
        data[i][plat_level]=excel_content[i][2];
        data[i][appro_date]=excel_content[i][3];
    }
    var nn={}
    for(let i=0,len=data.length;i<len;i++){
        let arr_keys=Object.keys(data[i])
        arr_keys.forEach(item=>{
            if (data[i][item]==undefined){
                data[i][item]=''
            }
        })
    }
    nn.data_5_2_1_2=data
    req.body = nn
    console.log(nn)
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}
//deal_table_5_2_2_1()
exports.deal_table_5_2_2_1=function(req,res,next){     
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let topic = 'topic' ;
    let adopt_leader = 'adopt_leader' ;
    let adopt_sit = 'adopt_sit' ;
    let adopt_date = 'adopt_date' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for (let i = 0, len = excel_content.length; i < len; i++) {
        data[i] = {}
        if (excel_content[i].length == 0) {
            try {
                fs.unlinkSync(`upload/${up_file.originalname}`)
                //file removed
            } catch (err) {
                console.error(err)
            }         //筛选掉末尾空数据
            return res.cc("填报内容不能存在空行！")
        }
        data[i][yr]=excel_content[i][0];
        data[i][topic]=excel_content[i][1];
        data[i][adopt_leader]=excel_content[i][2];
        data[i][adopt_sit]=excel_content[i][3];
        data[i][adopt_date]=excel_content[i][4];
    }
    var nn={}
    for(let i=0,len=data.length;i<len;i++){
        let arr_keys=Object.keys(data[i])
        arr_keys.forEach(item=>{
            if (data[i][item]==undefined){
                data[i][item]=''
            }
        })
    }
    nn.data_5_2_2_1=data
    req.body = nn
    console.log(nn)
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}
//deal_table_5_2_2_2()
exports.deal_table_5_2_2_2=function(req,res,next){     
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let topic = 'topic' ;
    let adopt_leader = 'adopt_leader' ;
    let adopt_sit = 'adopt_sit' ;
    let adopt_date = 'adopt_date' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
   
    for (let i = 0, len = excel_content.length; i < len; i++) {
        data[i] = {}
        if (excel_content[i].length == 0) {
            try {
                fs.unlinkSync(`upload/${up_file.originalname}`)
                //file removed
            } catch (err) {
                console.error(err)
            }         //筛选掉末尾空数据
            return res.cc("填报内容不能存在空行！")
        }
        data[i][yr]=excel_content[i][0];
        data[i][topic]=excel_content[i][1];
        data[i][adopt_leader]=excel_content[i][2];
        data[i][adopt_sit]=excel_content[i][3];
        data[i][adopt_date]=excel_content[i][4];
    }
    var nn={}
    for(let i=0,len=data.length;i<len;i++){
        let arr_keys=Object.keys(data[i])
        arr_keys.forEach(item=>{
            if (data[i][item]==undefined){
                data[i][item]=''
            }
        })
    }
    nn.data_5_2_2_2=data
    req.body = nn
    console.log(nn)
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}