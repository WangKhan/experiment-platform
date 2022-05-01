const express = require('express')
const userList = require('../dao/accounts_dao')
const auth = require('../middleware/auth')

const router = express.Router()

// 用户登录请求
router.post('/login', function (req, res, next) {
  try {
    userList.login(req,res)
  } catch (err) {
    next(err)
  }
})

// 获取账号列表
router.get('/accounts', auth, function (req, res, next) {
  try {
    userList.getAccountList(req,res)
  } catch (err) {
    next(err)
  }
})

// 添加一个账号
router.post('/accounts', auth, function (req, res, next) {
  try {
    userList.addAccount(req,res)
  } catch (err) {
    next(err)
  }
})

// 获取单个账号信息
router.get('/accounts/:id', auth, function (req, res, next) {
  try {
    userList.getAccount(req,res)
  } catch (err) {
    next(err)
  }
})

// 获取统计信息
router.get('/accounts/static', auth, function (req, res, next) {
  try {
    userList.getStatic(req,res)
  } catch (err) {
    next(err)
  }
})

router.post('/accounts/grade', auth, function (req, res, next) {
  try {
    userList.setScore(req,res)
  } catch (err) {
    next(err)
  }
})

module.exports = router
