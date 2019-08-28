<template>
  <div class="container">
      <el-form :model="loginData" @submit.native.prevent="login('loginForm')" ref="loginForm" label-width="100px" :rules="rules">
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
    let nameValidator = (rule, value, callback) => {
      value ? callback() : callback(new Error('用户名不能为空'))
    }
    let passwordValidator = (rule, value, callback) => {
      value ? callback() : callback(new Error('密码不能为空'))
    }
    return {
      loginData: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: nameValidator, trigger: 'blur' }],
        password: [{ validator: passwordValidator, trigger: 'blur' }]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(result => {
        if (result) {
          this.$http.post('/login', this.loginData)
            .then(res => {
              const data = res.data
              if (data.err_code === 0) {
                window.localStorage.setItem('token', data.data.token)
                this.$router.push('/')
                notify(this, `登录成功，欢迎 ${data.data.name}`)
              }
            })
            .catch(() => {
              this.$refs[formName].resetFields()
            })
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
