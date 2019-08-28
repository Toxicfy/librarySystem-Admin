/**
 * @author fy
 * @description 路由集合
 */
const router = require('koa-router')()
const book = require('./book.js')
const user = require('./adminUser.js')
const login = require('./login.js')
const category = require('./category.js')
const auth = require('../util/auth')

// 后台管理 - api
router.use('/api/category', auth, category.routes(), category.allowedMethods())
router.use('/api/book', auth, book.routes(), book.allowedMethods())
router.use('/api/user', auth, user.routes(), user.allowedMethods())
router.use('/api/login', auth, login.routes(), login.allowedMethods())

module.exports = router
