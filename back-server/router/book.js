const router = require('koa-router')()
const koaBody = require('koa-body')
const { successModel, koaBodyConfig } = require('../util/common')

// mongodb model
const Book = require('../models/book')
const imgConfig = koaBodyConfig('../static/upload/book')

// 书籍上传图片
router.post('/uploadImg', koaBody(imgConfig), async ctx => {
  const fileInfo = ctx.request.files.file
  const name = fileInfo.path.split('/').pop()
  const url = `http://localhost:3000/upload/book/${name}`
  ctx.body = successModel({ url, fileInfo }, '上传图片成功')
})

// 创建书籍信息
router.post('/create', koaBody(), async ctx => {
  const postData = ctx.request.body
  const model = await Book.create(postData)
  ctx.body = successModel(model, '书籍信息创建成功')
})

// 书籍信息查询
router.get('/detail', async ctx => {
  const { id } = ctx.query
  console.log(ctx.request)
  const model = await Book.findById(id).populate('categoryId')
  ctx.body = successModel(model, '书籍数据查询成功')
})

// 书籍列表查询
router.get('/list', async ctx => {
  const model = await Book.find()
    .populate('categoryId')
    .sort({ id: -1 })
  ctx.body = successModel(model, '数据查询成功')
})

// 书籍删除
router.post('/del', koaBody(), async ctx => {
  const { id } = ctx.request.body
  if (id) {
    const model = await Book.findByIdAndRemove(id)
    ctx.body = successModel(model, '数据删除成功')
  }
})

// 书籍编辑
router.post('/edit', koaBody(), async ctx => {
  const postData = ctx.request.body
  const model = await Book.findByIdAndUpdate(postData._id, postData)
  ctx.body = successModel(model, '更新数据成功')
})

module.exports = router
