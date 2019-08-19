<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside>
      <el-menu router :default-openeds="['内容管理']" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="内容管理">
          <template slot="title"><i class="el-icon-menu"></i><span>内容管理</span></template>
          <el-menu-item-group>
            <template slot="title">图书分类</template>
            <el-menu-item index="/categories/create">创建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 主体部分 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .el-container{
    .el-aside{
      height: 100vh;
      .el-menu{
        height: 100%;
      }
    }
  }
</style>
