
module.exports = class profile_dao extends require('../model/profile_mod') {

  // 根据id获取学生个人信息
  static async getStuProfile(req,res) {
    let id = req.params.id
    await this.getStuProfileById(id).then(result => {
      if (result.length > 0) {
        const data = JSON.parse(JSON.stringify(result[0]))
        res.status(200).send({data})
      }
    }).catch(err => {
      res.status(404).end()
    })
  }

  // 根据id更新学生个人信息
  static async updateStuProfile(req,res) {
    let id = req.params.id
    let body = req.body
    await this.updateStuProfileById(id, body).then(result => {
      res.status(201).end()
    }).catch(err => {
      res.status(403).end()
    })
  }

  // 根据id获取题目完成信息
  static async getTask(req,res) {
    let id = req.params.id
    await this.getTaskById(id).then(result => {
      if (result.length > 0) {
        const data = JSON.parse(JSON.stringify(result[0]))
        res.status(200).send({data})
      }
    }).catch(err => {
      res.status(404).end()
    })
  }

  // 根据id更新题目完成信息
  static async updateTaskStatus(req,res){
    let id = req.params.id
    let body = req.body
    await this.updateTaskStatusById(id, body).then(result => {
      res.status(201).end()
    }).catch(err => {
      res.status(403).end()
    })
  }

}