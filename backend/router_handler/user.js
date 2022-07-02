// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 注册的处理函数
exports.register = function(req,res){
  // 获取客户端提交的用户信息
  const userinfo = req.body
  console.log("注册信息：");
  console.log(userinfo);
  // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
  userinfo.password = bcrypt.hashSync(userinfo.password, 10)
  const sql = "insert into user_table(username,Passwd,UniCode,DisciplineCode,RoleID) values($1,$2,$3,$4,$5)"
  client.query(sql, [userinfo.username,userinfo.password,userinfo.unicode,userinfo.disciplinecode,userinfo.roleid], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.send({ status: 1, message: err.message })
    console.log("sql执行成功");
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
    }
    // 注册成功
    res.send({ status: 0, message: '注册成功！' })
  })
}

// 登录的处理函数
exports.login = function(req, res){
  console.log(req.body);
  // 接收表单数据
  const userinfo = req.body
  // 定义SQL
  const sql = `select * from user_table where username = '${userinfo.username}'`
  // 执行SQL
  client.query(sql,(err,results)=>{
      if(err) return res.cc(err)
      console.log('登录信息：')
      console.log(userinfo);
      // 检查有无该用户
      console.log(results.rows);
      if(results.rows.length<1){
          return res.cc('无该用户，登录失败')
      }
    // 判断密码是否正确
    // const compareResult = bcrypt.compareSync(userinfo.password, results.rows[0].password)
    // if(!compareResult) return res.cc('密码错误，登录失败')
    if(userinfo.password!==results.rows[0].Passwd) return res.cc('密码错误，登录失败')

    // 服务端生成Token
    const user = {...results.rows[0], password: ''}
    // 参数1：用户信息；参数2：token密钥；参数3：有效时间  
    const tokenStr = jwt.sign(user, config.jwtSecretKey,{expiresIn: config.expiresIn})

    res.send({
        status: 0,
        msg: '登陆成功',
        token:'Bearer '+ tokenStr
    })
  })
}
