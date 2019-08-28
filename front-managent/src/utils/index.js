// 全局提示
export const notify = (_this, title, type = 'success', offset = 90, duration = 1500) => {
  _this.$notify({ title, type, offset, duration })
}
