// 导入 express
const express = require('express')
// 创建服务器的实例对象
const app = express()
const joi = require('@hapi/joi')

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));


const newLog = function () {
  console.info(new Date().toLocaleString());
  arguments.callee.oLog.apply(this, arguments);
};
const newError = function () {
  // console.info(new Date().toLocaleString());
  process.stderr.write(new Date().toLocaleString())
  console.info();
  arguments.callee.oError.apply(this, arguments);
};
newLog.oLog = console.log;
newError.oError = console.error;
console.log = newLog;
console.error = newError;


// 解析完成之后会挂载到req.body上
app.use(express.json())
// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 在路由之前封装 res.cc 函数简化res.send发送错误消息
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      // 是Error类型就输出message属性，否则则可能是字符串就直接输出
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})



// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')





// /api/login接口的不走解析token中间件，注册要携带token
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({
  path: [
    /^\/api\/login/,
    /^\/api\/auth2login/,
    /^\/api\/download/,
    /^\/api\/alluniv/,
    /^\/api\/alldiscipline/,
    /^\/api\/download-report/,
    /^\/api\/word-filled-download/,
    /^\/api\/alter-pwd-internal/,
    /^\/api\/attach-filled-download/,
    /^\/api\/index\/school-query\/review-download-filled-word/,
    /^\/api\/index\/school-query\/review-download-query-wordname/,
    /^\/api\/index\/school-query\/export-all-discipline-table/
  ]
}))


// 导入并使用用户路由模块    token 验证用
const userRouter = require('./router/user')
app.use('/api', userRouter)


// 导入并使用用户暂存模块   学科 - 暂存 
const fill_switch = require('./router/fill_switch')
app.use('/api/fill_switch', fill_switch)


// 导入并使用 附件上传模块
const upload_attachment = require('./router/user_fill/upload_attachment')
app.use('/api', upload_attachment)

// 导入并使用 附件下载模块
const download_attachment = require('./router/query/download_attachment')
app.use('/api', download_attachment)

// 导入并使用用户暂存模块   学科 - 暂存 
const user_save = require('./router/user_fill/user_save')
app.use('/api', user_save)

// 导入并使用主页展示指标模块    政府、学校的图表展示
const chart_show = require('./router/query/chart')
app.use('/api', chart_show)


// 导入并使用主页对比指标模块    政府、学校的学科对比展示
const compare_show = require('./router/query/compare')
app.use('/api', compare_show)

// 导入并使用省厅主页  整体学科情况
const gov_query_overall = require('./router/query/gov_query_overall')
app.use('/api', gov_query_overall)



// 省厅
//  学科建设进展 路由模块    详情
const disci_consRouter_deatail = require('./router/dis_detail/disci-cons')
app.use('/api', disci_consRouter_deatail)

// 导入并使用平台首页 培养拔尖创新人才 路由模块     详情
const cultivate_talentsRouter_deatail = require('./router/dis_detail/cultivate-talents')
app.use('/api', cultivate_talentsRouter_deatail)

// 导入并使用平台首页 建设一流师资队伍 路由模块    详情
const teacher_teamRouter_deatail = require('./router/dis_detail/teacher-team')
app.use('/api', teacher_teamRouter_deatail)

// 导入并使用平台首页 科学研究 路由模块    详情
const researchRouter_deatail = require('./router/dis_detail/research')
app.use('/api', researchRouter_deatail)

// 导入并使用平台首页 社会服务 路由模块    详情
const social_servicesRouter_deatail = require('./router/dis_detail/social-services')
app.use('/api', social_servicesRouter_deatail)











// 导入并使用平台首页 学科建设进展 路由模块    填报
const disci_consRouter = require('./router/user_fill/disci-cons')
app.use('/api/index/disci-cons', disci_consRouter)

// 导入并使用平台首页 培养拔尖创新人才 路由模块     填报
const cultivate_talentsRouter = require('./router/user_fill/cultivate-talents')
app.use('/api/index/cultivate-talents', cultivate_talentsRouter)

// 导入并使用平台首页 建设一流师资队伍 路由模块    填报
const teacher_teamRouter = require('./router/user_fill/teacher-team')
app.use('/api/index/teacher-team', teacher_teamRouter)

// 导入并使用平台首页 科学研究 路由模块    填报
const researchRouter = require('./router/user_fill/research')
app.use('/api/index/research', researchRouter)

// 导入并使用平台首页 社会服务 路由模块    填报
const social_servicesRouter = require('./router/user_fill/social-services')
app.use('/api/index/social-services', social_servicesRouter)

// 导入 当前学科用户哪些表填了，那些表没填，表都是打开了填报周期的表 路由模块
const show_tables = require('./router/user_fill/show_tables')
app.use('/api/index', show_tables)

// 导入 学校管理员对已填报数据的查询（审核） 路由模块
const school_reviewRouter = require('./router/query/school-review')
app.use('/api/index/school-query', school_reviewRouter)

// 导入 学科填报用户 对已填报数据的查询（审核） 路由模块
const user_reviewRouter = require('./router/query/user-review')
app.use('/api/index/user-query', user_reviewRouter)

// 导入 省厅用户 对已填报数据的查询（删除） 路由模块
const gov_reviewRouter = require('./router/query/gov-review')
app.use('/api/index/gov-query', gov_reviewRouter)

// 导入并使用 省厅删除数据 路由模块
const gov_review_del = require('./router/query/gov-review-del')
app.use('/api/gov-review-del', gov_review_del)

// 导入 下载模板的路由模块
const download_router = require('./router/download')
app.use('/api', download_router)

// 查所有学校
const all_univ = require('./router/all_univ')
app.use('/api', all_univ)

// 查所有学科
const all_discipline = require('./router/all_discipline')
app.use('/api', all_discipline)

// 生成报告模板，并向模板中填入数据
const download_gen_report = require('./router/gen_report')
app.use('/api', download_gen_report)

//  省厅 查询一些关于 一流学校与学科对应的关系的接口
const gov_query_school_disc = require('./router/query/gov_query_school_disc')
app.use('/api', gov_query_school_disc)

// 启动服务器
var server = app.listen(8081, () => {
  console.log('api server running at http://127.0.0.1:8081')
})
// 将超时机制关闭，避免 Error: read ECONNRESET
server.setTimeout(0)

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.code == 'ENAMETOOLONG') return res.cc('文件名过长，请以默认模板文件名命名文件！');
  // 未知错误
  console.error(err);
  res.cc(err)
})
