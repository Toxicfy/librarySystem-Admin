const router = require('koa-router')()
const koaBody = require('koa-body')
const { koaBodyConfig, successModel } = require('../util/common')

// 数据表对象（基于此对象 - 增删改查）
const Category = require('../models/category')
const imgConfig = koaBodyConfig('../static/upload/category')

// 创建图书分类
router.post('/create', koaBody(), async ctx => {
  let postData = ctx.request.body
  const model = await Category.create(postData) // 数据插入
  ctx.body = successModel(model, '创建图书分类成功')
})

// 上传图片
router.post('/uploadImg', koaBody(imgConfig), async ctx => {
  const fileInfo = ctx.request.files.file
  const name = fileInfo.path.split('/').pop()
  const url = `http://localhost:3000/upload/category/${name}`
  ctx.body = successModel({ url, fileInfo }, '上传图片成功')
})

// 获取图书分类列表
router.get('/getList', async ctx => {
  let model = await Category.find().sort({ _id: -1 })
  ctx.body = successModel(model, '数据获取成功')
})

// 删除单个分类数据
router.post('/del', koaBody(), async ctx => {
  const _id = ctx.request.body.id
  const model = await Category.findOneAndRemove({ _id })
  ctx.body = successModel(model, '删除数据成功')
})

// 获取单个分类数据
router.get('/detail', async ctx => {
  const id = ctx.query.id
  if (id) {
    const model = await Category.findById(id)
    ctx.body = successModel(model, '数据获取成功')
  }
})

// 更新单个分类数据
router.post('/update', koaBody(), async ctx => {
  let postData = ctx.request.body
  let model = await Category.findByIdAndUpdate(postData._id, postData)
  ctx.body = successModel(model, '更新数据成功')
})

module.exports = router
