const router = require('koa-router')()
const koaBody = require('koa-body')
const fs = require('fs')
const path = require('path')
const { successModel, koaBodyConfig, errorModel } = require('../util/common')

// mongodb model
const Book = require('../models/book')
const imgConfig = koaBodyConfig('../static/upload/book')
const imgBaseUrl = 'http://localhost:3000/upload/book'

// 书籍上传图片
router.post('/uploadImg', koaBody(imgConfig), async ctx => {
  const fileInfo = ctx.request.files.file
  const name = fileInfo.path.split('/').pop()
  const url = `${imgBaseUrl}/${name}`
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
    const info = await Book.findById(id)
    const imgFileName = info.coverImg.split(imgBaseUrl)[1]
    const imgPath = path.join(__dirname, '../static/upload/book', imgFileName)
    fs.unlinkSync(imgPath) // 同时删除书籍封面
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

// 根据分类查询当前分类下所有图书
router.get('/filterByCategory', async ctx => {
  const categoryId = ctx.query.id
  if (categoryId) {
    const model = await Book.find({ categoryId: categoryId })
    ctx.body = successModel(model, '该分类书籍获取成功')
  } else {
    ctx.body = errorModel('获取分类失败')
  }
})

module.exports = router
