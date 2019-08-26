<template>
  <div class="admin-create">
    <h2 class="title">创建管理员</h2>
    <el-form  @submit.native.prevent="saveAdminUserInfo" :model="adminInfo">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="adminInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!this.id">
        <el-input type="password" v-model="adminInfo.password"></el-input>
      </el-form-item>
      <el-form-item class="btn-group">
        <el-button native-type="submit" type="success">提交</el-button>
        <el-button type="info" @click="cancelEdit" v-if="id">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdminCreate',
  props: {
    id: { type: String }
  },
  data () {
    return {
      adminInfo: {
        name: '',
        password: ''
      }
    }
  },
  created () {
    this.id && this.getAdminItemInfo()
  },
  methods: {
    // （创建-修改）保存用户信息
    saveAdminUserInfo () {
      const URL = this.id ? '/admin_user/update' : '/admin_user/create'
      this.$http.post(URL, this.adminInfo)
        .then(res => {
          if (res.data.err_code === 0) {
            this.$message({ type: 'success', message: res.data.msg })
            this.$router.push('/admin/list')
          }
        })
    },
    // 获取管理员数据
    getAdminItemInfo () {
      this.$http.get('/admin_user/detail', { params: { id: this.id } }).then(res => {
        const data = res.data
        if (data.err_code === 0) {
          this.adminInfo = data.data
        }
      })
    },
    // 取消编辑
    cancelEdit () {
      this.$message({ type: 'info', message: '编辑已取消' })
      this.$router.push('/admin/list')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../css/commonMixin.scss";

  .title{
    @include pageTitle()
  }
  .el-form{
    margin-top: 20px;
    @include widthAndMinWidth(60%,500px);
    .el-input{
      @include widthAndMinWidth();
    }
    .btn-group{
      margin-left: 100px;
    }
  }
</style>
