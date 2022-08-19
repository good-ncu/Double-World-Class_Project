// 导入数据库操作模块
const client = require('../../db/index')

// 省厅查看 突击队学科 （柱状图对比数据）
exports.gov_compare_subject = function (req, res) {
  userinfo = req.user
  params = req.body.params
  console.log(params)
  // 字符串转array
  params = JSON.parse(params)
  console.log(params)
  var arr = []
  for (let i = 0, len = params.length; i < len; i++) {
    arr[i] = params[i].split('-')
  }
  console.log(arr)
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
      res.cc("无突击队学科信息")
    } else {
      res.send({
        status: 0,
        // data: results.rows
        subjects: [
          {
            "school": "南昌大学",
            "subject": "计算机科学与技术"
          },
          {
            "school": "江西财经大学",
            "subject": "软件工程"
          },
          {
            "school": "江西农业大学",
            "subject": "网络安全"
          }
        ],
        data: [
          {
            "name": "学科建设进展",
            "datas": [
              [
                "学科评估情况",
                {
                  "value": "第四轮评估：B",
                  "award": false
                },
                {
                  "value": "第四轮评估：B",
                  "award": false
                },
                {
                  "value": "第四轮评估：B",
                  "award": false
                }
              ],
              [
                "学科影响力情况",
                {
                  "value": "软科排名：21",
                  "award": false
                },
                {
                  "value": "软科排名：21",
                  "award": false
                },
                {
                  "value": "软科排名：21",
                  "award": false
                }
              ],
              [
                "本学科建设经费数额（万元）",
                {
                  "value": "100",
                  "award": true
                },
                {
                  "value": "100",
                  "award": true
                },
                {
                  "value": "100",
                  "award": true
                }
              ]
            ]
          }
        ]
      })
    }
  });

}

