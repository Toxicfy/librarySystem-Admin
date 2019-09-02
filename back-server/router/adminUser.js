const router = require('koa-router')()
const koaBody = require('koa-body')
const AdminUser = require('../models/AdminUser')
const { successModel, errorModel } = require('../util/common')

// 创建用户
router.post('/create', koaBody(), async (ctx, next) => {
  let postData = ctx.request.body
  try {
    const model = await AdminUser.create(postData) // 数据插入
    ctx.body = successModel(model, '创建用户成功')
  } catch (error) {
    if (error.code === 11000) {
      ctx.body = errorModel('创建用户失败，该用户已存在')
      await next()
    }
  }
})

// 删除
router.post('/del', koaBody(), async ctx => {
  const _id = ctx.request.body.id
  const model = await AdminUser.findOneAndRemove({ _id })
  ctx.body = successModel(model, '删除用户成功')
})

// 获取用户用户列表
router.get('/list', async ctx => {
  const model = await AdminUser.find().populate('bookshelf')
  ctx.body = successModel(model, '用户数据查询成功')
})

// 获取用户信息
router.get('/detail', async ctx => {
  const { id } = ctx.request.query
  const model = await AdminUser.findById(id)
  ctx.body = successModel(model, '用户数据查询成功')
})

// 更新用户姓名
router.post('/update', koaBody(), async ctx => {
  let postData = ctx.request.body
  const model = await AdminUser.findByIdAndUpdate(postData._id, postData)
  ctx.body = successModel(model, '更新用户数据成功')
})

// 获取用户的书架
router.get('/shelf', async ctx => {
  const model = await AdminUser.findById(ctx.currentId, {
    bookshelf: 1
  }).populate('bookshelf')
  ctx.body = successModel(model, '获取个人书架信息成功')
})

// 添加书籍
router.post('/addShelf', koaBody(), async ctx => {
  const { id } = ctx.request.body
  const model = await AdminUser.findByIdAndUpdate(
    ctx.currentId,
    { $push: { bookshelf: id } },
    { safe: true, upsert: true }
  )
  ctx.body = successModel(model, '书籍已添加到书架')
})

// 书架删除书籍
router.post('/removeShelf', koaBody(), async ctx => {
  const { id } = ctx.request.body
  const model = await AdminUser.findByIdAndUpdate(ctx.currentId, {
    $pull: { bookshelf: id }
  })
  ctx.body = successModel(model, '书籍已移出书架')
})

module.exports = router
