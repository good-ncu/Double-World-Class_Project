const nodeXlsx = require('node-xlsx')	//引用node-xlsx模块
var fs = require('fs');
const { table } = require('console');
//deal_table_4_1_1_0()
function deal_table_4_1_1_0(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let tch_name = 'tch_name' ;
    let award_name = 'award_name' ;
    let level = 'level' ;
    let grade = 'grade' ;
    let award_eval_org = 'award_eval_org' ;
    let award_eval_org_type = 'award_eval_org_type' ;
    let yr = 'yr' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][tch_name]=excel_content[i][0];
        data[i][award_name]=excel_content[i][1];
        data[i][level]=excel_content[i][2];
        data[i][grade]=excel_content[i][3];
        data[i][award_eval_org]=excel_content[i][4];
        data[i][award_eval_org_type]=excel_content[i][5];
        data[i][yr]=excel_content[i][6];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}

//deal_table_4_1_1_1()
function deal_table_4_1_1_1(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[1].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let tch_name = 'tch_name' ;
    let award_name = 'award_name' ;
    let grade = 'grade' ;
    let award_eval_org = 'award_eval_org' ;
    let award_eval_org_type = 'award_eval_org_type' ;
    let yr = 'yr' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][tch_name]=excel_content[i][0];
        data[i][award_name]=excel_content[i][1];
        data[i][grade]=excel_content[i][2];
        data[i][award_eval_org]=excel_content[i][3];
        data[i][award_eval_org_type]=excel_content[i][4];
        data[i][yr]=excel_content[i][5];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}

//deal_table_4_1_1_2()
function deal_table_4_1_1_2(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[2].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let tch_name = 'tch_name' ;
    let award_name = 'award_name' ;
    let grade = 'grade' ;
    let award_eval_org = 'award_eval_org' ;
    let award_eval_org_type = 'award_eval_org_type' ;
    let yr = 'yr' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][tch_name]=excel_content[i][0];
        data[i][award_name]=excel_content[i][1];
        data[i][grade]=excel_content[i][2];
        data[i][award_eval_org]=excel_content[i][3];
        data[i][award_eval_org_type]=excel_content[i][4];
        data[i][yr]=excel_content[i][5];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}

//deal_table_4_1_2()
function deal_table_4_1_2(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[3].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let monograph = 'monograph' ;
    let tch_name = 'tch_name' ;
    let publisher = 'publisher' ;
    let publish_date = 'publish_date' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][monograph]=excel_content[i][1];
        data[i][tch_name]=excel_content[i][2];
        data[i][publisher]=excel_content[i][3];
        data[i][publish_date]=excel_content[i][4];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}

//deal_table_4_1_3_0()
function deal_table_4_1_3_0(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[4].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let paper_title = 'paper_title' ;
    let paper_au = 'paper_au' ;
    let jour_name = 'jour_name' ;
    let volume_num = 'volume_num' ;
    let remarks = 'remarks' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][paper_title]=excel_content[i][1];
        data[i][paper_au]=excel_content[i][2];
        data[i][jour_name]=excel_content[i][3];
        data[i][volume_num]=excel_content[i][4];
        data[i][remarks]=excel_content[i][5];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}

//deal_table_4_1_3_1()
function deal_table_4_1_3_1(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[5].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let paper_title = 'paper_title' ;
    let paper_au = 'paper_au' ;
    let jour_name = 'jour_name' ;
    let volume_num = 'volume_num' ;
    let remarks = 'remarks' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][quarter]=excel_content[i][1];
        data[i][paper_title]=excel_content[i][2];
        data[i][paper_au]=excel_content[i][3];
        data[i][jour_name]=excel_content[i][4];
        data[i][volume_num]=excel_content[i][5];
        data[i][remarks]=excel_content[i][6];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_1_3_2()
function deal_table_4_1_3_2(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[6].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let paper_title = 'paper_title' ;
    let paper_au = 'paper_au' ;
    let jour_name = 'jour_name' ;
    let volume_num = 'volume_num' ;
    let remarks = 'remarks' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][quarter]=excel_content[i][1];
        data[i][paper_title]=excel_content[i][2];
        data[i][paper_au]=excel_content[i][3];
        data[i][jour_name]=excel_content[i][4];
        data[i][volume_num]=excel_content[i][5];
        data[i][remarks]=excel_content[i][6];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_1_3_3()
function deal_table_4_1_3_3(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[7].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let paper_title = 'paper_title' ;
    let paper_au = 'paper_au' ;
    let jour_name = 'jour_name' ;
    let volume_num = 'volume_num' ;
    let remarks = 'remarks' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][quarter]=excel_content[i][1];
        data[i][paper_title]=excel_content[i][2];
        data[i][paper_au]=excel_content[i][3];
        data[i][jour_name]=excel_content[i][4];
        data[i][volume_num]=excel_content[i][5];
        data[i][remarks]=excel_content[i][6];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_1_4()
function deal_table_4_1_4(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[8].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let major_desg_or_show_name = 'major_desg_or_show_name' ;
    let parti_date = 'parti_date' ;
    let task = 'task' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][quarter]=excel_content[i][1];
        data[i][major_desg_or_show_name]=excel_content[i][2];
        data[i][parti_date]=excel_content[i][3];
        data[i][task]=excel_content[i][4];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_1_0()
function deal_table_4_2_1_0(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[9].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let plat_name = 'plat_name' ;
    let palt_level = 'palt_level' ;
    let appro_time = 'appro_time' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][plat_name]=excel_content[i][1];
        data[i][palt_level]=excel_content[i][2];
        data[i][appro_time]=excel_content[i][3];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_1_1()
function deal_table_4_2_1_1(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[10].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let plat_name = 'plat_name' ;
    let palt_level = 'palt_level' ;
    let appro_time = 'appro_time' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][plat_name]=excel_content[i][1];
        data[i][palt_level]=excel_content[i][2];
        data[i][appro_time]=excel_content[i][3];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}

//deal_table_4_2_1_2()
function deal_table_4_2_1_2(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[11].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let plat_name = 'plat_name' ;
    let palt_level = 'palt_level' ;
    let appro_time = 'appro_time' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][plat_name]=excel_content[i][1];
        data[i][palt_level]=excel_content[i][2];
        data[i][appro_time]=excel_content[i][3];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_1_3()
function deal_table_4_2_1_3(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[12].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let plat_name = 'plat_name' ;
    let palt_level = 'palt_level' ;
    let appro_time = 'appro_time' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][plat_name]=excel_content[i][1];
        data[i][palt_level]=excel_content[i][2];
        data[i][appro_time]=excel_content[i][3];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_1_3()
function deal_table_4_2_1_3(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[12].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let plat_name = 'plat_name' ;
    let palt_level = 'palt_level' ;
    let appro_time = 'appro_time' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][plat_name]=excel_content[i][1];
        data[i][palt_level]=excel_content[i][2];
        data[i][appro_time]=excel_content[i][3];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_2_0()
function deal_table_4_2_2_0(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[13].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let proj_name = 'proj_name' ;
    let proj_level = 'proj_level' ;
    let proj_type = 'proj_type' ;
    let proj_fromto_ymth = 'proj_fromto_ymth' ;
    let proj_fund = 'proj_fund' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][proj_name]=excel_content[i][1];
        data[i][proj_level]=excel_content[i][2];
        data[i][proj_type]=excel_content[i][3];
        data[i][proj_fromto_ymth]=excel_content[i][4];
        data[i][proj_fromto_ymth]=excel_content[i][5];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_2_1()
function deal_table_4_2_2_1(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[14].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let proj_name = 'proj_name' ;
    let proj_type = 'proj_type' ;
    let proj_fromto_ymth = 'proj_fromto_ymth' ;
    let proj_fund = 'proj_fund' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][proj_name]=excel_content[i][1];
        data[i][proj_type]=excel_content[i][2];
        data[i][proj_fromto_ymth]=excel_content[i][3];
        data[i][proj_fund]=excel_content[i][4];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_2_2()
function deal_table_4_2_2_2(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[15].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let proj_name = 'proj_name' ;
    let proj_type = 'proj_type' ;
    let proj_fromto_ymth = 'proj_fromto_ymth' ;
    let proj_fund = 'proj_fund' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][proj_name]=excel_content[i][1];
        data[i][proj_type]=excel_content[i][2];
        data[i][proj_fromto_ymth]=excel_content[i][3];
        data[i][proj_fund]=excel_content[i][4];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_2_3()
function deal_table_4_2_2_3(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[16].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let proj_name = 'proj_name' ;
    let proj_type = 'proj_type' ;
    let proj_fromto_ymth = 'proj_fromto_ymth' ;
    let proj_fund = 'proj_fund' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][proj_name]=excel_content[i][1];
        data[i][proj_type]=excel_content[i][2];
        data[i][proj_fromto_ymth]=excel_content[i][3];
        data[i][proj_fund]=excel_content[i][4];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_3_1()
function deal_table_4_2_3_1(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[17].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let total_fund = 'total_fund' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][quarter]=excel_content[i][1];
        data[i][total_fund]=excel_content[i][2];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_3_2()
function deal_table_4_2_3_2(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[18].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let total_fund = 'total_fund' ;
    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][quarter]=excel_content[i][1];
        data[i][total_fund]=excel_content[i][2];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_2_4()
function deal_table_4_2_4(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[19].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let jour_name = 'jour_name' ;
    let jour_in_num = 'jour_in_num' ;
    let jour_out_num = 'jour_out_num' ;
    let adopt = 'adopt' ;
    let create_time = 'create_time' ;
    let ac_influ = 'ac_influ' ;
    excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][jour_name]=excel_content[i][1];
        data[i][jour_in_num]=excel_content[i][2];
        data[i][jour_out_num]=excel_content[i][3];
        data[i][adopt]=excel_content[i][4];
        data[i][create_time]=excel_content[i][5];
        data[i][ac_influ]=excel_content[i][6];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_3_1()
function deal_table_4_3_1(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[20].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let proj_name = 'proj_name' ;
    let proj_type = 'proj_type' ;
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let parti_type = 'parti_type' ;
    excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][proj_name]=excel_content[i][0];
        data[i][proj_type]=excel_content[i][1];
        data[i][yr]=excel_content[i][2];
        data[i][quarter]=excel_content[i][3];
        data[i][parti_type]=excel_content[i][4];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}

//deal_table_4_3_1()
function deal_table_4_3_1(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[20].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let proj_name = 'proj_name' ;
    let proj_type = 'proj_type' ;
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let parti_type = 'parti_type' ;
    excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][proj_name]=excel_content[i][0];
        data[i][proj_type]=excel_content[i][1];
        data[i][yr]=excel_content[i][2];
        data[i][quarter]=excel_content[i][3];
        data[i][parti_type]=excel_content[i][4];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}
//deal_table_4_3_2()
function deal_table_4_3_2(){
    ///*读取excel文件*/
    const ex = nodeXlsx.parse("./“双一流”监测平台表格（四）.xlsx")	//读取excel表格
    let excel_content = ex[21].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' ;
    let quarter = 'quarter' ;
    let chn_nsci_num = 'chn_nsci_num' ;
    let chn_hss_num = 'chn_hss_num' ;
    let for_nsci_num = 'for_nsci_num' ;
    let for_hss_num = 'for_hss_num'
    let co_nsci_num = 'co_nsci_num' ;
    let co_hss_num = 'co_hss_num' ;
    excel_content.splice(0,3)	//一般来说表中的第一条数据可能是标题没有用，所以删掉
    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){         //筛选掉末尾空数据
            break
       }
        data[i]={}
        data[i][yr]=excel_content[i][0];
        data[i][quarter]=excel_content[i][1];
        data[i][chn_nsci_num]=excel_content[i][2];
        data[i][chn_hss_num]=excel_content[i][3];
        data[i][for_nsci_num]=excel_content[i][4];
        data[i][for_hss_num]=excel_content[i][5];
        data[i][co_nsci_num]=excel_content[i][6];
        data[i][co_hss_num]=excel_content[i][7];
    }
    var nn={}
    nn.data=data
    console.log(nn)
}