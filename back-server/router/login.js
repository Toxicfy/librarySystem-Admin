const router = require('koa-router')()
const koaBody = require('koa-body')
const AdminUser = require('../models/AdminUser')
const jwt = require('jsonwebtoken')
const { privateKey } = require('../util/common')
const { successModel } = require('../util/common')

router.post('/', koaBody(), async ctx => {
  const { username, password } = ctx.request.body
  const user = await AdminUser.findOne({ username: username }).select([
    'username',
    'password'
  ])
  ctx.assert(user, 422, '该用户不存在')
  const isValid = require('bcrypt').compareSync(password, user.password)
  ctx.assert(isValid, 422, '密码错误')
  const token = jwt.sign({ id: user._id , time: Date.now()}, privateKey)
  ctx.body = successModel({ token: token, name: user.username }, '登录成功')
  //  TODO:
  //  1. 前端样式修改
  //     表单验证(✔️)
  //     axios拦截器(✔️)
  //  2. 后端服务添加校验token中间件（用于处理token是否有效）
})

module.exports = router
