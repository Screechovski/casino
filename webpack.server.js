const path = require('path');
const {isProd} = require('./config');

module.exports = {
  entry: './server/index.js',
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  target: 'node',
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate'
  },
  resolve: {
    fallback: {os: false}
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, './public')
  },
  watch: !isProd
};
