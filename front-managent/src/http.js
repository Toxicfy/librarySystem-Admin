import axios from 'axios'

let http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export default http
