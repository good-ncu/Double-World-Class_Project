const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 * integer()值必须是整数
 */


// 学校代码验证
const unicode = joi.number().integer().min(5).max(5).required()
// 学科代码验证
const disciplinecode = joi.number().integer().min(4).max(4).required()
// 角色类别验证规则
const roleid = joi.number().integer().greater(0).less(5).required()

//表1-1-2：本学科评估结果
const benXueKePingGuJieGuo=joi.string().valid('A+','A','A-','B+','B','B-','C+','C','C-','NULL','未发布').required()

//年度      表1-1-3：本学科影响力情况       ,表1-1-4
const nianDu = joi.number().integer().min(2000).max(2020).required()
//排行榜/数据库名称      表1-1-3
const paiHangBang = joi.string().required()
//本学科排名名次          表1-1-3
const benXueKePaiMingMingCi=joi.string().valid('A+','A','A-','B+','B','B-','C+','C','C-','未发布').required()

//表1-1-4：本学科建设经费数额（万元）
const jianSheJingFeiZongE=joi.number().required()
//表1-1-4：中央专项，预算经费	
const zhongYangZhuanXiangYuSuanJingFei=joi.number()
//表1-1-4：中央专项，实际到账	
const zhongYangZhuanXiangShiJiDaoZhang=joi.number()
//表1-1-4：中央专项，实际支出
const zhongYangZhuanXiangShiJiZhiChu=joi.number()
//表1-1-4：地方投入，预算经费	
const diFangTouRuYuSuanJingFei=joi.number()
//表1-1-4：地方投入，实际到账	
const diFangTouRuShiJiDaoZhang=joi.number()
//表1-1-4：地方投入，实际支出
const diFangTouRuShiJiZhiChu=joi.number()
//表1-1-4：学科自筹，预算经费	
const xueKeZiChouYuSuanJingFei=joi.number()
//表1-1-4：学科自筹，实际到账	
const xueKeZiChouShiJiDaoZhang=joi.number()
//表1-1-4：学科自筹，实际支出
const xueKeZiChouShiJiZhiChu=joi.number()
//表1-1-4：其他，预算经费	
const qiTaYuSuanJingFei=joi.number()
//表1-1-4：学科自筹，实际到账	
const qiTaShiJiDaoZhang=joi.number()
//表1-1-4：学科自筹，实际支出
const qiTaShiJiZhiChu=joi.number()






//表1-1-2：本学科评估结果验证规则
exports.sub_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body:{
    benXueKePingGuJieGuo,
  },
}

//表1-1-3：本学科影响力情况
exports.benXueKeYingXiangQingKuang = {
  // 表示需要对 req.body 中的数据进行验证
  body:{
    nianDu,
    paiHangBang,
    benXueKePaiMingMingCi
  },
}

//表1-1-4：本学科建设经费数额（万元）													
exports.benXueKeYingXiangQingKuang = {
  // 表示需要对 req.body 中的数据进行验证
  body:{
    nianDu,
    jianSheJingFeiZongE,
    zhongYangZhuanXiangYuSuanJingFei,
    zhongYangZhuanXiangShiJiDaoZhang,
    zhongYangZhuanXiangShiJiZhiChu,
    diFangTouRuYuSuanJingFei,
    diFangTouRuShiJiDaoZhang,
    diFangTouRuShiJiZhiChu,
    xueKeZiChouYuSuanJingFei,
    xueKeZiChouShiJiDaoZhang,
    xueKeZiChouShiJiZhiChu,
    qiTaYuSuanJingFei,
    qiTaShiJiDaoZhang,
    qiTaShiJiZhiChu
  },
}