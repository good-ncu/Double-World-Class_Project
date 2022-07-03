const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const register_schema = require('../schema/user').register_schema
const login_schema = require('../schema/user').login_schema

// // multer处理multipart/form-data
// var multer  = require('multer')
// var upload = multer()


// 注册学科填报用户
/**
 * @api {post} /api/register 用户注册
 * @apiName register
 * @apiGroup api
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 用户密码
 * @apiParam {Number} roleidRegister 注册用户角色类别
 * @apiParam {Number} unicode 学校代码
 * @apiParam {Number} disciplinecode 学科代码
 * @apiParam {Number} jobnumber 工号
 * @apiParam {Number} phonenumber 手机号
 *
 * @apiSuccess {Number} state 成功:0;失败:1
 * @apiSuccess {String} message 注册操作反馈
 * @apiSampleRequest http://localhost:3007/api/register
 * @apiVersion 1.0.0
 */
router.post('/register', expressJoi(register_schema), user_handler.register)

// 登录（所有类型的用户都用该接口）
router.post('/login', expressJoi(login_schema), user_handler.login)



module.exports = router
