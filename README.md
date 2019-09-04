# librarySystem

> 这是一个基于 Koa2 + Vue 的书籍管理系统（包含后台系统页面以及服务端代码）

### 项目构建

#### 前端部分

- `Vue.js`+ `Vue Router` 基于脚手架页面构建
- `Element-ui` 页面组件库（notify,table,button）
- `Axios` 数据请求和封装
- `Scss` 样式预处理器

#### 服务端部分

- `koa-static` 图片等资源的静态化；
- `koa2-cors` 支持跨域访问提供的 api；
- `koa-body` 解析请求携带的数据（图片及`application/json`）
- `mongoose` 数据模型定义：连接 `MongoDB`

### 📝 记录的点

- 前后端完成图片的上传(`el-upload`,`koa-body`)
- 后端全局的错误捕获及处理（`koa-assert`，中间件捕获）
- 权限访问 (`jwt`的生成校验及`Axios`封装及`Vue Router`的配合)
- 基于 `mongoose` 的增删改查以及 `model` 的关联
