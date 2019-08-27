const router = require('koa-router')()
const koaBody = require('koa-body')
const AdminUser = require('../models/AdminUser')
const jwt = require('jsonwebtoken')
const privateKey = 'libraryManagement'
const { successModel } = require('../util/common')

router.post('/', koaBody(), async ctx => {
  const { username, password } = ctx.request.body
  const user = await AdminUser.findOne({ username: username }).select([
    'username',
    'password'
  ])
  const isValid = require('bcrypt').compareSync(password, user.password)
  const token = jwt.sign({ id: user._id }, privateKey)
  ctx.body = successModel({ token: token, name: user.username }, '登录成功')
})

module.exports = router
