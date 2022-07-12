// 导入数据库操作模块
const client = require('../../db/index')

// 学校查看 学科评估情况
exports.discipline_eval_school = function(req,res) {
    res.send({
        mes:"03"
    })
}

