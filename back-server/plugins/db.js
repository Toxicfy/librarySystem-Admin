module.exports = app => {
  const mongoose = require('mongoose')
  // 数据库
  mongoose.connect('mongodb://127.0.0.1:27017/librarySystem', {
    useNewUrlParser: true
  })
  mongoose.set('useFindAndModify', false)
}
