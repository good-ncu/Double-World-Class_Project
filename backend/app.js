// 导入 express
const express = require('express')
// 创建服务器的实例对象
const app = express()
const joi = require('@hapi/joi')

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 解析完成之后会挂载到req.body上
app.use(express.json())
// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 在路由之前封装 res.cc 函数简化res.send发送错误消息
app.use((req,res,next)=>{
  res.cc = function(err, status=1){
      res.send({
          status,
          // 是Error类型就输出message属性，否则则可能是字符串就直接输出
          message:err instanceof Error ? err.message:err
      })
  }
  next()
})



// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')



// /api/login接口的不走解析token中间件，注册要携带token
app.use(expressJWT({secret: config.jwtSecretKey,algorithms: ['HS256']}).unless({
  path: [
    /^\/api\/login/,
    /^\/api\/download/,
    /^\/api\/alluniv/
  ]
}))


// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用主页展示指标模块
const chart_show = require('./router/query/chart')
app.use('/api/chart',chart_show)

// 导入并使用平台首页 学科建设进展 路由模块
const disci_consRouter = require('./router/user_fill/disci-cons')
app.use('/api/index/disci-cons',disci_consRouter)

// 导入并使用平台首页 培养拔尖创新人才 路由模块
const cultivate_talentsRouter = require('./router/user_fill/cultivate-talents')
app.use('/api/index/cultivate-talents',cultivate_talentsRouter)

// 导入并使用平台首页 建设一流师资队伍 路由模块
const teacher_teamRouter = require('./router/user_fill/teacher-team')
app.use('/api/index/teacher-team',teacher_teamRouter)

// 导入并使用平台首页 科学研究 路由模块
const researchRouter = require('./router/user_fill/research')
app.use('/api/index/research',researchRouter)

// 导入并使用平台首页 社会服务 路由模块
const social_servicesRouter = require('./router/user_fill/social-services')
app.use('/api/index/social-services',social_servicesRouter)

// 导入 学校管理员对已填报数据的查询（审核） 路由模块
const school_reviewRouter = require('./router/query/school-review')
app.use('/api/index/school-query',school_reviewRouter)


// 导入 下载模板的路由模块
const download_router = require('./router/download')
app.use('/api',download_router)


const all_univ = require('./router/all_univ')
app.use('/api',all_univ)

// 启动服务器
app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007')
})

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})
