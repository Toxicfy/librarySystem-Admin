const router = require('koa-router')()
const koaBody = require('koa-body')
const AdminUser = require('../models/AdminUser')
const { successModel } = require('../util/common')

// admin_user/create
router.post('/create', koaBody(), async ctx => {
  let postData = ctx.request.body
  const model = await AdminUser.create(postData) // 数据插入
  ctx.body = successModel(model, '创建管理员成功')
})

// 删除
router.post('/del', koaBody(), async ctx => {
  const _id = ctx.request.body.id
  const model = await AdminUser.findOneAndRemove({ _id })
  ctx.body = successModel(model, '删除管理员成功')
})

// 获取管理员用户列表
router.get('/list', async ctx => {
  const model = await AdminUser.find()
  ctx.body = successModel(model, '管理员数据查询成功')
})

// 获取管理员信息
router.get('/detail', async ctx => {
  const { id } = ctx.request.query
  const model = await AdminUser.findById(id)
  ctx.body = successModel(model, '数据查询成功')
})

// 更新管理员姓名
router.post('/update', koaBody(), async ctx => {
  let postData = ctx.request.body
  const model = await AdminUser.findByIdAndUpdate(postData._id, postData)
  ctx.body = successModel(model, '更新数据成功')
})

module.exports = router
