// 导入数据库操作模块
const client = require('../../db/index')

exports.home_school_query = function(req,res) {
    res.send({
        message:"school"
    })
}