exports.table_1_1_2 = function(req,res,next){//数据案例1：表1-1-2,   此时discipline_eval_turn不用手动填报,系统自带
    table=req.body
    
    // exports.table_1_1_2 = function(req,res,next){
        // table=req.body
        for(let i=0,len=table.length;i<len;i++){
            if (/[4]/g.test(table[i].discipline_eval_turn)){
                if(/A\+|A|A\-|B\+|B|B\-|C\+|C|C\-|NULL/g.test(table[i].discipline_eval_result)){
                    console.log(table[i]);
                }
                else{
                    // console.log('1学科评估结果填报错误！')
                    return res.cc('学科评估结果填报错误！')
                }
            }
            else{
                if(/unknown/g.test(table[i].discipline_eval_result)){
                     console.log(table[i])
                    continue;
                }
                else{
                    return res.cc('学科评估结果填报错误！')
                    // console.log('2学科评估结果填报错误！')
                }
            }
        }
        next()
    
    //数据案例1：表1-1-2,   此时discipline_eval_turn不用手动填报,系统自带
}