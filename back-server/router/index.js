/**
 * 路由集合
 */
const router = require('koa-router')()
const management = require('./management.js')

// 后台管理
router.use('/management', management.routes(), management.allowedMethods())

module.exports = router
