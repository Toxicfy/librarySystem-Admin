# librarySystem

## 📝 记录一下：

#### 前端部分

>表单验证重置
- 自定义验证函数必须执行 `callback(new Error)`或者 `callback()`
- 清除验证规则而不清除 `value` 使用 `this.$refs['formName'].clearValidate(props: array|string)`, 带参数为一个(`string`)或者多个(`array`)移除，不带参数则为整个表单

> 样式修改: - 使用 `slot` 生成的 `dom`，修改样式，需要写在全局（非 `scoped`）的 `style` 中

> `menu` 设置 `router` 联动，高亮对应路由添加 `<el-menu router :default-active="$route.path">`

> `table` 设置文字超出  `<el-table><el-table-column width=200 :show-overflow-tooltip='true'></el-table-column ></el-table`

#### 后端部分
1. mongoose 定义 schema，采用`type: mongoose.SchemaTypes.ObjectId`以及`ref指定关联的model`关联查询
2. 使用`koa-body` 处理`post请求`发送的数据，包括表单数据（图片的上传）以及 `content-type:application/json` 的数据上传
3. koa2 使用了 `http-assert` 作为断言库，可以配合全局的错误处理中间件完成错误的捕获及处理
       `ctx.assert(condition, status, error.message)`
