# librarySystem

## 📝 记录一下：

> element-ui 表单验证重置

- 自定义验证函数必须执行 `callback(new Error)`或者 `callback()`
- 清除验证规则而不清除 `value` 使用 `this.$refs['formName'].clearValidate(props: array|string)`, 带参数为一个(`string`)或者多个(`array`)移除，不带参数则为整个表单

> 样式修改: - 使用 slot 生成的 dom，修改样式，需要写在全局（非 scoped）的 style 中

> menu 设置 router 联动，高亮对应路由添加 `<el-menu router :default-active="$route.path">`
