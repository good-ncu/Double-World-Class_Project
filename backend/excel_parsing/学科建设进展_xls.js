/**
 * 1. 先拿到excel文件(由上一个中间件完成)
 * 2. 再将excel改名,将excel解析到json{data_1_1_2:["","",""}
 */

const nodeXlsx = require('node-xlsx')	//引用node-xlsx模块
var fs = require('fs');
const { table } = require('console');


//deal_table_1_1_2()  pass 
exports.deal_table_1_1_2 = function (req, res, next) {
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex1 = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    // //下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet)
    let excel_content = ex1[0].data	//取出excel文件中的第一个工作表中的全部数据

    let one_title = 'discipline_eval_turn'  //excel_content[1][0]
    let title = 'discipline_eval_result' //excel_content[1][1]

    excel_content.splice(0, 2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉

    /**将读取的数据处理成json格式 */
    var data = []
    for (let i = 0, len = excel_content.length; i < len; i++) {
        if (excel_content[i].length == 0) {
            break
        }
        data[i] = {}
        if (excel_content[i][0] == '第四轮') {
            data[i][one_title] = 4
        } else if (excel_content[i][0] == '第五轮') {
            data[i][one_title] = 5
        } else if (excel_content[i][0] == '第六轮（预计）') {
            data[i][one_title] = 6
        }
        // data[i][one_title]=excel_content[i][0]
        data[i][title] = excel_content[i][1]
    }

    var nn = {}
    nn.data_1_1_2 = data
    console.log(nn);
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

//deal_table_1_1_3()  pass
exports.deal_table_1_1_3 = function (req, res, next) {
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr' //excel_content[1][0]
    let rank_type = 'rank_type' //excel_content[1][1]
    let rank = 'rank' //excel_content[1][1]
    excel_content.splice(0, 2)	//一般来说表中的第一条数据可能是标题没有用，所以删掉

    /**将读取的数据处理成json格式 */
    var data = []
    for (let i = 0, len = excel_content.length; i < len; i++) {
        if (excel_content[i].length == 0) {         //筛选掉末尾空数据
            break
        }
        data[i] = {}
        data[i][yr] = excel_content[i][0]
        data[i][rank_type] = excel_content[i][1]
        data[i][rank] = excel_content[i][2]
    }

    var nn = {}
    nn.data_1_1_3 = data
    console.log(nn);
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

//deal_table_1_1_4()  pass
exports.deal_table_1_1_4 = function (req, res, next) {
    const up_file = req.file
    console.log(up_file);
    fs.renameSync(up_file.path, `upload/${up_file.originalname}`)
    const ex = nodeXlsx.parse(`upload/${up_file.originalname}`)	//读取excel表格
    let excel_content = ex[0].data	//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet),取出excel文件中的第一个工作表中的全部数据
    let yr = 'yr'; let total_fund = 'total_fund'; let ctr_budg_fund = 'ctr_budg_fund';
    let ctr_receive_fund = 'ctr_receive_fund'; let ctr_expend_fund = 'ctr_expend_fund';
    let lcl_budg_fund = 'lcl_budg_fund'; let lcl_receive_fund = 'lcl_receive_fund';
    let lcl_expend_fund = 'lcl_expend_fund'; let self_budg_fund = 'self_budg_fund';
    let self_receive_fund = 'self_receive_fund'; let self_expend_fund = 'self_expend_fund';
    let other_budg_fund = 'other_budg_fund'; let other_receive_fund = 'other_receive_fund';
    let other_expend_fund = 'other_expend_fund';
    excel_content.splice(0, 3)
    /**将读取的数据处理成json格式 */
    var data = []
    for (let i = 0, len = excel_content.length; i < len; i++) {
        if (excel_content[i].length == 0) {         //筛选掉末尾空数据
            break
        }
        data[i] = {};
        data[i][yr] = excel_content[i][0]; data[i][total_fund] = excel_content[i][1];
        data[i][ctr_budg_fund] = excel_content[i][2]; data[i][ctr_receive_fund] = excel_content[i][3];
        data[i][ctr_expend_fund] = excel_content[i][4]; data[i][lcl_budg_fund] = excel_content[i][5];
        data[i][lcl_receive_fund] = excel_content[i][6]; data[i][lcl_expend_fund] = excel_content[i][7];
        data[i][self_budg_fund] = excel_content[i][8]; data[i][self_receive_fund] = excel_content[i][9];
        data[i][self_expend_fund] = excel_content[i][10]; data[i][other_budg_fund] = excel_content[i][11];
        data[i][other_receive_fund] = excel_content[i][12]; data[i][other_expend_fund] = excel_content[i][13];
    }
    var nn = {}
    nn.data_1_1_4 = data
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

