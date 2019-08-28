const path = require('path')

/**
 * 上传图片设置
 * @param {String} pathString
 * @returns {Object}
 */
const koaBodyConfig = pathString => {
  return {
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, pathString), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024 // 文件上传大小
    }
  }
}

// 返回的数据模型
const successModel = (data, msg, err_code = 0) => {
  return {
    data,
    err_code,
    msg
  }
}
const errorModel = (msg, err_code = 1) => {
  return { msg, err_code }
}

module.exports = {
  koaBodyConfig,
  successModel,
  errorModel,
  privateKey: 'libraryManagement'
}
