<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside>
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <el-menu router :default-active="$route.path" :default-openeds="['内容管理','系统管理']" background-color="#10131e" text-color="#cfd0d3" active-text-color="#fff">
        <el-submenu index="内容管理">
          <template slot="title"><i class="el-icon-menu"></i><span>内容管理</span></template>
          <el-menu-item-group>
            <template slot="title">书籍分类</template>
            <el-menu-item index="/categories/create">创建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">书籍信息</template>
            <el-menu-item index="/books/create">创建书籍</el-menu-item>
            <el-menu-item index="/books/list">书籍列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="系统管理">
          <template slot="title"><i class="el-icon-menu"></i><span>系统管理</span></template>
          <el-menu-item-group>
            <template slot="title">用户</template>
            <el-menu-item index="/admin/create">创建用户</el-menu-item>
            <el-menu-item index="/admin/list">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 主体部分 -->
    <el-main>
      <!--  header  -->
      <div class="main-header"></div>
      <!--  路由区域  -->
      <router-view class="main-content"></router-view>
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
      overflow: hidden;
      .logo{
        width: 239px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background-color: #10131e;
        img{
          width: 138px;
          height: 75px;
        }
      }
      width: 240px !important;
      height: 100vh;
      .el-menu{
        height: calc(100% - 80px);
      }
    }
  }
  /*设置单个选中样式*/
  .el-menu-item-group{
    .el-menu-item{
      text-align: left;
      margin: 0 10%;
      padding-left: 24px;
      border-radius: 8px;
    }
    .is-active{
      background: #0364ff !important;
    }
  }

  .el-main{
    padding: 0;
    background: #f9f9fb;
    .main-header{
      background: #ffffff;
      height: 90px;
      box-shadow: 0 0 7px rgba(0,0,0,0.4);
    }
    .main-content{
      padding: 20px;
    }
  }
</style>
