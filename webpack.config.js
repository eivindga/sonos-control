var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './app/index.jsx'
  ],
  output: {
    path: __dirname + '/static',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:
      {
        presets:['es2015', 'stage-0', 'react']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [HTMLWebpackPluginConfig]
};
