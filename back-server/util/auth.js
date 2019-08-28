const jwt = require('jsonwebtoken')
const { privateKey } = require('./common')
const AdminUser = require('../models/AdminUser')

module.exports = async (ctx, next) => {
  //  登录或者资源  -- 不校验
  const notValid =
    String(ctx.originalUrl).indexOf('/api/') === -1 ||
    ctx.originalUrl === '/api/login' ||
    ctx.request.method === 'OPTIONS'

  if (notValid) await next()
  else {
    const token = String(ctx.request.headers.authorization || '')
      .split(' ')
      .pop()
    ctx.assert(token, 401, '身份验证已过期，请重新登录')

    const { id, time } = await jwt.verify(token, privateKey)
    ctx.assert(
      Date.now() - time > 1000 * 60 * 60,
      401,
      '身份验证已过期，请重新登录'
    )

    await next()
  }
}
