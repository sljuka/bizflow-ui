/* eslint-disable */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../../webpack.config');
var config = require('../../config')

new WebpackDevServer(webpack(webpackConfig), {
  contentBase: __dirname,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api/*': {
      target: 'http://localhost:' + config.API_DEV_PORT + '/',
      rewrite: function(req) {
        req.url = req.url.replace(/^\/api/, '');
      }
    }
  }
}).listen(config.DEV_PORT, 'localhost', function (err, result) {
  if (err) return console.log(err);

  console.log('Listening at http://localhost:' + config.DEV_PORT + '/');
});
