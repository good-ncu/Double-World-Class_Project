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

// api接口的不走解析token中间件
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/api/]}))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)




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
