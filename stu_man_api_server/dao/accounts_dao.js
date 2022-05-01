const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

//将dao作为mod的子类，mod进行具体对数据库的操作，dao进行逻辑上的操作
module.exports = class accounts_dao extends require('../model/accounts_mod'){

  // 用户登录
  static async login(req,res){
    let body = req.body
    let data = await this.loginUser(body.id,body.password,body.identity)
    if (data.length > 0){
      data = JSON.parse(JSON.stringify(data[0]))
      // 生成token
      data['token'] = await jwt.sign({
        userId: data['id']
      }, jwtSecret, {
        expiresIn: 60 * 60 * 24
      })
      res.status(200).json({data})
    } else {
      res.status(401).end()
    }
  }

  // 获取账号列表(根据页号、页码和搜索关键字)
  static async getAccountList(req,res){
    let query = req.query.query     //查询依据
    let pageNum = Number(req.query.pagenum)
    let pageSize = Number(req.query.pagesize)
    let accountList = await this.getAccounts(query)
    // total记录数据库中的账号总数
    let total = accountList.length

    // 如果能够获取账号列表，返回状态码200并返回获取到的数据，否则返回状态码404
    if (total > 0){
      let start = pageSize * (pageNum - 1)
      let end = Math.min(start + pageSize, total)
      let data = accountList.slice(start, end)
      data[data.length] = {'length': total}
      res.status(200).json({data})
    } else {
      res.status(404).end()
    }
  }

  // 添加一个账号
  static async addAccount(req,res) {
    let body = req.body
    for(var i in body){
      await this.createAccount(body[i].id,body[i].name,body[i].class).then(() => {
        res.status(200).json({i})
      }).catch(err => {
        res.status(403).end()
      })
    }
  }

  // 获取单个账号信息
  static async getAccount(req,res) {
    let id = req.params.id
    await this.getAccountById(id).then(result => {
      if (result.length > 0){
        const data = JSON.parse(JSON.stringify(result[0]))
        res.status(200).json({data})
      }
    }).catch(err => {
      res.status(404).end()
    })
  }

  static async getStatic(req,res) {
    await this.getStaticAll().then(() => {
      res.status(201).end()
    }).catch(err => {
      res.status(403).end()
    })
  }

  static async setScore(req,res) {
    let body = req.body
    await this.setScoreById(body.id,body.index,body.score).then(()=>{
      res.status(201).end()
    }).catch(err=>{
      res.status(403).end()
    })
  }
}