const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  bookshelf: [
    // 这里存储个人书架信息，数据来自Book，存储的是_id字段
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Book'
    }
  ]
})

module.exports = mongoose.model('AdminUser', schema)
