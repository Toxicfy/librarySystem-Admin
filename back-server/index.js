const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa()

// 数据库
const db = require('./plugins/db')()

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
