// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')


// 登录的处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userinfo = req.body
  // 定义SQL
  const sql = `select * from user_table where username = '${userinfo.username}'`
  // 执行SQL
  client.query(sql,(err,results)=>{
      if(err) return res.cc(err)
      console.log(userinfo.username);
      // 检查有无该用户
      console.log(results.rows);
      if(results.length<1){
          return res.cc('无该用户，登录失败')
      }
      // 判断密码是否正确
    // const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if(userinfo.password!==results.rows[0].Passwd) return res.cc('密码错误，登录失败')

    // 服务端生成Token
    const user = {...results.rows[0], password: ''}
    // 参数1：用户信息；参数2：token密钥；参数3：有效时间  jjjll
    const tokenStr = jwt.sign(user, config.jwtSecretKey,{expiresIn: config.expiresIn})
    //jjjjjjjsss
    res.send({
        status: 0,
        msg: '登陆成功',
        token:'Bearer '+ tokenStr
    })
  })
}
