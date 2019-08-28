/**
 * @author fy
 * @description 路由集合
 */
const router = require('koa-router')()
const book = require('./book.js')
const user = require('./adminUser.js')
const login = require('./login.js')
const category = require('./category.js')

// 后台管理 - api
router.use('/api/category', category.routes(), category.allowedMethods())
router.use('/api/book', book.routes(), book.allowedMethods())
router.use('/api/user', user.routes(), user.allowedMethods())
router.use('/api/login', login.routes(), login.allowedMethods())

module.exports = router
