
module.exports = class accounts_mod extends require('./model'){

  // 用户登录
  static loginUser(id,password,identity){
    return new Promise((resolve, reject) => {
      let sql = "select * " +
                "from user " +
                "where binary id='"+id+"' and password='"+password+"' and identity='"+identity+"'"
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 获取账号列表(根据页号、页码和搜索关键字)
  static getAccounts(query){
    return new Promise((resolve, reject) => {
      let sql
      if (query) {
        sql = "select user.id,account.name,task.task1,task.task2,task.task3,task.task4,task.task5,task.task6," +
        "task.task1sco,task.task2sco,task.task3sco,task.task4sco,task.task5sco,task.task6sco " +
        "from user,task,account " +
        "where user.id = task.id and account.id=task.id and user.id like '%"+query+"%'"
      } else {
        sql = "select user.id,account.name,task.task1,task.task2,task.task3,task.task4,task.task5,task.task6," +
            "task.task1sco,task.task2sco,task.task3sco,task.task4sco,task.task5sco,task.task6sco " +
            "from user,task,account " +
            "where user.id = task.id and account.id=task.id "
      }
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 添加一个账号
  static createAccount(id,name,cla){
    return new Promise((resolve, reject) => {
      let sql = "insert into" +
          " user(id,password,identity) " +
          "values('" + id + "',123456,1)"
      this.query(sql).then(result => {
        resolve(result)
        let sql= "insert into " +
        "account(id,name,class,tel,email,gender)" +
        "values('"+id+"','"+name+"','"+cla+"','','','')"
        this.query(sql)
        let sql1= "insert into " +
        "task(id,task1,task2,task3,task4,task5,task6)" +
        "values('"+id+"',0,0,0,0,0,0)"
        this.query(sql1)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 获取一个账号信息
  static getAccountById(id){
    return new Promise((resolve, reject) => {
      let sql = "select * " +
          "from user where id='" + id + "'"
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getStaticAll(){
    return new Promise((resolve, reject) => {
      let sql = "select * " +
          "from user where id='" + id + "'"
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setScoreById(id,index,score){
    return new Promise((resolve, reject) => {
      let sql = "update task "+
      "set task"+index+"sco = '"+score+"' "+
      "where id ='"+id+"'"
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }
}