// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 导入生成随机UUID
const uuid = require ('uuid')

// 注册的处理函数
exports.register = function(req,res){
  // 获取客户端提交的用户信息
  const userinfo = req.body
  console.log("注册信息：======================");
  console.log("表单数据：======================");
  console.log(userinfo);
  console.log("Token解析数据：======================");
  console.log(req.user);
  // 先检查是否重名
  client.query(`select * from user_info where username = '${userinfo.username}'`,function (err,results) {
    if(results.rows.length!==0){
      return res.send({ status: 1,message:'用户名重复'})
    } 
    // 再执行注册操作
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    user = req.user
    const sql = "insert into user_info(id,username,passwd,univ_code,discipline_code,role_id,job_number,phone) values($1,$2,$3,$4,$5,4,$6,$7)"
    client.query(sql, 
      [
        uuid.v1().replace(/-/g, ''),
        userinfo.username,userinfo.password,
        user.univ_code,userinfo.disciplinecode,userinfo.jobnumber,
        userinfo.phonenumber
      ],
      function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
          console.log(err);
          return res.cc(new Error('注册用户名失败！'))
        }
        console.log("sql执行成功");
        // SQL 语句执行成功，但影响行数不为 1
        if (results.rowCount !== 1) {
          return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
        }
        // 注册成功
        res.send({ status: 0, message: '注册成功！' })
      }
    )
  }) 
}

exports.pre_register = function(req,res){
  user = req.user
  sql = `select (discipline_code, discipline_name) from univ_discipline where univ_code = '${user.univ_code}'`
  client.query(sql, function(err,result){
    if(err){
      console.log(err);
      res.cc('系统繁忙，请稍后再试')
    }
    var data = []
    let discipline_code = 'discipline_code'
    let discipline_name = 'discipline_name'
    for(let i = 0,len= result.rowCount;i<len;i++){
      // 每一个元素都是一个JSON
      data[i] = {}
      // (0201,理论经济学)，截取学科代码和学科名称
      var disci_code_t = result.rows[i].row.substring(result.rows[i].row.indexOf("(")+1,result.rows[i].row.indexOf(","))
      var disci_name_t = result.rows[i].row.substring(result.rows[i].row.indexOf(",")+1,result.rows[i].row.indexOf(")"))
      data[i][discipline_code] = disci_code_t
      data[i][discipline_name] = disci_name_t
    }
    console.log(data.length);
    return res.send({
      discipline: data
    })
  })
}

// 登录的处理函数
exports.login = function(req, res){
  // 接收表单数据
  const userinfo = req.body
  // 定义SQL
  const sql = `select * from user_info where username = '${userinfo.username}'`
  // 执行SQL
  client.query(sql,(err,results)=>{
      if(err) {
        console.log(err.message);
        return res.cc(err)
      }
      console.log('登录信息：')
      console.log(userinfo);
      // 检查有无该用户
      if(results.rows.length<1){
          return res.cc('无该用户，登录失败')
      }
    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results.rows[0].passwd)
    if(!compareResult) return res.cc('密码错误，登录失败')
    // if(userinfo.password!==results.rows[0].passwd) return res.cc('密码错误，登录失败')
    
    // if(userinfo.roleidLogin!=results.rows[0].role_id) return res.cc('角色类别错误，登录失败')

    // 服务端生成Token
    const user = {...results.rows[0], passwd: ''}
    // 参数1：用户信息；参数2：token密钥；参数3：有效时间  
    const tokenStr = jwt.sign(user, config.jwtSecretKey,{expiresIn: config.expiresIn})
    
    var roleStr = ''
    rid = results.rows[0].role_id
    switch(results.rows[0].role_id)
    {
        case 1:
            roleStr = '超级管理员'
            break;
        case 2:
            roleStr = '省厅管理员'
            break;
        case 3:
            roleStr = '学校管理员'
            break;
        default:
            roleStr = '学科填报用户'
    }
    // 不用查学校、学科
    if(results.rows[0].role_id == 2 || results.rows[0].role_id == 1) {
      if(results.rows[0].role_id==1){
        var flag = 'root'
      }else if (results.rows[0].role_id == 2){
        var flag = '省厅'
      }
      return res.send({
        status: 0,
        msg: '登录成功',
        username: userinfo.username,
        roleid: results.rows[0].role_id, 
        role: roleStr,
        univ_name: flag,
        discipline_name: '',
        token:'Bearer '+ tokenStr
      })
    }
    // 只用查学校，不用查学科
    if(results.rows[0].role_id == 3){
      client.query(`select * from univ_discipline where univ_code = '${user.univ_code}'`, function(err, results) {
        if(err) {
          console.log(err.message);
          return res.cc('系统繁忙，请稍后再试')
        }
        if(results.rowCount==0){
          return res.cc('查无此学校或学科')
        }
        return res.send({
          status: 0,
          msg: '登录成功',
          username: userinfo.username,
          roleid: rid, 
          role: roleStr,
          univ_name: results.rows[0].univ_name,
          discipline_name: '',
          token:'Bearer '+ tokenStr
        })
      })
    } 
    // 学校、学科全部都要查
    if(results.rows[0].role_id == 4){
      client.query(`select * from univ_discipline where univ_code = '${user.univ_code}' and discipline_code = '${user.discipline_code}'`, function(err, results) {
        if(err) {
          console.log(err.message);
          return res.cc('系统繁忙，请稍后再试')
        }
        console.log(results.rowCount);
        if(results.rowCount==0){
          return res.cc('查无此学校或学科')
        }
        return res.send({
          status: 0,
          msg: '登录成功',
          username: userinfo.username,
          roleid: rid, 
          role: roleStr,
          univ_name: results.rows[0].univ_name,
          discipline_name: results.rows[0].discipline_name,
          token:'Bearer '+ tokenStr
        })
      })
    } 
  })
}

// 修改密码接口
exports.alter_pwd_internal = function(req, res){
  // 接收表单数据
  const userinfo = req.body
  // 定义SQL
  const sql = `select * from user_info where username = '${userinfo.username}'`
  client.query(sql, (err,results)=>{
    if(err) {
      console.log(err.message);
      return res.cc(err)
    }
    // 检查有无该用户
    if(results.rows.length<1){
      return res.cc('无该用户')
    }
    // 判断旧密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.oldpassword, results.rows[0].passwd)
    if(!compareResult) return res.cc('密码错误，修改失败')
    user_id = results.rows[0].id
    // 修改为新密码
    newpassword = bcrypt.hashSync(userinfo.newpassword, 10)
    console.log(newpassword);
    console.log(userinfo.newpassword);
    // 修改密码sql
    const update_sql = `UPDATE user_info SET passwd = '${newpassword}' WHERE id = ${user_id};`
    client.query(update_sql, (err,results)=>{
      if(err) {
        console.log(err.message);
        return res.cc(err)
      }
      console.log("密码修改成功");
      return res.send({
          status: 0,
          user_id: user_id, 
          newpassword: newpassword ,
          message: '修改成功'
      })
    })
  })
}
