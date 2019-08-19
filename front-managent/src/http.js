import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/management/api'
})

export default http
