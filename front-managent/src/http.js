import Vue from 'vue'
import axios from 'axios'
import router from './router.js'
import { notify } from './utils'

let http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// 设置请求拦截器
http.interceptors.request.use(
  config => {
    // 设置请求头
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 设置响应拦截器
http.interceptors.response.use(
  res => {
    return res
  },
  error => {
    const { response } = error
    if (response.status === 401) {
      localStorage.clear()
      router.push('/login')
    }
    if (response.status === 500 && response.data.msg === 'jwt malformed') {
      notify(Vue.prototype, '无效的token,请重新登录', 'info')
      localStorage.clear()
      router.push('/login')
    } else {
      response.data.msg && notify(Vue.prototype, response.data.msg, 'info')
    }
    return Promise.reject(response)
  }
)

export default http
