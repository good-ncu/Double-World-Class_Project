// 导入数据库操作模块
const client = require('../../db/index')
// 省厅查看 第四、五、六学科评估情况 （柱状图对比数据）
exports.gov_tjd_4_evaluation = function(req,res) {
    userinfo = req.user
    sql = `select discipline_eval_turn,discipline_eval_result,count(discipline_eval_result) from discipline_eval group by discipline_eval_result ,discipline_eval_turn`
    client.query(sql, function (err, results) {
        if (err) {
            // 异常后调用callback并传入err
            res.send({
                status: 1,
                message: err.message
            })
        } else if (results.rowCount == 0) {
            // 当前sql查询为空，则返回填报提示
            res.cc("无第四轮学科评估信息")
        } else {
            res.send({
                status: 0,
                // data: results.rows
                data:[{
                    "name": "南昌大学",
                    "subject": "绿色食品学科群",
                    "value": "A"
                  },
                  {
                    "name": "南昌大学",
                    "subject": "临床医学与公共卫生大健康学科群",
                    "value": "B-"
                  },
                  {
                    "name": "江西师范大学",
                    "subject": "马克思主义理论",
                    "value": "A-"
                  },
                  {
                    "name": "江西农业大学",
                    "subject": "畜牧学",
                    "value": "B"
                  },
                  {
                    "name": "江西财经大学",
                    "subject": "统计学",
                    "value": "A-"
                  },
                  {
                    "name": "华东交通大学",
                    "subject": "交通运输工程",
                    "value": "B-"
                  },
                  {
                    "name": "江西中医药大学",
                    "subject": "中药学",
                    "value": "B+"
                  },
                  {
                    "name": "景德镇陶瓷大学",
                    "subject": "陶瓷设计与美术",
                    "value": "B+"
                  },
                  {
                    "name": "江西理工大学",
                    "subject": "冶金工程",
                    "value": "C+"
                  },
                  {
                    "name": "东华理工大学",
                    "subject": "地质资源与地质工程",
                    "value": "C"
                  },
                  {
                    "name": "南昌航空大学",
                    "subject": "环境科学与工程",
                    "value": "B-"
                  }]
            })
        }
    });

}


// 省厅查看 国家级学术领军人才（含青年人才）情况
exports.gov_tjd_leaders = function(req,res) {
    /**
     * 1. univ_discipline 先查出所有突击队学科
     * 2. user_fill 去找填报记录 fill_id=
     */
     userinfo = req.user
     sql = `select discipline_eval_turn,discipline_eval_result,count(discipline_eval_result) from discipline_eval group by discipline_eval_result ,discipline_eval_turn`
     client.query(sql, function (err, results) {
         if (err) {
             // 异常后调用callback并传入err
             res.send({
                 status: 1,
                 message: err.message
             })
         } else if (results.rowCount == 0) {
             // 当前sql查询为空，则返回填报提示
             res.cc("无国家级学术领军人才（含青年人才）信息")
         } else {
             res.send({
                 status: 0,
                 // data: results.rows
                 data:[{
                    "dis_name": "南昌大学-绿色食品学科群",
                    "rc_num": "14"
                  },
                  {
                    "dis_name": "江西师范大学-马克思主义理论",
                    "rc_num": "11"
                  },
                  {
                    "dis_name": "江西财经大学-统计学",
                    "rc_num": "10"
                  },
                  {
                    "dis_name": "华东交通大学-交通运输工程",
                    "rc_num": "8"
                  },
                  {
                    "dis_name": "江西理工大学-冶金工程",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "景德镇陶瓷大学-陶瓷设计与美术",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西中医药大学-中药学",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西农业大学-畜牧学",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "东华理工大学-地质资源与地质工程",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "南昌航空大学-环境科学与工程",
                    "rc_num": "4"
                  },
                  {
                    "dis_name": "南昌大学-临床医学与公共卫生大健康",
                    "rc_num": "4"
                  }]
             })
         }
     });
    
}

// 省厅查看 主持国家重点重大项目情况
exports.gov_tjd_hold_big_project = function(req,res) {
    /**
     * 1. univ_discipline 先查出所有突击队学科
     * 2. user_fill 去找填报记录 fill_id=
     */
     userinfo = req.user
     sql = `select discipline_eval_turn,discipline_eval_result,count(discipline_eval_result) from discipline_eval group by discipline_eval_result ,discipline_eval_turn`
     client.query(sql, function (err, results) {
         if (err) {
             // 异常后调用callback并传入err
             res.send({
                 status: 1,
                 message: err.message
             })
         } else if (results.rowCount == 0) {
             // 当前sql查询为空，则返回填报提示
             res.cc("无主持国家重点重大项目信息")
         } else {
             res.send({
                 status: 0,
                 // data: results.rows
                 data:[{
                    "dis_name": "南昌大学-绿色食品学科群",
                    "rc_num": "8"
                  },
                  {
                    "dis_name": "江西师范大学-马克思主义理论",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "江西财经大学-统计学",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "华东交通大学-交通运输工程",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "江西理工大学-冶金工程",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "景德镇陶瓷大学-陶瓷设计与美术",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西中医药大学-中药学",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西农业大学-畜牧学",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "东华理工大学-地质资源与地质工程",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "南昌航空大学-环境科学与工程",
                    "rc_num": "4"
                  },
                  {
                    "dis_name": "南昌大学-临床医学与公共卫生大健康",
                    "rc_num": "3"
                  }]
             })
         }
     });
    
}

// 省厅查看 学科国家级教学成果奖情况
exports.gov_tjd_big_award = function(req,res) {
    /**
     * 1. univ_discipline 先查出所有突击队学科
     * 2. user_fill 去找填报记录 fill_id=
     */
     userinfo = req.user
     sql = `select discipline_eval_turn,discipline_eval_result,count(discipline_eval_result) from discipline_eval group by discipline_eval_result ,discipline_eval_turn`
     client.query(sql, function (err, results) {
         if (err) {
             // 异常后调用callback并传入err
             res.send({
                 status: 1,
                 message: err.message
             })
         } else if (results.rowCount == 0) {
             // 当前sql查询为空，则返回填报提示
             res.cc("无主持国家重点重大项目信息")
         } else {
             res.send({
                 status: 0,
                 // data: results.rows
                 data:[{
                    "dis_name": "南昌大学-绿色食品学科群",
                    "rc_num": "8"
                  },
                  {
                    "dis_name": "江西师范大学-马克思主义理论",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "江西财经大学-统计学",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "华东交通大学-交通运输工程",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "江西理工大学-冶金工程",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "景德镇陶瓷大学-陶瓷设计与美术",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西中医药大学-中药学",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西农业大学-畜牧学",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "东华理工大学-地质资源与地质工程",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "南昌航空大学-环境科学与工程",
                    "rc_num": "4"
                  },
                  {
                    "dis_name": "南昌大学-临床医学与公共卫生大健康",
                    "rc_num": "3"
                  }]
             })
         }
     });
    
}

// 省厅查看 教师国家级奖项情况
exports.gov_tjd_big_teacher_award = function(req,res) {
    /**
     * 1. univ_discipline 先查出所有突击队学科
     * 2. user_fill 去找填报记录 fill_id=
     */
     userinfo = req.user
     sql = `select discipline_eval_turn,discipline_eval_result,count(discipline_eval_result) from discipline_eval group by discipline_eval_result ,discipline_eval_turn`
     client.query(sql, function (err, results) {
         if (err) {
             // 异常后调用callback并传入err
             res.send({
                 status: 1,
                 message: err.message
             })
         } else if (results.rowCount == 0) {
             // 当前sql查询为空，则返回填报提示
             res.cc("无学科国家级教学成果奖情况信息")
         } else {
             res.send({
                 status: 0,
                 // data: results.rows
                 data:[{
                    "dis_name": "南昌大学-绿色食品学科群",
                    "rc_num": "8"
                  },
                  {
                    "dis_name": "江西师范大学-马克思主义理论",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "江西财经大学-统计学",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "华东交通大学-交通运输工程",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "江西理工大学-冶金工程",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "景德镇陶瓷大学-陶瓷设计与美术",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西中医药大学-中药学",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西农业大学-畜牧学",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "东华理工大学-地质资源与地质工程",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "南昌航空大学-环境科学与工程",
                    "rc_num": "4"
                  },
                  {
                    "dis_name": "南昌大学-临床医学与公共卫生大健康",
                    "rc_num": "3"
                  }]
             })
         }
     });
    
}

// 省厅查看 国家级平台建设情况
exports.gov_tjd_big_platform = function(req,res) {
    /**
     * 1. univ_discipline 先查出所有突击队学科
     * 2. user_fill 去找填报记录 fill_id=
     */
     userinfo = req.user
     sql = `select discipline_eval_turn,discipline_eval_result,count(discipline_eval_result) from discipline_eval group by discipline_eval_result ,discipline_eval_turn`
     client.query(sql, function (err, results) {
         if (err) {
             // 异常后调用callback并传入err
             res.send({
                 status: 1,
                 message: err.message
             })
         } else if (results.rowCount == 0) {
             // 当前sql查询为空，则返回填报提示
             res.cc("无国家级平台建设信息")
         } else {
             res.send({
                 status: 0,
                 // data: results.rows
                 data:[{
                    "dis_name": "南昌大学-绿色食品学科群",
                    "rc_num": "8"
                  },
                  {
                    "dis_name": "江西师范大学-马克思主义理论",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "江西财经大学-统计学",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "华东交通大学-交通运输工程",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "江西理工大学-冶金工程",
                    "rc_num": "7"
                  },
                  {
                    "dis_name": "景德镇陶瓷大学-陶瓷设计与美术",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西中医药大学-中药学",
                    "rc_num": "6"
                  },
                  {
                    "dis_name": "江西农业大学-畜牧学",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "东华理工大学-地质资源与地质工程",
                    "rc_num": "5"
                  },
                  {
                    "dis_name": "南昌航空大学-环境科学与工程",
                    "rc_num": "4"
                  },
                  {
                    "dis_name": "南昌大学-临床医学与公共卫生大健康",
                    "rc_num": "3"
                  }]
             })
         }
     });
    
}

