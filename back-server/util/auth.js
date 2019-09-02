const jwt = require('jsonwebtoken')
const { privateKey } = require('./common')
const AdminUser = require('../models/AdminUser')
const ERROR_MESSAGE = {
  401: '身份验证已过期，请重新登录'
}

module.exports = async (ctx, next) => {
  //  登录或者资源  -- 不校验
  const notValid =
    String(ctx.originalUrl).indexOf('/api/') === -1 ||
    ctx.originalUrl === '/api/login' ||
    ctx.request.method === 'OPTIONS'
  const authErrorStatus = 401
  if (notValid) await next()
  else {
    const token = String(ctx.request.headers.authorization || '')
      .split(' ')
      .pop()
    ctx.assert(token, authErrorStatus, ERROR_MESSAGE[authErrorStatus])

    const { id, time } = await jwt.verify(token, privateKey)
    ctx.assert(
      Date.now() - time < 1000 * 60 * 60,
      authErrorStatus,
      ERROR_MESSAGE[authErrorStatus]
    )
    const userModel = await AdminUser.findById(id)
    ctx.assert(userModel, authErrorStatus, ERROR_MESSAGE[authErrorStatus])
    ctx.currentId = id
    await next()
  }
}
