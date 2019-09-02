<template>
  <div class="admin-create">
    <h2 class="title">创建用户</h2>
    <el-form  @submit.native.prevent="saveAdminUserInfo('adminForm')" ref="adminForm" :model="adminInfo" :rules="rules">
      <el-form-item label="用户名" prop="username" label-width="100px">
        <el-input v-model="adminInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!this.id" label-width="100px">
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
import { notify } from '../utils/index'

export default {
  name: 'AdminCreate',
  props: {
    id: { type: String }
  },
  data () {
    const usernameValidator = (rule, value, callback) => {
      value === ''
        ? callback(new Error('请输入用户名后提交'))
        : callback()
    }
    return {
      adminInfo: {
        name: '',
        password: ''
      },
      rules: {
        username: [{ validator: usernameValidator, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.id && this.getAdminItemInfo()
  },
  methods: {
    // （创建-修改）保存用户信息
    saveAdminUserInfo (formName) {
      this.$refs[formName].validate(res => {
        if (res) {
          const URL = this.id ? '/user/update' : '/user/create'
          this.$http.post(URL, this.adminInfo)
            .then(res => {
              notify(this, res.data.msg)
              if (res.data.err_code === 0) {
                this.$router.push('/admin/list')
              }
            })
        }
      })
    },
    // 获取用户数据
    getAdminItemInfo () {
      this.$http.get('/user/detail', { params: { id: this.id } }).then(res => {
        const data = res.data
        if (data.err_code === 0) {
          this.adminInfo = data.data
        }
      })
    },
    // 取消编辑
    cancelEdit () {
      notify(this, '编辑用户已取消')
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
