/**
 * 1. 先拿到excel文件(由上一个中间件完成)
 * 2. 再将excel改名,将excel解析到json{data_1_1_2:["","",""}
 */

/*读取excel文件*/
const nodeXlsx = require('node-xlsx')	//引用node-xlsx模块
const fs = require('fs');

exports.table_1_1_2 = function(req,res,next){
    
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex1 = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    // //下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet)
    let excel_content = ex1[0].data	//取出excel文件中的第一个工作表中的全部数据

    let one_title = 'discipline_eval_turn'  //excel_content[1][0]
    let title = 'discipline_eval_result' //excel_content[1][1]

    excel_content.splice(0,2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉

    /**将读取的数据处理成json格式 */
    var data=[]
    for(let i=0,len=excel_content.length;i<len;i++){
        if(excel_content[i].length==0){
            break
        }
        data[i]={}
        if(excel_content[i][0]=='第四轮') {
            data[i][one_title] = 4
        } else if(excel_content[i][0]=='第五轮') {
            data[i][one_title] = 5
        } else if(excel_content[i][0]=='第六轮（预计）'){
            data[i][one_title]=6
        }
        // data[i][one_title]=excel_content[i][0]
        data[i][title]=excel_content[i][1]
    }

    var nn={}
    nn.data_1_1_2=data
    console.log(nn);
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