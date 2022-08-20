// 导入数据库操作模块
const client = require('../../db/index')

// 整体 - 01学科建设进展情况
exports.gov_overview_listen_01 = function(req,res){
    userinfo = req.user
    sql = `select * from user_fill`
    client.query(sql, function (err, results) {
        if (err) {
          // 异常后调用callback并传入err
          res.send({
            status: 1,
            message: err.message
          })
        } else if (results.rowCount == 0) {
          // 当前sql查询为空，则返回填报提示
          res.cc("无学科建设进展情况信息")
        } else {
          console.log("========gov_overview_listen_01   results_to_data: =========");
          res.send({
            status: 0,
            // data: results.rows
            evaluationData: [
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "江西财经大学",
                  "subject": "应用经济学"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "江西农业大学",
                  "subject": "畜牧学"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "华东交通大学",
                  "subject": "交通运输工程"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌航空大学",
                  "subject": "环境科学与工程"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "东华理工大学",
                  "subject": "地质资源与地质工程"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "江西中医药大学",
                  "subject": "中药学"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌大学",
                  "subject": "绿色食品学科群"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌大学",
                  "subject": "临床医学"
                },
                {
                  "title": "第四轮学科评估",
                  "rank": "A",
                  "evaluation": "A+",
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                }
              ],
              rankData: [
                {
                  "title": "ESI",
                  "rank": 102,
                  "year": 2021,
                  "ave": 100,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "ESI",
                  "rank": 102,
                  "year": 2021,
                  "ave": 101,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "武书连",
                  "rank": 102,
                  "year": 2021,
                  "ave": 102,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "武书连",
                  "rank": 102,
                  "year": 2021,
                  "ave": 103,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "武书连",
                  "rank": 102,
                  "year": 2021,
                  "ave": 104,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "软科",
                  "rank": 102,
                  "year": 2021,
                  "ave": 105,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "软科",
                  "rank": 102,
                  "year": 2021,
                  "ave": 106,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "软科",
                  "rank": 102,
                  "year": 2021,
                  "ave": 107,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "ESI",
                  "rank": 102,
                  "year": 2021,
                  "ave": 108,
                  "school": "南昌大学",
                  "subject": "软件工程"
                },
                {
                  "title": "ESI",
                  "rank": 102,
                  "year": 2021,
                  "ave": 109,
                  "school": "南昌大学",
                  "subject": "软件工程"
                }
              ],
              findData:[
                {
                  "key": 1,
                  "yr": 2015,
                  "total_fund": 888,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 2,
                  "yr": 2015,
                  "total_fund": 889,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 3,
                  "yr": 2015,
                  "total_fund": 890,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 4,
                  "yr": 2015,
                  "total_fund": 891,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 5,
                  "yr": 2015,
                  "total_fund": 892,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 6,
                  "yr": 2015,
                  "total_fund": 893,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 7,
                  "yr": 2015,
                  "total_fund": 894,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 8,
                  "yr": 2015,
                  "total_fund": 895,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 9,
                  "yr": 2015,
                  "total_fund": 896,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                },
                {
                  "key": 10,
                  "yr": 2015,
                  "total_fund": 897,
                  "ctr_budg_fund": 888,
                  "ctr_receive_fund": 888,
                  "ctr_expend_fund": 888,
                  "lcl_budg_fund": 888,
                  "lcl_receive_fund": 888,
                  "lcl_expend_fund": 888,
                  "self_budg_fund": 888,
                  "self_receive_fund": 888,
                  "self_expend_fund": 888,
                  "other_budg_fund": 888,
                  "other_receive_fund": 888,
                  "other_expend_fund": 88,
                  "school": "南昌大学",
                  "subject": "计算机科学与技术"
                }
              ]
          })
        }
      });
}