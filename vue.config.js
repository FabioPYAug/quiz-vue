module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        return {
          limit: 180192, // Limite em bytes (8KB) para imagens em base64
          name: 'assets/images/[name].[hash:8].[ext]'
        };
      });
  }
};
