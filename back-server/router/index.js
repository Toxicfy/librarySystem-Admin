/**
 * 路由集合
 */
const router = require('koa-router')()
const category = require('./category.js')
const book = require('./book.js')

// 后台管理
router.use('/api/category', category.routes(), category.allowedMethods())
router.use('/api/book', book.routes(), book.allowedMethods())

module.exports = router
