module.exports = {
  devServer: {
    proxy: {
      '/management': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
