<template>
  <div class="container">
    <div class="center">
      <!--img-->
      <div class="img-container"></div>
      <div class="form-container">
        <!--title-->
        <h2>登录</h2>
        <!--form-->
        <el-form :model="loginData" @submit.native.prevent="login('loginForm')" ref="loginForm" label-width="60px"
                 :rules="rules">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="loginData.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="loginData.password"></el-input>
          </el-form-item>
          <el-button type="info" native-type="submit">登录</el-button>
        </el-form>
      </div>
    </div>
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

<style lang="scss" scoped>
  .container {
    background: #d4dadc;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .center {
      display: flex;
      height: 400px;
      transform: translateY(-20%);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

      .img-container{
        z-index: 2;
        width: 300px;
        height: 400px;
        background: url("../assets/cover.jpg") no-repeat center;
        background-size: cover;
        box-shadow: 3px 0 8px rgba(0, 0, 0, 0.2);
      }
      .form-container{
        background: #ffffff;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2{
          transform: translateY(-20px);
        }
        .el-form {
          min-width: 375px;
          padding: 20px;
          box-sizing: border-box;
          transform: translateY(-5%);
        }
      }
    }
  }
</style>
