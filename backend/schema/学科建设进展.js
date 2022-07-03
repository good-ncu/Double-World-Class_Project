
//数据案例1：表1-1-2
// table_1_1_2=[{"评估轮次":"第三轮","本学科评估结果":"D+"},
//         {"评估轮次":"第四轮","本学科评估结果":"B+"},
//         {"评估轮次":"第五轮","本学科评估结果":"unknown"},
//         {"评估轮次":"第六轮（预计）","本学科评估结果":"unknown"}]

exports.a = function(req,res,next){
    table_1_1_2=req.body
    for(let i=0,len=table_1_1_2.length;i<len;i++){
    
    if (/[一二三四]/g.test(table_1_1_2[i].评估轮次)){
        if(/A\+|A|A\-|B\+|B|B\-|C\+|C|C\-|NULL/g.test(table_1_1_2[i].本学科评估结果)){
            console.log(table_1_1_2[i])
        }
        else{
            // console.log('a填报错误！')
            return res.cc()
        }

    }
    else{
        if(/unknown/g.test(table_1_1_2[i].本学科评估结果)){
            console.log(table_1_1_2[i])
        }
        else{
            return res.cc()
        }
    }    
    }
    next()
}