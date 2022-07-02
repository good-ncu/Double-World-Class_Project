// 导入数据库操作模块
const client = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')


// 登录的处理函数
exports.login = (req, result) => {
  let sql = 'select * from user_table';
  client.query(sql, (err, res) => {
      if (err) {
          console.log(err);
      } else {
        result.json({
              statue: 200,
              count: res.rowCount,
              message: "查询成功!!!!！",
              date: res.rows
          });
      }
  })
}
