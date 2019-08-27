// 全局提示
export const notify = (_this, title, type = 'success', offset = 90) => {
  _this.$notify({ title, type, offset })
}
