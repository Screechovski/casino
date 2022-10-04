const path = require('path')

module.exports = {
  entry: ['./server/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  target: 'node',
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../public'),
  },
  watch: true,
}
