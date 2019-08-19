const mongoose = require('mongoose')

// 创建表
const schema = new mongoose.Schema({
  name: { type: String },
  coverImg: { type: String }
})

module.exports = mongoose.model('Category', schema)
