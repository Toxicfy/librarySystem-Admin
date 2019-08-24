<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
  // 引入样式重置文件
  @import 'css/reset.css';
  // 修改 element-ui 部分样式
  .el-menu-item-group__title{
    margin-bottom: 10px;
  }
</style>
