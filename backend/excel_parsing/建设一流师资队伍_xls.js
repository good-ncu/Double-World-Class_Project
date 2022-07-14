const nodeXlsx = require('node-xlsx')	//引用node-xlsx模块
var fs = require('fs');
const { table } = require('console');
//deal_table_3_1_1()   pass
exports.deal_table_3_1_1=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let recogn_honor = 'recogn_honor' ;
    let tch_name = 'tch_name' ;
    let yr = 'yr' ;

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
        data[i][recogn_honor]=excel_content[i][0];
        data[i][tch_name]=excel_content[i][1];
        data[i][yr]=excel_content[i][2];
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
    nn.data_3_1_1=data
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


//deal_table_3_2_1()  pass
exports.deal_table_3_2_1=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let discipline = 'discipline' ;
    let tch_type = 'tch_type' ;
    let tch_name = 'tch_name' ;
    let age = 'age' ;
    let tch_title = 'tch_title' ;
    let rep_work = 'rep_work' ;

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
        data[i][discipline]=excel_content[i][0];
        data[i][tch_type]=excel_content[i][1];
        data[i][tch_name]=excel_content[i][2];
        data[i][age]=excel_content[i][3];
        data[i][tch_title]=excel_content[i][4];
        data[i][rep_work]=excel_content[i][5];
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
    nn.data_3_2_1 = data
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}

//deal_table_3_2_2_0()   pass 
exports.deal_table_3_2_2_0=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let talent_team_name = 'talent_team_name' ;
    let level = 'level' ;
    let honor_name = 'honor_name' ;
    let yr = 'yr' ;
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
        data[i][talent_team_name]=excel_content[i][0];
        data[i][level]=excel_content[i][1];
        data[i][honor_name]=excel_content[i][2];
        data[i][yr]=excel_content[i][3];
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
    nn.data_3_2_2_0 = data
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}
//deal_table_3_2_2_1()   pass 
exports.deal_table_3_2_2_1=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let talent_team_name = 'talent_team_name' ;
    let honor_name = 'honor_name' ;
    let yr = 'yr' ;
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
        data[i][talent_team_name]=excel_content[i][0];
        data[i][honor_name]=excel_content[i][1];
        data[i][yr]=excel_content[i][2];
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
    nn.data_3_2_2_1 = data
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}

//deal_table_3_2_2_2()    pass
exports.deal_table_3_2_2_2=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let talent_team_name = 'talent_team_name' ;
    let honor_name = 'honor_name' ;
    let yr = 'yr' ;
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
        data[i][talent_team_name]=excel_content[i][0];
        data[i][honor_name]=excel_content[i][1];
        data[i][yr]=excel_content[i][2];
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
    nn.data_3_2_2_2 = data
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

//deal_table_3_2_3()
exports.deal_table_3_2_3=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let full_tch_num = 'full_tch_num' ;let ageblow25 = 'ageblow25' ;let age2535 = 'age2535' ;
    let age3645 = 'age3645' ;let age4660 = 'age4660' ;let ageup60 = 'ageup60' ;let senior = 'senior' ;
    let sub_senior = 'sub_senior' ;let mid_grade = 'mid_grade' ;let other_grade = 'other_grade' ;
    let phd = 'phd' ;let m_degree = 'm_degree' ;let b_degree = 'b_degree' ;
    excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
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
        data[i][full_tch_num]=excel_content[i][1];
        data[i][ageblow25]=excel_content[i][2];
        data[i][age2535]=excel_content[i][3];
        data[i][age3645]=excel_content[i][4];
        data[i][age4660]=excel_content[i][5];
        data[i][ageup60]=excel_content[i][6];
        data[i][senior]=excel_content[i][7];
        data[i][sub_senior]=excel_content[i][8];
        data[i][mid_grade]=excel_content[i][9];
        data[i][other_grade]=excel_content[i][10];
        data[i][phd]=excel_content[i][11];
        data[i][m_degree]=excel_content[i][12];
        data[i][b_degree]=excel_content[i][13];
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
    nn.data_3_2_3 = data
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}
//deal_table_3_2_4()
exports.deal_table_3_2_4=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let in_postdoc_sum = 'in_postdoc_sum' ;
    let in_postdoc_newinc = 'in_postdoc_newinc' ;
    let out_postdoc_sum = 'out_postdoc_sum' ;
    let out_postdoc_newinc = 'out_postdoc_newinc' ;
    let univ_ra_sum = 'univ_ra_sum' ;
    let univ_ra_newinc = 'univ_ra_newinc' ;
    let inst_ra_sum = 'inst_ra_sum' ;
    let inst_ra_newinc = 'inst_ra_newinc' ;
    let task_ra_sum = 'task_ra_sum' ;
    let task_ra_newinc = 'task_ra_newinc' ;
    excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
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
        data[i][in_postdoc_sum]=excel_content[i][1];
        data[i][in_postdoc_newinc]=excel_content[i][2];
        data[i][out_postdoc_sum]=excel_content[i][3];
        data[i][out_postdoc_newinc]=excel_content[i][4];
        data[i][univ_ra_sum]=excel_content[i][5];
        data[i][univ_ra_newinc]=excel_content[i][6];
        data[i][inst_ra_sum]=excel_content[i][7];
        data[i][inst_ra_newinc]=excel_content[i][8];
        data[i][task_ra_sum]=excel_content[i][9];
        data[i][task_ra_newinc]=excel_content[i][10];
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
    nn.data_3_2_4 = data
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}

// deal_table_3_2_5()
exports.deal_table_3_2_5=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let sum_full_ftch = 'sum_full_ftch' ;
    let sum_high_title = 'sum_high_title' ;
    let lang_full_ftch = 'lang_full_ftch' ;
    let lang_high_title = 'lang_high_title' ;
    let prof_full_ftch = 'prof_full_ftch' ;
    let prof_high_title = 'prof_high_title' ;
    excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
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
        data[i][sum_full_ftch]=excel_content[i][1];
        data[i][sum_high_title]=excel_content[i][2];
        data[i][lang_full_ftch]=excel_content[i][3];
        data[i][lang_high_title]=excel_content[i][4];
        data[i][prof_full_ftch]=excel_content[i][5];
        data[i][prof_high_title]=excel_content[i][6];
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
    nn.data_3_2_5 = data
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}


//deal_table_3_3_1()
exports.deal_table_3_3_1=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let tch_name = 'tch_name' ;
    let jour_name = 'jour_name' ;let in_jour_code = 'in_jour_code' ;let out_jour_code = 'out_jour_code' ;
    let jour_collec = 'jour_collec' ;let pos = 'pos' ;let tenure = 'tenure' ;
    excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
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
        data[i][tch_name]=excel_content[i][0];
        data[i][jour_name]=excel_content[i][1];
        data[i][out_jour_code]=excel_content[i][2];
        data[i][in_jour_code]=excel_content[i][3];
        data[i][jour_collec]=excel_content[i][4];
        data[i][pos]=excel_content[i][5];
        data[i][tenure]=excel_content[i][6];
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
    nn.data_3_3_1 = data
    // console.log(nn)
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}

//deal_table_3_3_2()
exports.deal_table_3_3_2=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let tch_name = 'tch_name' ;
    let ac_org = 'ac_org' ;
    let pos = 'pos' ;
    let tenure = 'tenure' ;
    let yr = 'yr' ;
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
        data[i][tch_name]=excel_content[i][0];
        data[i][ac_org]=excel_content[i][1];
        data[i][pos]=excel_content[i][2];
        data[i][tenure]=excel_content[i][3];
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
    nn.data_3_3_2 = data
    req.body = nn
    // console.log(nn)
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}

//deal_table_3_3_3()
exports.deal_table_3_3_3=function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let tch_name = 'tch_name' ;
    let conf_name = 'conf_name' ;
    let rpt_title = 'rpt_title' ;
    let rpt_yr_mth = 'rpt_yr_mth' ;
    let rpt_place = 'rpt_place' ;
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
        data[i][tch_name]=excel_content[i][1];
        data[i][conf_name]=excel_content[i][2];
        data[i][rpt_title]=excel_content[i][3];
        data[i][rpt_yr_mth]=excel_content[i][4];
        data[i][rpt_place]=excel_content[i][5];
        
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
    nn.data_3_3_3 = data
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

//deal_table_3_3_4() pass
exports.deal_table_3_3_4=function(req,res,next){

    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let tch_name = 'tch_name' ;
    let comp_name = 'comp_name' ;
    let comp_yr_mth = 'comp_yr_mth' ;
    let pos = 'pos' ;
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
        data[i][tch_name]=excel_content[i][0];
        data[i][comp_name]=excel_content[i][1];
        data[i][comp_yr_mth]=excel_content[i][2];
        data[i][pos]=excel_content[i][3];
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
    
    nn.data_3_3_4 = data
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch (err) {
        console.error(err)
    }
    next()
}