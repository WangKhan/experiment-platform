
module.exports = class profile_mod extends require('./model') {

  // 根据id获取学生用户信息(需要从user和student两张表中获取)
  static getStuProfileById(id){
    return new Promise((resolve, reject) => {
      let sql = "select account.id,account.name,account.class,account.tel,account.email,account.gender,user.password from" +
          " account, user where account.id= user.id and account.id ='" + id + "'"
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 根据id更新学生用户信息(需要更新user和account两张表)
  static updateStuProfileById(id, body){
    return new Promise((resolve, reject) => {
      let sql = "update account" +
          " set name='" + body.name + "',class='" + body.class + "',gender='" + body.gender + "',email='" + body.email + "',tel='" + body.tel + "' where id='" + id + "'"
      this.query(sql).then(result_1 => {
        sql = "update user" +
            " set password='" + body.password + "' where id='" + id + "'"
        this.query(sql).then(result_2 => {
          resolve([result_1, result_2])
        })
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 根据id获取题目完成信息
  static getTaskById(id){
    return new Promise((resolve, reject) => {
      let sql = "select task1,task2,task3,task4,task5,task6 from" +
          " task where id ='" + id + "'"
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static updateTaskStatusById(id,body){
    return new Promise((resolve, reject) => {
      let sql = "update task" +
          " set task1='" + body.task1 + "',task2='" + body.task2 + "',task3='" + body.task3 + "',task4='" + body.task4 + "',task5='" + body.task5 +"',task6='" + body.task6 + "' where id='" + id + "'"
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }
}