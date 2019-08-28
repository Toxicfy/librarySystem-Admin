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
    response.data.msg && notify(Vue.prototype, response.data.msg, 'info')
    if (response.status === 401) {
      router.push('/login')
    }
    return new Promise(response)
  }
)

export default http
