const Koa = require('koa')
const path = require('path')
const KoaBody = require('koa-body')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
// 解决跨域问题
const cors = require('koa2-cors')
app.use(cors())

// 解析koa2上下文formData数据
app.use(bodyParser())
app.use(
  KoaBody({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 3 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      }
    }
  })
)

// 加载路由中间件
const router = require('./router/index')
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('listen at port:' + 'http://localhost:3000')
})
