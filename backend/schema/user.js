const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(13).required().error(new Error('用户名格式错误，要求1~13位a~z0~9字符'))
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required().error(new Error('密码格式错误'))
// 学校代码验证 // ^\d{5}$ 五位数字
const unicode = joi.string().pattern(/^\d{5}$/).required().error(new Error('学校代码格式错误，必须需要5位数字'))
// 学科代码验证
const disciplinecode = joi.string().pattern(/^\d{4}$/).required().error(new Error('学科代码格式错误，必须需要4位数字'))
// 注册时角色类别验证规则
const roleidRegister = joi.number().integer().greater(3).less(5).required().error(new Error('角色类别格式错误'))
// 登录时角色类别验证规则
// const roleidLogin = joi.number().integer().greater(0).less(5).required().error(new Error('角色类别格式错误'))
// 工号验证规则
const jobnumber =  joi.string().min(1).max(13).required().error(new Error('工号格式错误，必须需要五位数字'))
// 手机号验证
const phonenumber = joi.string().pattern(/^\d{11}$/).error(new Error('手机号码格式错误，必须需要11位数字'))


// 注册表单的验证规则对象
exports.register_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
    // unicode,
    disciplinecode,
    // roleidRegister,
    jobnumber,
    phonenumber
  },
}

// 登录表单的验证规则对象
exports.login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      username,
      password,
      // roleidLogin,
    },
}