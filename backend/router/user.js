const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const register_schema = require('../schema/user').register_schema
const login_schema = require('../schema/user').login_schema

// // multer处理multipart/form-datas
// var multer  = require('multer')
// var upload = multer()


// 注册学科填报用户
router.post('/register', expressJoi(register_schema), user_handler.register)
// 获取该学校的所有学科信息
router.post('/pre-register', user_handler.pre_register)

// 登录（所有类型的用户都用该接口）
router.post('/login', expressJoi(login_schema), user_handler.login)

// 智慧教育平台 auth2login 登录
router.get('/auth2login', user_handler.auth2login)

// 修改密码， 不对用户暴露接口
router.post('/alter-pwd-internal', user_handler.alter_pwd_internal)



module.exports = router
