const express = require('express')
const profile = require('../dao/profile_dao')
const auth = require('../middleware/auth')

const router = express.Router()

// 根据学生id获取个人信息
router.get('/stu/:id', auth, function (req, res, next) {
  try {
    profile.getStuProfile(req,res)
  } catch (err) {
    next(err)
  }
})

// 根据学生id更新个人信息
router.post('/stu/:id', auth, function (req, res, next) {
  try {
    profile.updateStuProfile(req,res)
  } catch (err) {
    next(err)
  }
})

// 获取题目完成信息
router.get('/task/:id', auth, function (req,res,next){
  try{
    profile.getTask(req,res)
  } catch (err) {
    next(err)
  }
})

// 更新题目完成情况
router.post('/task/:id', auth, function (req, res, next) {
  try {
    profile.updateTaskStatus(req,res)
  } catch (err) {
    next(err)
  }
})

module.exports = router
