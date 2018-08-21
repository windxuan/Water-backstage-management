module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    // 设置开发接口代理
    proxy: {
      '/api': {
        target: 'http://192.168.6.163:8080',
        changeOrigin: true,
      },
    },
  },
  productionSourceMap: false,
};
