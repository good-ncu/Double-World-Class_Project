// 省厅查看 学科评估情况
exports.discipline_eval_gov = function(req,res) {
    res.send({
        mes:"00"
    })
}

// 学校查看 学科评估情况
exports.discipline_eval_school = function(req,res) {
    res.send({
        mes:"01"
    })
}