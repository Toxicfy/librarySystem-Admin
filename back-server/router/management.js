const router = require('koa-router')()

// 创建图书分类
router.post('/api/createCategories', async ctx => {
  let postData = ctx.request.body
  console.log(postData)
  ctx.body = postData
  // 链接数据库
})

// 通用上传图片
router.post('/api/uploadImg', async ctx => {
  let fileData = ctx.request.files
  ctx.body = JSON.stringify(fileData)
})
module.exports = router
