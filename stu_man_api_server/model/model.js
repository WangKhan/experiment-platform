const mysql = require('mysql')

// 创建连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: '3306',
  database: 'stu_man'
})

// 封装一个数据库模型基类
module.exports = class Model {
  static query(sql){
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          console.error(err)
          connection.release()
        } else {
          // query执行sql语句
          connection.query(sql, (err,results)=>{
            if (err){
              reject(err)
            } else {
              resolve(results)
            }
            // 结束会话，释放链接
            connection.release()
          })
        }
      })
    })
  }
}
