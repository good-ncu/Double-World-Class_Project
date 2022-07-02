const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const register_schema  = require('../schema/user').register_schema
const  login_schema  = require('../schema/user').login_schema

// // multer处理multipart/form-data
// var multer  = require('multer')
// var upload = multer()

<<<<<<< HEAD
// 注册学科填报用户
router.post('/register', expressJoi(register_schema), user_handler.register)
// 登录（所有类型的用户都用该接口）
router.post('/login', expressJoi(login_schema), user_handler.login)
=======
// 登录  a a a a 
router.post('/login', user_handler.login)
>>>>>>> 731628145568d50a8bddc88a9869d28b76d8d292

module.exports = router
