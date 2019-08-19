import axios from 'axios'

let http = axios.create({
  baseURL: 'http://localhost:3000/management/api'
})

export default http
