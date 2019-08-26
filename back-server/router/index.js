/**
 * 路由集合
 */
const router = require('koa-router')()
const category = require('./category.js')
const book = require('./book.js')
const admin_user = require('./adminUser.js')

// 后台管理
router.use('/api/category', category.routes(), category.allowedMethods())
router.use('/api/book', book.routes(), book.allowedMethods())
router.use('/api/admin_user', admin_user.routes(), admin_user.allowedMethods())

module.exports = router
