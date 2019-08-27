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
  .el-form-item__label{
    width: 100px;
  }
  .el-notification{
    background: #303133 !important;
    .el-notification__title{
      font-size: 15px;
      color: #ffffff;
      line-height: 28px;
    }
  }
  // global
  html,body,#app{
    height: 100%;
    width: 100%;
  }
</style>
