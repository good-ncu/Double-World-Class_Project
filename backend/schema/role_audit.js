/**
 * 
    验证角色类别，是否可以访问对应角色的接口
 */

exports.is_gov = function(req,res,next){
    if(req.user.id == 2){
        next()
    } else {
        return res.cc('角色类别错误，无法访问')
    }
}

exports.is_school = function(req,res,next){
    console.log(req.user.id);
    if(req.user.id == 3){
        next()
    } else {
        return res.cc('角色类别错误，无法访问')
    }
}

exports.is_discipline = function(req,res,next){
    console.log(req.user.id);
    if(req.user.id == 4){
        next()
    } else {
        return res.cc('角色类别错误，无法访问')
    }
}