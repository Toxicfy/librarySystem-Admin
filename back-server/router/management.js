const router = require('koa-router')()
const koaBody = require('koa-body')
const path = require('path')
const koaBodyConfig = {
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../static/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024 // 文件上传大小
  }
}
// 数据表对象（基于此对象 - 增删改查）
const Category = require('../models/category')

// 创建图书分类
router.post('/api/createCategories', koaBody(), async ctx => {
  let postData = ctx.request.body
  console.log(ctx.request)
  // ctx.body = postData
  // 链接数据库
  const model = await Category.create(postData);  
  ctx.body = model;
})

// 通用上传图片
router.post('/api/uploadImg', koaBody(koaBodyConfig), async ctx => {
  const fileInfo = ctx.request.files.file
  const name = fileInfo.path.split('/').pop()
  const url = `http://localhost:3000/upload/${name}`
  console.log(fileInfo.path.split('/').pop())
  ctx.body = JSON.stringify({
    err_num: 0,
    url,
    fileInfo
  })
})

module.exports = router
