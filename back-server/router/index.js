/**
 * 路由集合
 */
const router = require('koa-router')()
const category = require('./category.js')

// 后台管理
router.use('/api/category', category.routes(), category.allowedMethods())

module.exports = router
