const mongoose = require('mongoose')

// 定义表数据结构
// 书籍 --  名称，封面，简介，所属分类，书籍的作者.评分，
const schema = new mongoose.Schema({
  fileName: { type: String },
  coverImg: { type: String },
  description: { type: String },
  author: { type: String },
  rank: { type: Number },
  categoryId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Book', schema)
