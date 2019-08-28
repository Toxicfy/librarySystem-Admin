const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa()
const { errorModel } = require('./util/common.js')

// 数据库
const db = require('./plugins/db')()

// 全局异常捕获
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = errorModel(err.message)
    ctx.app.emit('error', err, ctx)
  }
})

// 实现静态资源服务
const staticPath = './static'
app.use(static(path.join(__dirname, staticPath)))

// 解决跨域问题
const cors = require('koa2-cors')
app.use(cors())

// 加载路由中间件
const router = require('./router/index')
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('listen at port:' + 'http://localhost:3000')
})
