const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./client/main.js'],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.pug$/,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/,
                        use: ['pug-plain-loader']
                    },
                    {
                        use: ['raw-loader', 'pug-plain-loader']
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname),
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../public'),
    },
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../public'),
        },
        hot: true,
    },
}