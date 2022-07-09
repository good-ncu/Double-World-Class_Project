/**
 * 1. 先拿到excel文件(由上一个中间件完成)
 * 2. 再将excel改名,将excel解析到json{data_1_1_2:["","",""}
 */
const nodeXlsx = require('node-xlsx')	//引用node-xlsx模块
var fs = require('fs');

//deal_table_2_1_1()
exports.deal_table_2_1_1 = function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    ///*读取excel文件*/
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let project_type = 'project_type' 
    let project_person = 'project_person' 
    let project_year = 'project_year'
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][project_type]=excel_content[i][0]
        data[i][project_person]=excel_content[i][1]
        data[i][project_year]=excel_content[i][2]
    }

    var nn={}
    nn.data_2_1_1=data
    console.log(nn)
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch(err) {
        console.error(err)
    }
    next()
}

// deal_table_2_2_1_0()
exports.deal_table_2_2_1_0 = function(req,res,next){
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    ///*读取excel文件*/
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[1].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let award_ltype = 'award_ltype' ;let award_name = 'award_name' ;let award_type = 'award_type'
    let award_level = 'award_level';let tch_name = 'tch_name';let award_date = 'award_date'
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][award_ltype]=excel_content[i][0];data[i][award_name]=excel_content[i][1]
        data[i][award_type]=excel_content[i][2];data[i][award_level]=excel_content[i][3]
        data[i][tch_name]=excel_content[i][4];data[i][award_date]=excel_content[i][5]
    }

    var nn={}
    nn.data_2_2_1_0=data
    console.log(nn)
    req.body = nn
    // 删除文件
    try {
        fs.unlinkSync(`upload/${up_file.originalname}`)
        //file removed
    } catch(err) {
        console.error(err)
    }
    next()
}

//deal_table_2_2_1_1()
// function deal_table_2_2_1_1(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[2].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let award_name = 'award_name' ;let award_type = 'award_type' ;let award_level = 'award_level'
//     let tch_name = 'tch_name';let award_date = 'award_date'
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][award_name]=excel_content[i][0]
//         data[i][award_type]=excel_content[i][1];
//         data[i][award_level]=excel_content[i][2]
//         data[i][tch_name]=excel_content[i][3];
//         data[i][award_date]=excel_content[i][4]  
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_1_2()
// function deal_table_2_2_1_2(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[3].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let award_name = 'award_name' ;let award_type = 'award_type' ;let award_level = 'award_level'
//     let tch_name = 'tch_name';let award_date = 'award_date'
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][award_name]=excel_content[i][0];
//         data[i][award_type]=excel_content[i][1];
//         data[i][award_level]=excel_content[i][2];
//         data[i][tch_name]=excel_content[i][3];
//         data[i][award_date]=excel_content[i][4]  
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_1_3()
// function deal_table_2_2_1_3(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[4].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let award_name = 'award_name' ;let award_type = 'award_type' ;let award_level = 'award_level'
//     let tch_name = 'tch_name';let award_date = 'award_date'
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][award_name]=excel_content[i][0];
//         data[i][award_type]=excel_content[i][1];
//         data[i][award_level]=excel_content[i][2];
//         data[i][tch_name]=excel_content[i][3];
//         data[i][award_date]=excel_content[i][4]  
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_2_1()
// function deal_table_2_2_2_1(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[5].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let textbook = 'textbook' ;
//     let au_or_tans = 'au_or_tans' ;
//     let sig = 'sig'
//     let publish_date = 'publish_date';
//     let publisher = 'publisher';
//     let revision = 'revision'
//     let tch_textbook_using = 'textbook_using';
//     let remarks = 'remarks';
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][textbook]=excel_content[i][0];
//         data[i][au_or_tans]=excel_content[i][1];
//         data[i][sig]=excel_content[i][2];
//         data[i][publish_date]=excel_content[i][3];
//         data[i][publisher]=excel_content[i][4]  
//         data[i][revision]=excel_content[i][5];
//         data[i][tch_textbook_using]=excel_content[i][6];
//         data[i][remarks]=excel_content[i][7]  
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_2_3()
// function deal_table_2_2_2_3(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[6].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let cour_type = 'cour_type' ;
//     let cour_name = 'cour_name' ;
//     let head_name = 'head_name'
//     let appro_year = 'appro_year';
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     console.log(excel_content)
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][cour_type]=excel_content[i][0];
//         data[i][cour_name]=excel_content[i][1];
//         data[i][head_name]=excel_content[i][2];
//         data[i][appro_year]=excel_content[i][3];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }
//deal_table_2_2_2_4()
// function deal_table_2_2_2_4(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[7].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let cour_type = 'cour_type' ;
//     let cour_name = 'cour_name' ;
//     let head_name = 'head_name'
//     let appro_year = 'appro_year';
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][cour_type]=excel_content[i][0];
//         data[i][cour_name]=excel_content[i][1];
//         data[i][head_name]=excel_content[i][2];
//         data[i][appro_year]=excel_content[i][3];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }
//deal_table_2_2_3_0()
// function deal_table_2_2_3_0(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[8].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let plat_base_type = 'plat_base_type' ;
//     let plat_base_name = 'plat_base_name' ;
//     let head_name = 'head_name'
//     let yr = 'yr';
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][plat_base_type]=excel_content[i][0];
//         data[i][plat_base_name]=excel_content[i][1];
//         data[i][head_name]=excel_content[i][2];
//         data[i][yr]=excel_content[i][3];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_3_1()
// function deal_table_2_2_3_1(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[9].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let plat_base_type = 'plat_base_type' ;
//     let plat_base_name = 'plat_base_name' ;
//     let head_name = 'head_name'
//     let yr = 'yr';
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][plat_base_type]=excel_content[i][0];
//         data[i][plat_base_name]=excel_content[i][1];
//         data[i][head_name]=excel_content[i][2];
//         data[i][yr]=excel_content[i][3];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_3_2()
// function deal_table_2_2_3_2(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[10].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let plat_base_type = 'plat_base_type' ;
//     let plat_base_name = 'plat_base_name' ;
//     let head_name = 'head_name'
//     let yr = 'yr';
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][plat_base_type]=excel_content[i][0];
//         data[i][plat_base_name]=excel_content[i][1];
//         data[i][head_name]=excel_content[i][2];
//         data[i][yr]=excel_content[i][3];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_4()
// function deal_table_2_2_4(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[11].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let yr = 'yr' ;
//     let master_tutor_num = 'master_tutor_num' ;
//     let doc_tutor_num = 'doc_tutor_num'
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][yr]=excel_content[i][0];
//         data[i][master_tutor_num]=excel_content[i][1];
//         data[i][doc_tutor_num]=excel_content[i][2];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_5()
// function deal_table_2_2_5(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[12].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let yr = 'yr' ;
//     let sem = 'sem' ;
//     let num_full_prof = 'num_full_prof'
//     let num_full_prof_teach_underg = 'num_full_prof_teach_underg'
//     excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][yr]=excel_content[i][0];
//         data[i][sem]=excel_content[i][1];
//         data[i][num_full_prof]=excel_content[i][2];
//         data[i][num_full_prof_teach_underg]=excel_content[i][3];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_6()
// function deal_table_2_2_6(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[13].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let award_date = 'award_date'
//     let award_name = 'award_name'
//     let award_work = 'award_work'
//     let award_level = 'award_level'
//     let org_name = 'org_name'
//     let org_type = 'org_type'
//     let stu_name = 'stu_name'
//     let stu_type = 'stu_type'
// }

//deal_table_2_2_7()
// function deal_table_2_2_7(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[14].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let publish_date = 'publish_date' ;
//     let paper_title = 'paper_title' ;
//     let stu_name = 'stu_name'
//     let stu_type = 'stu_type'
//     let jour_name = 'jour_name' ;
//     let jour_volume = 'jour_volume'
//     let jour_collec = 'jour_collec'
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][publish_date]=excel_content[i][0];
//         data[i][paper_title]=excel_content[i][1];
//         data[i][stu_name]=excel_content[i][2];
//         data[i][stu_type]=excel_content[i][3];
//         data[i][jour_name]=excel_content[i][4];
//         data[i][jour_volume]=excel_content[i][5];
//         data[i][jour_collec]=excel_content[i][6];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_2_7()
// function deal_table_2_2_7(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[14].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let publish_date = 'publish_date' ;
//     let paper_title = 'paper_title' ;
//     let stu_name = 'stu_name'
//     let stu_type = 'stu_type'
//     let jour_name = 'jour_name' ;
//     let jour_volume = 'jour_volume'
//     let jour_collec = 'jour_collec'
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][publish_date]=excel_content[i][0];
//         data[i][paper_title]=excel_content[i][1];
//         data[i][stu_name]=excel_content[i][2];
//         data[i][stu_type]=excel_content[i][3];
//         data[i][jour_name]=excel_content[i][4];
//         data[i][jour_volume]=excel_content[i][5];
//         data[i][jour_collec]=excel_content[i][6];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_3_1()
// function deal_table_2_3_1(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[15].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let yr = 'yr' ;
//     let award_bd_num = 'award_bd_num' ;
//     let award_md_num = 'award_md_num'
//     let award_phd_num = 'award_phd_num'
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][yr]=excel_content[i][0];
//         data[i][award_bd_num]=excel_content[i][1];
//         data[i][award_md_num]=excel_content[i][2];
//         data[i][award_phd_num]=excel_content[i][3];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }
//deal_table_2_3_2()
// function deal_table_2_3_2(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[16].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let stu_name = 'stu_name' ;
//     let grad_year = 'grad_year' ;
//     let pro_contribute_proj = 'pro_contribute_proj'
//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][stu_name]=excel_content[i][0];
//         data[i][grad_year]=excel_content[i][1];
//         data[i][pro_contribute_proj]=excel_content[i][2];
//     }

//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

//deal_table_2_4_1()
// function deal_table_2_4_1(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[17].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let yr = 'yr' ;
//     let b_enroll_year = 'b_enroll_year' ;
//     let b_cur_num = 'b_cur_num'
//     let m_enroll_year = 'm_enroll_year' ;
//     let m_cur_num = 'm_cur_num' ;
//     let phd_enroll_year = 'phd_enroll_year'
//     let phd_cur_num = 'phd_cur_num' ;
//     let exch_num = 'exch_num' ;

//     excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][yr]=excel_content[i][0];
//         data[i][b_enroll_year]=excel_content[i][1];
//         data[i][b_cur_num]=excel_content[i][2];
//         data[i][m_enroll_year]=excel_content[i][3];
//         data[i][m_cur_num]=excel_content[i][4];
//         data[i][phd_enroll_year]=excel_content[i][5];
//         data[i][phd_cur_num]=excel_content[i][6];
//         data[i][exch_num]=excel_content[i][7];
//     }
//     var nn={}
//     nn.data=data
//     console.log(nn)
// }

// deal_table_2_4_2()
// function deal_table_2_4_2(){
//     const up_file = req.file
//     console.log(up_file);
//     fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
//     ///*读取excel文件*/
//     const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
//     let excel_content = ex[18].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
//     let yr = 'yr' ;
//     let stu_name = 'stu_name' ;
//     let stu_type = 'stu_type'
//     let conf_name = 'conf_name' ;
//     let rpt_name = 'rpt_name' ;
//     let rpt_time = 'rpt_time'
//     let rpt_place = 'rpt_place' ;

//     excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
//     /**将读取的数据处理成json格式 */
//     var data=[]
//     for(let i=0,len=excel_content.length;i<len;i++){
//         if(excel_content[i].length==0){         //筛选掉末尾空数据
//             break
//        }
//         data[i]={}
//         data[i][yr]=excel_content[i][0];
//         data[i][stu_name]=excel_content[i][1];
//         data[i][stu_type]=excel_content[i][2];
//         data[i][conf_name]=excel_content[i][3];
//         data[i][rpt_name]=excel_content[i][4];
//         data[i][rpt_time]=excel_content[i][5];
//         data[i][rpt_place]=excel_content[i][6];
//     }
//     var nn={}
//     nn.data=data
//     console.log(nn)
// }