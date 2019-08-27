<template>
  <div class="container">
      <el-form :model="loginData" @submit.native.prevent="login('loginForm')" ref="loginForm" label-width="100px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { notify } from '../utils'

export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post('/login', this.loginData)
        .then(res => {
          const data = res.data
          if (data.err_code === 0) {
            window.localStorage.setItem('token', data.data.token)
            this.$router.push('/')
            notify(this, `登录成功，欢迎 ${data.data.name}`)
          }
        })
    }
  }
}
</script>

<style lang="scss">
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-form{
      transform: translateY(-40%);
      min-width: 375px;
    }
  }
</style>
